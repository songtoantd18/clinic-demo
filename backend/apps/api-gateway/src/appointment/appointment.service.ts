import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, DataSource } from 'typeorm';
import { Appointment, AppointmentStatus, User, UserRole } from '@app/database';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger('Lifecycle');
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource, // Để dùng Transaction + Lock
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
    patientUserId: string,
    isDraft = true,
  ) {
    this.logger.log('5.1 [Service] Bắt đầu Transaction + Lock...');

    // Tạo một luồng riêng để quản lý transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // [LOCK] Đọc mã cuối cùng VÀ KHÓA LẠI.
      // Các request khác chạy đến đây sẽ phải ĐỨNG ĐỢI.
      const lastApp = await queryRunner.manager.findOne(Appointment, {
        where: {},
        order: { createdAt: 'DESC' },
        lock: { mode: 'pessimistic_write' },
      });

      // Tính mã kế tiếp (lúc này an toàn vì chỉ có 1 người trong 'phòng')
      let nextNumber = 1;
      if (lastApp && lastApp.appointmentCode) {
        const lastPart = lastApp.appointmentCode.split('-')[1];
        nextNumber = parseInt(lastPart) + 1;
      }
      const appointmentCode = `APT-${nextNumber.toString().padStart(4, '0')}`;

      // [CHECK SLOT] Kiểm tra trùng giờ trong cùng transaction
      if (!isDraft) {
        const existingSlot = await queryRunner.manager.findOne(Appointment, {
          where: {
            clinicUserId: createAppointmentDto.clinicUserId,
            appointmentTime: new Date(createAppointmentDto.appointmentTime) as any,
          },
        });
        if (existingSlot) {
          throw new BadRequestException('Khung giờ này đã có người đặt rồi!');
        }
      }

      // Tạo và lưu trong cùng transaction
      const appointment = queryRunner.manager.create(Appointment, {
        ...createAppointmentDto,
        patientUserId,
        appointmentCode,
        status: isDraft ? AppointmentStatus.DRAFT : AppointmentStatus.PENDING,
      });

      const result = await queryRunner.manager.save(appointment);

      // Commit: Nhả Lock, ghi dữ liệu thật vào DB
      await queryRunner.commitTransaction();
      this.logger.log(`5.2 [Service] Transaction thành công: ${appointmentCode}`);
      return result;

    } catch (err) {
      // Có lỗi -> Rollback, không lưu gì hết
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // Luôn luôn giải phóng kết nối
      await queryRunner.release();
    }
  }

  async findAll(filters?: {
    clinicUserId?: string;
    patientUserId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: AppointmentStatus;
  }) {
    const where: any = {};

    if (filters?.clinicUserId) where.clinicUserId = filters.clinicUserId;
    if (filters?.patientUserId) where.patientUserId = filters.patientUserId;
    if (filters?.status) where.status = filters.status;
    if (filters?.startDate && filters?.endDate) {
      where.appointmentTime = Between(filters.startDate, filters.endDate);
    }

    return await this.appointmentRepository.find({
      where,
      relations: ['clinicUser', 'patientUser'],
      order: { appointmentTime: 'DESC' },
    });
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['clinicUser', 'patientUser'],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    if (updateAppointmentDto.appointmentTime) {
      const isAvailable = await this.checkTimeSlotAvailability(
        appointment.clinicUserId,
        new Date(updateAppointmentDto.appointmentTime),
        id,
      );

      if (!isAvailable) {
        throw new BadRequestException('New time slot is not available');
      }

      // Notify patient of rescheduling
      const oldTime = new Date(appointment.appointmentTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      const newTime = new Date(updateAppointmentDto.appointmentTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      const patientEmail = appointment.patientUser?.email;
      if (patientEmail) {
        this.sendNotificationEmail(
          patientEmail,
          'Lịch hẹn khám bệnh của bạn đã được thay đổi / Appointment Rescheduled',
          `<p>Xin chào <b>${appointment.patientUser?.fullName || 'Bệnh nhân'}</b>,</p>
           <p>Lịch hẹn khám tại phòng khám <b>${appointment.clinicUser?.clinicName || 'Clinic'}</b> của bạn đã được thay đổi thời gian.</p>
           <p>Thời gian cũ: <b>${oldTime}</b></p>
           <p>Thời gian mới: <b>${newTime}</b></p>
           <p>Vui lòng đến đúng giờ để tiến hành khám chữa bệnh.</p>
           <p>Trân trọng,<br>Hệ thống quản lý ClinicPulse</p>`
        ).catch(e => this.logger.error('Email send task failed', e));
      }
    }

    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async updatePrescription(id: string, prescriptionDto: UpdatePrescriptionDto) {
    const appointment = await this.findOne(id);
    appointment.prescription = prescriptionDto.prescription;
    appointment.diagnosis = prescriptionDto.diagnosis;
    appointment.testResults = prescriptionDto.testResults;
    appointment.status = AppointmentStatus.COMPLETED;
    return await this.appointmentRepository.save(appointment);
  }

  async cancel(id: string) {
    const appointment = await this.findOne(id);
    appointment.status = AppointmentStatus.CANCELLED;
    const result = await this.appointmentRepository.save(appointment);

    const patientEmail = appointment.patientUser?.email;
    if (patientEmail) {
      const appTime = new Date(appointment.appointmentTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      this.sendNotificationEmail(
        patientEmail,
        'Lịch hẹn khám bệnh đã bị hủy / Appointment Cancelled',
        `<p>Xin chào <b>${appointment.patientUser?.fullName || 'Bệnh nhân'}</b>,</p>
         <p>Lịch hẹn khám tại phòng khám <b>${appointment.clinicUser?.clinicName || 'Clinic'}</b> vào lúc <b>${appTime}</b> đã bị hủy.</p>
         <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ hotline phòng khám.</p>
         <p>Trân trọng,<br>Hệ thống quản lý ClinicPulse</p>`
      ).catch(e => this.logger.error('Email send task failed', e));
    }

    return result;
  }

  private async sendNotificationEmail(to: string, subject: string, htmlContent: string) {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = +(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    console.log(`\n📧 [EMAIL NOTIFICATION OUTBOX]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${htmlContent.replace(/<[^>]*>/g, ' ').trim()}`);
    console.log(`---------------------------------\n`);

    if (!smtpUser || smtpUser.includes('your-email') || !smtpPass) {
      this.logger.warn('SMTP user or password not configured in .env. Skipping real email sending.');
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"ClinicPulse" <${smtpUser}>`,
        to,
        subject,
        html: htmlContent,
      });
      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`);
    }
  }

  async submitDraft(id: string, userId: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id, patientUserId: userId },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointment.status !== AppointmentStatus.DRAFT) {
      throw new BadRequestException('Only draft appointments can be submitted');
    }

    // Check availability
    const isAvailable = await this.checkTimeSlotAvailability(
      appointment.clinicUserId,
      appointment.appointmentTime,
      id,
    );

    if (!isAvailable) {
      throw new BadRequestException('Time slot is not available');
    }

    appointment.status = AppointmentStatus.PENDING;
    return await this.appointmentRepository.save(appointment);
  }


  async getAvailableSlots(clinicUserId: string, date: Date) {
    const clinic = await this.userRepository.findOne({
      where: { id: clinicUserId, role: UserRole.CLINIC },
    });

    if (!clinic || !clinic.workingHours) {
      return [];
    }

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const daySchedule = clinic.workingHours[dayName];

    if (!daySchedule || !daySchedule.isOpen) {
      return [];
    }

    // Generate time slots (30-minute intervals)
    const slots: string[] = [];
    const [startHour, startMinute] = daySchedule.start.split(':').map(Number);
    const [endHour, endMinute] = daySchedule.end.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
      slots.push(timeString);

      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour++;
      }
    }

    // Filter out booked slots
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedAppointments = await this.appointmentRepository.find({
      where: {
        clinicUserId,
        appointmentTime: Between(startOfDay, endOfDay),
        status: AppointmentStatus.CONFIRMED,
      },
    });

    const bookedTimes = bookedAppointments.map((apt) =>
      apt.appointmentTime.toTimeString().substring(0, 5),
    );

    return slots.filter((slot) => !bookedTimes.includes(slot));
  }

  private async checkTimeSlotAvailability(
    clinicUserId: string,
    appointmentTime: Date,
    excludeAppointmentId?: string,
  ): Promise<boolean> {
    const where: any = {
      clinicUserId,
      appointmentTime,
      status: AppointmentStatus.CONFIRMED,
    };

    const existingAppointment = await this.appointmentRepository.findOne({
      where,
    });

    if (!existingAppointment) return true;
    if (excludeAppointmentId && existingAppointment.id === excludeAppointmentId) {
      return true;
    }

    return false;
  }
}
