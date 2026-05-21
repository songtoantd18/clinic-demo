/**
 * Copyright 2026 Google LLC
 */

export const appointmentData = {
  id: "CK-9928",
  backLabel: "QUAY LẠI DANH SÁCH",
  titlePrefix: "Chi tiết lịch khám #",
  patientHeader: "Bệnh nhân",
  loyalBadge: "BỆNH NHÂN THÂN THIẾT",
  diagnosisHeader: "Tình trạng bệnh & Chẩn đoán",
  symptomLabel: "Triệu chứng lâm sàng",
  cancelButton: "Hủy lịch khám",
  saveButton: "Lưu thay đổi",
  patient: {
    name: "Nguyễn Văn An",
    phone: "0901 234 567",
    email: "an.nguyen@example.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjtMeaECtxO1zYYzk_vHKE6n7x0F_QVtNGzi49gIWCq7n6RHPUHVIGNHcyZbZr5Qwj72SnPDOND64-fEviLUldydoYcNZKCzMqsYxp1C2pLCQ3daf5MCCdLVWjzfxUpiTmaqvZh8PPiDDiKRXIRfKJBxELmMF08F5wsKmjrCdCdGKIz2RCziCQDoRZRW-5AhxaRqrK1QwNFHIjgLeiiPx-0SOcAUFhtSCedPWPebSJlSx92Sv12-lFvMNqY3aULWxOymwmgVp",
    symptoms: "Bệnh nhân đau họng kéo dài 3 ngày, sốt nhẹ về chiều, người mệt mỏi, chán ăn."
  }
};

