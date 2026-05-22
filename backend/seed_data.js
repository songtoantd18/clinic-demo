const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Simple helper to load .env without external dependencies
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || '';
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1);
          }
          process.env[key] = value.trim();
        }
      });
    }
  } catch (err) {
    console.warn('Không thể đọc file .env:', err.message);
  }
}

loadEnv();

// Dynamically generate the bcrypt hash for password "1"
const bcryptHashOf1 = bcrypt.hashSync('1', 10);

const workingHoursTemplate = JSON.stringify({
  monday: { start: '08:00', end: '17:00', isOpen: true },
  tuesday: { start: '08:00', end: '17:00', isOpen: true },
  wednesday: { start: '08:00', end: '17:00', isOpen: true },
  thursday: { start: '08:00', end: '17:00', isOpen: true },
  friday: { start: '08:00', end: '17:00', isOpen: true },
  saturday: { start: '08:00', end: '12:00', isOpen: true },
  sunday: { start: '08:00', end: '12:00', isOpen: false }
});

const notificationSettingsTemplate = JSON.stringify({
  emailEnabled: true,
  smsEnabled: false,
  reminderHours: 2
});

const users = [
  // --- CLINICS ---
  {
    id: 'd13bdd67-1411-488a-b0b9-b24bd52b0cc6',
    email: 'clinic@gmail.com',
    password: bcryptHashOf1,
    role: 'clinic',
    is_active: 1,
    clinic_name: 'Tâm Trí Đa Khoa',
    description: 'Phòng khám đa khoa Tâm Trí uy tín hàng đầu Đà Nẵng, chuyên khoa Tai Mũi Họng, Nhi khoa và Da liễu.',
    specialties: 'Tai Mũi Họng,Nhi khoa,Da liễu',
    working_hours: workingHoursTemplate,
    doctor_info: 'PGS.TS Bác sĩ Nguyễn Văn Thắng - 25 năm kinh nghiệm điều trị nhi khoa và tai mũi họng.',
    notification_settings: notificationSettingsTemplate,
    phone: '02363679799',
    address: '64 Nguyễn Hữu Thọ, Hòa Thuận Tây, Hải Châu, Đà Nẵng',
    full_name: null,
    id_number: null,
    date_of_birth: null,
    profile_completed: 0,
    images: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd776516a-3640-4a9f-8ae1-d917b544bba9',
    email: 'clinic1@gmail.com',
    password: bcryptHashOf1,
    role: 'clinic',
    is_active: 1,
    clinic_name: 'Nhi Khoa Happy Baby',
    description: 'Phòng khám chuyên khoa Nhi Happy Baby cung cấp dịch vụ khám chữa bệnh chất lượng cao cho trẻ em, tiêm chủng và tư vấn dinh dưỡng.',
    specialties: 'Nhi khoa,Tiêm chủng',
    working_hours: workingHoursTemplate,
    doctor_info: 'Thạc sĩ Bác sĩ Trần Thị Mỹ Liên - Nguyên trưởng khoa Nhi BV Phụ sản Nhi Đà Nẵng.',
    notification_settings: notificationSettingsTemplate,
    phone: '0905123456',
    address: '120 Đống Đa, Thuận Phước, Hải Châu, Đà Nẵng',
    full_name: null,
    id_number: null,
    date_of_birth: null,
    profile_completed: 0,
    images: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'a3b4c5d6-e7f8-9012-3456-7890abcdef12',
    email: 'clinic2@gmail.com',
    password: bcryptHashOf1,
    role: 'clinic',
    is_active: 1,
    clinic_name: 'Nha Khoa Smile Care',
    description: 'Hệ thống nha khoa kỹ thuật cao Smile Care chuyên răng sứ thẩm mỹ, niềng răng, cấy ghép implant không đau.',
    specialties: 'Nha khoa,Răng Hàm Mặt',
    working_hours: workingHoursTemplate,
    doctor_info: 'Bác sĩ CKI Lê Hoàng Nam - Chuyên gia phục hình răng và implant nha khoa.',
    notification_settings: notificationSettingsTemplate,
    phone: '02363888999',
    address: '45 Lê Lợi, Thạch Thang, Hải Châu, Đà Nẵng',
    full_name: null,
    id_number: null,
    date_of_birth: null,
    profile_completed: 0,
    images: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
  },

  // --- PATIENTS ---
  {
    id: '89ea2197-52af-45c0-ba09-c28e74d00900',
    email: 'patient@gmail.com',
    password: bcryptHashOf1,
    role: 'patient',
    is_active: 1,
    clinic_name: null,
    description: null,
    specialties: null,
    working_hours: null,
    doctor_info: null,
    notification_settings: null,
    phone: '0905123789',
    address: '12 Lê Duẩn, Hải Châu, Đà Nẵng',
    full_name: 'Nguyễn Văn A',
    id_number: '201768493',
    date_of_birth: '1992-08-15',
    profile_completed: 1,
    images: null
  },
  {
    id: 'b1b2c3d4-e5f6-7890-1234-567890abcdef',
    email: 'patient1@gmail.com',
    password: bcryptHashOf1,
    role: 'patient',
    is_active: 1,
    clinic_name: null,
    description: null,
    specialties: null,
    working_hours: null,
    doctor_info: null,
    notification_settings: null,
    phone: '0935456789',
    address: '88 Hùng Vương, Thanh Khê, Đà Nẵng',
    full_name: 'Trần Thị B',
    id_number: '201889955',
    date_of_birth: '1995-12-20',
    profile_completed: 1,
    images: null
  },
  {
    id: 'c1c2c3d4-e5f6-7890-1234-567890abcdef',
    email: 'patient2@gmail.com',
    password: bcryptHashOf1,
    role: 'patient',
    is_active: 1,
    clinic_name: null,
    description: null,
    specialties: null,
    working_hours: null,
    doctor_info: null,
    notification_settings: null,
    phone: '0914999888',
    address: '150 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
    full_name: 'Lê Hoàng C',
    id_number: '201990022',
    date_of_birth: '1988-03-10',
    profile_completed: 1,
    images: null
  }
];

