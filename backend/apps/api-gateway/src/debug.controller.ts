import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User, Appointment } from '@app/database';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Debug')
@Controller('debug')
export class DebugController {
  constructor(private dataSource: DataSource) {}

  @Get('users')
  @ApiOperation({ summary: 'DEBUG: Get all users in database (No Auth)' })
  async getAllUsers() {
    const users = await this.dataSource.getRepository(User).find();
    // Hide passwords from response
    return users.map(({ password, ...user }) => user);
  }

  @Get('appointments')
  @ApiOperation({ summary: 'DEBUG: Get all appointments in database (No Auth)' })
  async getAllAppointments() {
    return this.dataSource.getRepository(Appointment).find({
      relations: ['clinicUser', 'patientUser'],
      order: { createdAt: 'DESC' },
    });
  }
}