export const commonData = {
  footer: {
    copyright: "© 2024 ClinicPulse Management Systems. Clinical Precision.",
    links: [
      { label: "Chính sách bảo mật", url: "#" },
      { label: "Điều khoản dịch vụ", url: "#" },
      { label: "Hỗ trợ kỹ thuật", url: "#" },
      { label: "Privacy Policy", url: "#" },
      { label: "Terms of Service", url: "#" },
      { label: "Support", url: "#" }
    ]
  },
  navigation: {
    clinic: {
      brand: "ClinicPulse",
      portal: "Clinic Portal",
      healthMgmt: "Health Management",
      overview: "Tổng quan",
      appointments: "Lịch hẹn",
      records: "Hồ sơ bệnh án",
      info: "Thông tin phòng khám",
      patientView: "Giao diện Bệnh nhân",
      profile: "Cá nhân",
      adminName: "BS. Nguyễn Văn A",
      adminRole: "Quản trị viên"
    },
    patient: {
      brand: "PatientCare",
      findClinic: "Tìm phòng khám",
      myAppointments: "Lịch hẹn của tôi",
      medicalRecords: "Hồ sơ bệnh án",
      clinicView: "Giao diện Bác sĩ",
      searchPlaceholder: "Tìm kiếm...",
      avatarLabel: "BN"
    }
  },
  dashboard: {
    title: "Tổng quan hệ thống",
    subtitle: "Dữ liệu thống kê lượt đặt khám trong 30 ngày qua",
    stats: [
      { label: "Tổng lượt", value: "1,284", icon: "calendar_month", trend: "+12.5% tháng này", type: "primary" },
      { label: "Đã hoàn thành", value: "956", icon: "check_circle", trend: "74% tỷ lệ khám", type: "secondary" },
      { label: "Đang chờ", value: "42", icon: "pending", trend: "Lịch hôm nay", type: "tertiary" },
      { label: "Đã hủy", value: "12", icon: "cancel", trend: "-2% so với tháng trước", type: "error" }
    ],
    upcomingTitle: "Lịch khám 1 giờ tới",
    viewAll: "Xem tất cả",
    tableHeaders: ["Bệnh nhân", "Thời gian", "Dịch vụ", "Trạng thái"],
    appointments: [
      { name: "Nguyễn Minh Tuấn", time: "14:15 - 14:45", service: "Khám tổng quát", status: "Sắp đến", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA77kcri1dfej6VtYuzIoL2061HUpo3_ht1-LjMl5OH6y8ipinOku7uYoIGJ0N4wqknVnYYctMABJUIfqx1YPXWGnOCWAzLn0Rfe4Q3_bkI78OOqupHoF48KZJ5LNIXL5hD4CyW-83St3fcpS6Mr10otVKHs3Dg-17BqcNxFgOE1riPfBvcpfF4rKugTyo3uKH9uPAamZ3z15MMW-Sa1vRkYBhStYSt2wwd_TrrjRhQOPBkwZOHJPI2ypjOvKskOoNvWLbfPlRk" },
      { name: "Lê Thị Mai", time: "14:45 - 15:15", service: "Nội soi dạ dày", status: "Đang đợi", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWEMAuQYZ8csnQakCQYHdPCuBPd89AHTQ95YNdo4Xz97PqvSB8YZ6mKGdMEd9wklzd11OP3_K0NyWu1A3Kg-BysD1GW5eF_fy_5Nkz4WGjZ2b1y2JQkfJWmizbVJydpQ0xWaxM9ItdTrCkZ5ao5joUh8EAegoQpIU5bnuI_wcZnNx4qgMZUTqm7u9XX7xWi-LguMS0fa972hPU4Offtg31bdrgIuSXY4ZcNGZpgR61lVeVA2JaCCJfNNahJKHJY5o4B0wfjOSn" },
      { name: "Trần Văn Hoàng", time: "15:15 - 15:45", service: "Xét nghiệm máu", status: "Đang đợi", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6lDfI3zTVxpQNZOC8f_cDzc8KO2h1vliCLJjbTLf0J1Il2suua0MKDl3Gtybz0TEuJiaLeqMS3TWcLXMMmEyw8nvLQnW4C4Ks2q9Sl-XF-05AXg0M2CCPGeFOdz8O0AK6CYhH5SV5xmNv_D8TkPO9nz393eZqfA9iYumuZfgMOai7yQg_03enGZPS3G6Z_zxAjSE3d-mGinexYjXd9mrusEddiAuNPP7C1OuvJ05VPOGR6s6IC9y9k0_hFlqIp7ZxomicEm72" }
    ],
    actions: [
      { title: "Chỉnh sửa phòng khám", desc: "Cập nhật thông tin liên hệ, mô tả và chuyên khoa của phòng khám.", icon: "edit_note", route: "/clinic-info" },
      { title: "Thời gian hoạt động", desc: "Thiết lập giờ mở cửa, lịch nghỉ lễ và các ca trực bác sĩ.", icon: "event_available", route: "/clinic-detail" }
    ],
    upgrade: {
      title: "Nâng cấp gói Pro",
      desc: "Mở khóa tính năng nhắc lịch tự động qua SMS và Zalo.",
      button: "Nâng cấp ngay"
    }
  },
  bookingHistory: {
    title: "Lịch sử đặt khám",
    subtitle: "Quản lý và theo dõi danh sách lịch hẹn khám của bệnh nhân tại phòng khám.",
    filters: {
      time: "Thời gian",
      name: "Tên bệnh nhân",
      phone: "Số điện thoại",
      email: "Email",
      sort: "Sắp xếp",
      button: "Lọc kết quả"
    },
    tableHeaders: ["STT", "Giờ khám", "Tên bệnh nhân", "SĐT", "Email", "Tình trạng"]
  },
  medicalRecords: {
    title: "Hồ sơ bệnh án",
    subtitle: "Quản lý và tra cứu hồ sơ bệnh án của tất cả bệnh nhân.",
    searchPlaceholder: "Tìm kiếm mã bệnh án hoặc tên bệnh nhân...",
    searchButton: "Tìm kiếm",
    tableHeaders: ["Mã BA", "Bệnh nhân", "Ngày khám", "Chẩn đoán", "Bác sĩ", "Thao tác"],
    records: [
      { id: 'BA-001', name: 'Nguyễn Văn An', date: '20/11/2024', diagnosis: 'Viêm họng cấp', doctor: 'BS. Tuấn' },
      { id: 'BA-002', name: 'Lê Thị Mai', date: '18/11/2024', diagnosis: 'Đau dạ dày', doctor: 'BS. Lan' },
      { id: 'BA-003', name: 'Trần Văn Hoàng', date: '15/11/2024', diagnosis: 'Sốt siêu vi', doctor: 'BS. Tuấn' },
    ]
  },
  clinicDetail: {
    name: "Phòng Khám Đa Khoa Sài Gòn Tâm Anh",
    address: "2B Phổ Quang, Phường 2, Tân Bình, TP. HCM",
    rating: 4.9,
    reviewCount: 1250,
    introTitle: "Giới thiệu",
    introText: "Phòng khám Đa khoa Sài Gòn Tâm Anh được trang bị hệ thống máy móc, thiết bị y tế hiện đại, cao cấp hàng đầu thế giới từ các nước G7. Chúng tôi tự hào mang đến quy trình thăm khám và điều trị chuyên nghiệp, tận tâm, đảm bảo độ chính xác cao và an toàn tuyệt đối cho bệnh nhân.",
    doctorsTitle: "Đội ngũ bác sĩ chuyên khoa",
    doctors: [
      { name: "PGS.TS.BS Nguyễn Văn A", specialty: "Chuyên khoa Tim mạch", exp: "Hơn 25 năm kinh nghiệm", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5LV0kWb_xZbbF-HdnL7s3BapAx78OPg2y3HM_PuX-zVSiAe-UJ6Kbw2JbA7uT2JOBpr6J12Ycjwd4zNTYE3G5lxkNYGCoaLI0774jILmPWukH_U1809aDkAdvE-6LjO9RTyeRb6kqnhw1hdVQgfq3c4F510FWogRlvbZNzE8hnB3mqZmi4ojrG21VR1VTD2wz8HOBjcucpRBiZb_IPCn2kOjj0sKVXWxlgl31I5oKRCjohdzM5T175P1X-uAjzhbWLT1r6rMH" },
      { name: "ThS.BS Trần Thị B", specialty: "Chuyên khoa Nhi", exp: "Hơn 15 năm kinh nghiệm", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOKB1imgBgeoHYp2SLtACwvMGk2NuNAHgpyQOxvJJQuKYxIKZAtl11Pme-QdjGPzYE9OlXDDGAA8VgGoF4bPPfhqYGkKxosTtxSfmCNvALGtsRKeJrKNPLq02tKLw38kbK60Lo7EkNrEbza_wCm-7ZOsUi_2DwNAlbADrrGjU7OeDdXb2yQvSNohyBk7qWkp2KF7ZXCrN7vny6sCIhLp0_AxSBcCn9g8a_q0uNf0NAKc3eS6Ip1-d8V2odL6Ue51NiJA7EZhsw" }
    ],
    bookingTitle: "Lịch khám trống",
    bookingSubtitle: "Chọn thời gian phù hợp để đặt lịch",
    bookingButton: "Đặt lịch khám ngay",
    bookingNotice: "Yêu cầu đăng nhập để hoàn tất đặt lịch",
    verifiedText: "Phòng khám đã được xác minh bởi PatientCare"
  },
  clinicInfo: {
    title: "Thông tin phòng khám",
    subtitle: "Quản lý thông tin giới thiệu, hình ảnh và chuyên khoa của phòng khám.",
    sectionTitle: "Thông tin cơ bản",
    fields: {
      name: "Tên phòng khám",
      phone: "Số điện thoại",
      address: "Địa chỉ",
      email: "Email liên hệ"
    },
    defaults: {
      name: "Phòng Khám Đa Khoa Tâm Trí",
      phone: "0236 123 456",
      address: "64 Cách Mạng Tháng 8, Hải Châu, Đà Nẵng",
      email: "info@tamtrihospital.vn"
    }
  },
  clinicLogin: {
    title: "Clinic Portal",
    subtitle: "Đăng nhập dành cho phòng khám",
    fields: {
      id: "Mã phòng khám",
      password: "Mật khẩu"
    },
    button: "ĐĂNG NHẬP"
  },
  patientHome: {
    hero: {
      title: "Chăm sóc sức khỏe toàn diện cho gia đình bạn",
      subtitle: "Kết nối nhanh chóng với hàng trăm phòng khám uy tín tại Đà Nẵng. Đặt lịch khám chỉ với vài bước đơn giản.",
      button: "Đặt lịch ngay"
    },
    suggestedTitle: "Phòng khám gợi ý",
    suggestedSubtitle: "Dựa trên đánh giá và vị trí của bạn",
    clinics: [
      {
        name: "Phòng Khám Đa Khoa Tâm Trí",
        location: "Hải Châu, Đà Nẵng",
        price: "200.000đ+",
        status: "Mở cửa",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpEPZi5Hgi0PjxvD1BTRuT3pQp5aMAjSh4znzey5p94fZDGdXkK4wZHT-xtCG_TZ_vNLZGjtBEvSVETSOA-AHa9E4edYR2oDjnm4ZtWLWJh9juOuH2lGmA_CHyLlf1-NPxug-zKf626AcnyvWFevEhJX5SHGC03MaTX8zrEG4QVYXmMKBVsTtk28BQjAZ0U6ejOSsvxW1pE8kTIYkdUggNhbDnEKWsUk356FPBq6wW-TSsidVBc7WuDJF5oQ5VnFsEk6L9c0Zj"
      }
    ]
  },
  patientLogin: {
    title: "PatientCare",
    subtitle: "Đăng nhập dành cho Bệnh nhân",
    fields: {
      identity: "Số điện thoại / Email",
      password: "Mật khẩu"
    },
    button: "ĐĂNG NHẬP",
    social: "Hoặc đăng nhập bằng"
  },
  main: {
    clinic: {
      title: "Dành cho Phòng khám",
      desc: "Quản lý lịch hẹn, hồ sơ bệnh nhân và vận hành phòng khám chuyên nghiệp.",
      button: "TRUY CẬP HỆ THỐNG"
    },
    patient: {
      title: "Dành cho Bệnh nhân",
      desc: "Tìm kiếm phòng khám, đặt lịch hẹn và theo dõi hồ sơ sức khỏe cá nhân.",
      button: "ĐẶT LỊCH KHÁM"
    }
  },
  quickBooking: {
    title: "Đặt lịch khám nhanh",
    subtitle: "Điền thông tin bên dưới để đặt lịch với bác sĩ ngay lập tức.",
    fields: {
      name: "Họ và tên",
      phone: "Số điện thoại",
      specialty: "Chuyên khoa",
      date: "Ngày khám"
    },
    button: "XÁC NHẬN ĐẶT LỊCH"
  },
  patientHistory: {
    title: "Lịch sử khám bệnh của tôi",
    subtitle: "Xem lại các lần khám và kết quả điều trị của bạn.",
    records: [
      {
        id: "REC-001",
        clinic: "Phòng Khám Đa Khoa Tâm Trí",
        date: "15/10/2024",
        desc: "Khám tổng quát & xét nghiệm máu định kỳ.",
        cost: "450.000đ",
        status: "Đã hoàn thành"
      }
    ]
  }
};