// Generate additional patient accounts to populate list
for (let i = 5; i <= 20; i++) {
  users.push({
    id: `p0000000-0000-0000-0000-0000000000${i.toString().padStart(2, '0')}`,
    email: `patient${i}@example.com`,
    password: bcryptHashOf1,
    role: 'patient',
    is_active: 1,
    clinic_name: null,
    description: null,
    specialties: null,
    working_hours: null,
    doctor_info: null,
    notification_settings: null,
    phone: `09050000${i.toString().padStart(2, '0')}`,
    address: `${10 * i} Trần Phú, Hải Châu, Đà Nẵng`,
    full_name: `Bệnh Nhân Số ${i}`,
    id_number: `2019900${i.toString().padStart(2, '0')}`,
    date_of_birth: `199${i % 10}-05-15`,
    profile_completed: 1,
    images: null
  });
}

const appointments = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    appointment_code: 'APPT-TMT-001',
    clinic_user_id: 'd13bdd67-1411-488a-b0b9-b24bd52b0cc6', // Tâm Trí Đa Khoa
    patient_user_id: '89ea2197-52af-45c0-ba09-c28e74d00900', // Nguyễn Văn A
    appointment_time: '2026-05-22 09:00:00',
    symptoms: 'Đau rát họng khi nuốt, ho khan kéo dài 3 ngày nay, có sốt nhẹ vào chiều tối.',
    diagnosis: 'Viêm họng cấp tính do thay đổi thời tiết, amidan sưng nhẹ đỏ.',
    prescription: JSON.stringify({
      medications: [
        { name: 'Amoxicillin 500mg', dosage: '1 viên/lần', frequency: '2 lần/ngày', duration: '5 ngày' },
        { name: 'Paracetamol 500mg', dosage: '1 viên/lần', frequency: '3 lần/ngày khi sốt > 38.5 độ', duration: '3 ngày' },
        { name: 'Siro ho Prospan 100ml', dosage: '5ml/lần', frequency: '3 lần/ngày', duration: '5 ngày' }
      ],
      notes: 'Uống thuốc sau ăn no. Súc họng với nước muối sinh lý ấm 3-4 lần/ngày. Kiêng nước đá lạnh.'
    }),
    test_results: 'Nội soi họng: Niêm mạc họng xung huyết đỏ, amidan hai bên sưng độ I, không có mủ hay giả mạc bám.',
    status: 'completed'
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    appointment_code: 'APPT-TMT-002',
    clinic_user_id: 'd13bdd67-1411-488a-b0b9-b24bd52b0cc6', // Tâm Trí Đa Khoa
    patient_user_id: '89ea2197-52af-45c0-ba09-c28e74d00900', // Nguyễn Văn A
    appointment_time: '2026-05-28 15:30:00',
    symptoms: 'Khám lại họng theo lịch hẹn để đánh giá phục hồi và nội soi lại.',
    diagnosis: null,
    prescription: null,
    test_results: null,
    status: 'confirmed'
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    appointment_code: 'APPT-TMT-003',
    clinic_user_id: 'd13bdd67-1411-488a-b0b9-b24bd52b0cc6', // Tâm Trí Đa Khoa
    patient_user_id: 'b1b2c3d4-e5f6-7890-1234-567890abcdef', // Trần Thị B
    appointment_time: '2026-05-29 10:00:00',
    symptoms: 'Nổi mẩn đỏ ngứa ngáy dữ dội khắp cánh tay và vùng cổ sau khi ăn hải sản vào tối qua.',
    diagnosis: null,
    prescription: null,
    test_results: null,
    status: 'pending'
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    appointment_code: 'APPT-SMI-001',
    clinic_user_id: 'a3b4c5d6-e7f8-9012-3456-7890abcdef12', // Nha Khoa Smile Care
    patient_user_id: 'c1c2c3d4-e5f6-7890-1234-567890abcdef', // Lê Hoàng C
    appointment_time: '2026-05-21 14:00:00',
    symptoms: 'Đau buốt nhức răng số 36 (hàm dưới bên trái) khi nhai hoặc uống nước đá lạnh.',
    diagnosis: 'Sâu răng hàm lớn thứ nhất hàm dưới trái tiến triển sâu sát ngà răng.',
    prescription: JSON.stringify({
      medications: [
        { name: 'Ibuprofen 400mg', dosage: '1 viên/lần', frequency: '2 lần/ngày sau ăn', duration: '3 ngày' }
      ],
      notes: 'Đã xử lý làm sạch tủy viêm và tiến hành trám composite vĩnh viễn răng 36. Không nhai đồ cứng răng này trong 24h đầu.'
    }),
    test_results: 'Phim X-quang răng cận chóp răng 36: Phát hiện tổn thương thấu quang lớn sát buồng tủy ngà chân răng, chưa tổn thương quanh chóp.',
    status: 'completed'
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555',
    appointment_code: 'APPT-SMI-002',
    clinic_user_id: 'a3b4c5d6-e7f8-9012-3456-7890abcdef12', // Nha Khoa Smile Care
    patient_user_id: 'b1b2c3d4-e5f6-7890-1234-567890abcdef', // Trần Thị B
    appointment_time: '2026-05-30 09:30:00',
    symptoms: 'Đặt lịch cạo vôi răng định kỳ và đánh bóng răng.',
    diagnosis: null,
    prescription: null,
    test_results: null,
    status: 'pending'
  },
  {
    id: 'a6666666-6666-6666-6666-666666666666',
    appointment_code: 'APPT-HAP-001',
    clinic_user_id: 'd776516a-3640-4a9f-8ae1-d917b544bba9', // Nhi Khoa Happy Baby
    patient_user_id: 'b1b2c3d4-e5f6-7890-1234-567890abcdef', // Trần Thị B (khám cho con)
    appointment_time: '2026-05-22 10:15:00',
    symptoms: 'Bé bị ho nhiều thành cơn về đêm, khò khè, chảy mũi trong, không sốt.',
    diagnosis: 'Viêm phế quản co thắt nhẹ ở trẻ em do thay đổi thời tiết.',
    prescription: JSON.stringify({
      medications: [
        { name: 'Ventolin Nebules 2.5mg', dosage: 'Khí dung 1 tép/lần', frequency: '2 lần/ngày', duration: '3 ngày' },
        { name: 'Desloratadine 0.5mg/ml', dosage: '2.5ml/lần', frequency: '1 lần/ngày vào buổi tối', duration: '5 ngày' }
      ],
      notes: 'Rửa mũi sạch bằng nước muối sinh lý trước khi nhỏ thuốc. Cho bé uống nhiều nước ấm. Tái khám sau 3 ngày.'
    }),
    test_results: 'Nghe phổi: Có ran rít nhẹ hai phế trường, nhịp thở 28 lần/phút (bình thường), họng hơi đỏ.',
    status: 'completed'
  },
  {
    id: 'a7777777-7777-7777-7777-777777777777',
    appointment_code: 'APPT-TMT-004',
    clinic_user_id: 'd13bdd67-1411-488a-b0b9-b24bd52b0cc6', // Tâm Trí Đa Khoa
    patient_user_id: 'b1b2c3d4-e5f6-7890-1234-567890abcdef', // Trần Thị B
    appointment_time: '2026-05-20 08:30:00',
    symptoms: 'Nhức đầu dữ dội, mệt mỏi, đo huyết áp tại nhà thấy tăng cao 160/95 mmHg.',
    diagnosis: 'Tăng huyết áp vô căn (giai đoạn 1), theo dõi stress và thiếu ngủ.',
    prescription: JSON.stringify({
      medications: [
        { name: 'Amlodipine 5mg', dosage: '1 viên/lần', frequency: '1 lần/ngày vào buổi sáng', duration: '30 ngày' },
        { name: 'Magnesium B6', dosage: '1 viên/lần', frequency: '2 lần/ngày sau ăn', duration: '15 ngày' }
      ],
      notes: 'Hạn chế muối trong khẩu phần ăn. Tránh căng thẳng, làm việc quá ngủ. Tập thể dục nhẹ nhàng 30 phút mỗi ngày. Theo dõi huyết áp hàng ngày vào sáng và tối.'
    }),
    test_results: 'Đo huyết áp tại phòng khám: 155/90 mmHg. Điện tâm đồ (ECG): Nhịp xoang đều, tần số 75 lần/phút, chưa thấy dấu hiệu phì đại thất trái.',
    status: 'completed'
  },
  {
    id: 'a8888888-8888-8888-8888-888888888888',
    appointment_code: 'APPT-HAP-002',
    clinic_user_id: 'd776516a-3640-4a9f-8ae1-d917b544bba9', // Nhi Khoa Happy Baby
    patient_user_id: 'c1c2c3d4-e5f6-7890-1234-567890abcdef', // Lê Hoàng C (khám cho con)
    appointment_time: '2026-05-19 14:15:00',
    symptoms: 'Bé bị sốt cao liên tục 39 độ C từ 2 ngày trước, kèm phát ban đỏ dạng sần ở tay chân, miệng có vết loét làm bé lười ăn.',
    diagnosis: 'Bệnh tay chân miệng độ 1 (giai đoạn nhẹ).',
    prescription: JSON.stringify({
      medications: [
        { name: 'Paracetamol 150mg (Siro)', dosage: '5ml/lần', frequency: 'Mỗi 4-6 giờ khi bé sốt >= 38.5 độ', duration: '3 ngày' },
        { name: 'Siro kháng Histamin Desloratadine', dosage: '2ml/lần', frequency: '1 lần/ngày', duration: '5 ngày' },
        { name: 'Gel bôi miệng Kamistad-Gel Baby', dosage: 'Bôi vết loét miệng', frequency: '3 lần/ngày trước khi ăn 15 phút', duration: '5 ngày' }
      ],
      notes: 'Cho trẻ ăn đồ ăn lỏng, nguội, dễ nuốt (cháo, súp, sữa). Cách ly trẻ tại nhà. Rửa tay thường xuyên bằng xà phòng sát khuẩn. Theo dõi các dấu hiệu nguy hiểm: giật mình, sốt cao không hạ, quấy khóc liên tục, đi đứng loạng choạng.'
    }),
    test_results: 'Khám lâm sàng: Phát ban dạng phỏng nước ở lòng bàn tay, lòng bàn chân và mông. Vết loét niêm mạc miệng đường kính 2-3mm. Phổi trong, bụng mềm.',
    status: 'completed'
  },
  {
    id: 'a9999999-9999-9999-9999-999999999999',
    appointment_code: 'APPT-SMI-003',
    clinic_user_id: 'a3b4c5d6-e7f8-9012-3456-7890abcdef12', // Nha Khoa Smile Care
    patient_user_id: '89ea2197-52af-45c0-ba09-c28e74d00900', // Nguyễn Văn A
    appointment_time: '2026-05-18 11:00:00',
    symptoms: 'Chảy máu chân răng khi đánh răng, hơi thở có mùi hôi dù vệ sinh kỹ.',
    diagnosis: 'Viêm lợi cục bộ mức độ trung bình do tích tụ nhiều vôi răng dưới nướu.',
    prescription: JSON.stringify({
      medications: [
        { name: 'Nước súc miệng sát khuẩn Kin Ginkival', dosage: 'Súc miệng 10ml trong 1 phút', frequency: '2 lần/ngày sau khi đánh răng', duration: '10 ngày' }
      ],
      notes: 'Đã tiến hành cạo vôi răng (lấy cao răng) trên và dưới nướu, đánh bóng toàn hàm. Hướng dẫn sử dụng chỉ nha khoa thay cho tăm xỉa răng. Khám nha khoa định kỳ mỗi 6 tháng.'
    }),
    test_results: 'Chỉ số mảng bám (PLI) mức độ 2, nướu sưng đỏ nề nhẹ vùng răng cửa hàm dưới, chảy máu khi thăm dò (BOP+).',
    status: 'completed'
  }
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  });

  console.log('⏳ Truncating old database records...');
  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  await connection.query('TRUNCATE TABLE appointments');
  await connection.query('TRUNCATE TABLE users');
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log('✅ Database truncated successfully.');

  console.log('⏳ Seeding users table...');
  const userInsertQuery = `
    INSERT INTO users (
      id, email, password, role, is_active, clinic_name, description, specialties, 
      working_hours, doctor_info, notification_settings, phone, address, 
      full_name, id_number, date_of_birth, profile_completed, images
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const u of users) {
    await connection.query(userInsertQuery, [
      u.id, u.email, u.password, u.role, u.is_active, u.clinic_name, u.description, u.specialties,
      u.working_hours, u.doctor_info, u.notification_settings, u.phone, u.address,
      u.full_name, u.id_number, u.date_of_birth, u.profile_completed, u.images
    ]);
  }
  console.log(`✅ Seeded ${users.length} users successfully.`);

  console.log('⏳ Seeding appointments table...');
  const apptInsertQuery = `
    INSERT INTO appointments (
      id, appointment_code, clinic_user_id, patient_user_id, appointment_time, 
      symptoms, diagnosis, prescription, test_results, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const a of appointments) {
    await connection.query(apptInsertQuery, [
      a.id, a.appointment_code, a.clinic_user_id, a.patient_user_id, a.appointment_time,
      a.symptoms, a.diagnosis, a.prescription, a.test_results, a.status
    ]);
  }
  console.log(`✅ Seeded ${appointments.length} appointments successfully.`);

  await connection.end();
  console.log('⭐ Seeding process complete!');
}

seed().catch(console.error);
