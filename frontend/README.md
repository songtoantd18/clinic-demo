# ClinicPulse - Smart Clinic Management System

ClinicPulse là một hệ thống quản lý phòng khám hiện đại được chuyển đổi từ thiết kế Google Stitch sang nền tảng React + Vite. Hệ thống cung cấp giải pháp toàn diện cho cả quản trị viên phòng khám và bệnh nhân.

## 🚀 Tính năng chính

### Phía Phòng Khám (Admin)
- **Tổng quan (Dashboard):** Thống kê lượt khám, doanh thu và lịch hẹn sắp tới.
- **Quản lý Lịch hẹn:** Theo dõi danh sách đặt lịch, cập nhật trạng thái khám.
- **Hồ sơ bệnh án:** Lưu trữ và tra cứu lịch sử khám bệnh của bệnh nhân.
- **Thông tin phòng khám:** Cập nhật thông tin liên hệ, chuyên khoa và giờ hoạt động.

### Phía Bệnh Nhân
- **Tìm kiếm phòng khám:** Tra cứu các phòng khám uy tín theo khu vực và chuyên khoa.
- **Đặt lịch nhanh:** Quy trình đặt lịch đơn giản, thuận tiện.
- **Lịch sử cá nhân:** Xem lại các lần khám và kết quả bệnh án của bản thân.

## 🛠 Công nghệ sử dụng
- **Frontend:** React.js, Tailwind CSS
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Icons:** Material Symbols (Google Fonts)

## 📁 Cấu trúc thư mục
- `src/layouts/`: Chứa các khung giao diện chung (DashboardLayout, PatientLayout).
- `src/pages/`: Chứa các màn hình chức năng của hệ thống.
- `src/components/`: Các thành phần giao diện dùng chung (Header, Sidebar).
- `stitch_exports/`: Chứa code HTML gốc được xuất từ Google Stitch.

## 🏁 Bắt đầu
1. Cài đặt dependencies: `npm install`
2. Chạy môi trường phát triển: `npm run dev`
3. Build sản phẩm: `npm run build`

---

## 🎨 design.md là gì?

`design.md` là file tài liệu dùng để ghi lại **Design System** của dự án. Trong dự án này, nó đóng vai trò:
1. **Lưu trữ Tokens:** Định nghĩa các mã màu (Primary, Secondary, Error), Font chữ (Inter, Outfit) và các khoảng cách (Spacing).
2. **Quy tắc UI:** Các quy định về bo góc (Border Radius), đổ bóng (Shadow) để đảm bảo giao diện đồng nhất.
3. **Tra cứu nhanh:** Giúp lập trình viên biết chính xác mã màu nào nên dùng cho nút bấm, màu nào cho văn bản mà không cần mở file thiết kế.

*Gợi ý: Bạn có thể xem các thông số này trong file `tailwind.config.js` của dự án.*
