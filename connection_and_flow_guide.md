# Hướng Dẫn Kết Nối và Luồng Chạy Hệ Thống / System Connection & Run Flow Guide

Tài liệu này giải thích tình trạng kết nối hiện tại giữa Frontend và Backend, chi tiết luồng xử lý và đề xuất giải pháp kiểm tra dữ liệu trực tiếp trong Cơ sở dữ liệu (CSDL) qua API.
*This document explains the current connection status between Frontend and Backend, details the execution flow, and proposes a solution to inspect database data directly via API.*

---

## 1. Tình Trạng Kết Nối Hiện Tại / Current Connection Status

### Tiếng Việt:
* **Chưa kết nối lập trình (Disconnected):** Hiện tại, Frontend (React + Vite) và Backend (NestJS microservices) **chưa được liên kết trực tiếp bằng code**.
* **Dữ liệu giả lập ở Frontend:** Tất cả các trang ở Frontend (như Dashboard, Lịch sử đặt khám, Chi tiết lịch hẹn) đang sử dụng dữ liệu tĩnh (mockup) được định nghĩa tại file [mockData.ts](file:///d:/1.CONGVIEC/2.Learn/test-antigravity/frontend/src/data/mockData.ts). Không có cuộc gọi HTTP (như `axios` hoặc `fetch`) nào được gửi từ Frontend sang Backend.
* **Backend đang hoạt động độc lập:** Backend chạy tại cổng `3000` (`http://localhost:3000`), có kết nối với CSDL MySQL trên đám mây Aiven và có sẵn tài liệu Swagger tại `http://localhost:3000/api`.

### English:
* **Not programmatically connected (Disconnected):** Currently, the Frontend (React + Vite) and Backend (NestJS microservices) **are not directly linked in the code**.
* **Mock data in Frontend:** All frontend pages (such as Dashboard, Booking History, Appointment Detail) are using static mock data defined in the file [mockData.ts](file:///d:/1.CONGVIEC/2.Learn/test-antigravity/frontend/src/data/mockData.ts). No HTTP requests (like `axios` or `fetch`) are sent from the Frontend to the Backend.
* **Backend is running independently:** The Backend is running on port `3000` (`http://localhost:3000`), connected to an Aiven Cloud MySQL database, and has Swagger docs available at `http://localhost:3000/api`.

---

## 2. Phân Tích Luồng Xử Lý / Analysis of the Execution Flow

### A. Luồng Chạy ở Backend (NestJS API Gateway) / Backend Run Flow
Khi có request gửi đến Backend (ví dụ: tạo cuộc hẹn `POST /appointments`), luồng đi qua các bước sau:
*When a request is sent to the Backend (e.g., creating an appointment `POST /appointments`), the flow goes through the following steps:*

1. **API Entrypoint (`main.ts`):** Nhận request, áp dụng cấu hình CORS, khởi chạy ValidationPipe toàn cục.
   * *Receives the request, applies CORS configuration, and initializes the global ValidationPipe.*
2. **App Module (`app.module.ts`):** Điều phối các module con và áp dụng **`LifecycleMiddleware`** cho toàn bộ các route để log lại thời gian/vòng đời của request.
   * *Coordinates sub-modules and applies **`LifecycleMiddleware`** to all routes to log request timings/lifecycle.*
3. **Authentication Guard (`AuthGuard('jwt')`):** Kiểm tra Header `Authorization: Bearer <JWT_TOKEN>`. Giải mã token để xác định User và phân quyền (`UserRole.PATIENT` hoặc `UserRole.CLINIC`).
   * *Checks the `Authorization: Bearer <JWT_TOKEN>` header. Decodes the token to identify the User and determine their role (`UserRole.PATIENT` or `UserRole.CLINIC`).*
4. **Lifecycle Guard & Pipe (`LifecycleGuard`, `LifecyclePipe`):** Thực hiện thêm các bước kiểm tra nghiệp vụ và định dạng dữ liệu (validation/transformation) trước khi đưa vào Controller.
   * *Performs extra business checks and data formatting (validation/transformation) before hitting the Controller.*
5. **Controller (e.g., `AppointmentController.create`):** Tiếp nhận dữ liệu đã xác thực, lấy thông tin user đăng nhập (`req.user.id`) và gọi tầng Service để xử lý nghiệp vụ.
   * *Receives validated data, extracts the logged-in user ID (`req.user.id`), and invokes the Service layer.*
6. **Service (e.g., `AppointmentService.create`):**
   * Sử dụng **Database Transaction & Pessimistic Lock** (`lock: { mode: 'pessimistic_write' }`) để khóa bảng khi đọc mã cuộc hẹn (`APT-XXXX`) nhằm tránh trùng lặp mã khi có nhiều người đặt cùng lúc (chống Race Condition).
   * Kiểm tra xem khung giờ đó đã được đặt chưa. Nếu hợp lệ, lưu vào DB và Commit Transaction.
   * *Uses **Database Transaction & Pessimistic Lock** (`lock: { mode: 'pessimistic_write' }`) to lock the table when reading the appointment code (`APT-XXXX`) to prevent duplicate codes during concurrent bookings (prevents Race Condition).*
   * *Checks if the time slot is already booked. If valid, saves to DB and commits the transaction.*
7. **TypeORM Entity & Database:** Lưu vào các bảng `users` hoặc `appointments` trong MySQL.
   * *Saves data to `users` or `appointments` tables in MySQL.*

---

### B. Luồng Chạy ở Frontend (Vite + React) / Frontend Run Flow
1. **Entrypoint (`main.tsx`):** Render component `<App />` và nạp CSS (`index.css`).
   * *Renders the `<App />` component and loads CSS (`index.css`).*
2. **Router (`App.tsx`):** Sử dụng `react-router-dom` để định tuyến các trang:
   * Phía phòng khám: `/clinic-login` -> `/dashboard` -> `/clinic-info`...
   * Phía bệnh nhân: `/patient-login` -> `/patient-home` -> `/quick-booking`...
   * *Uses `react-router-dom` to route pages:*
     * *Clinic portal: `/clinic-login` -> `/dashboard` -> `/clinic-info`...*
     * *Patient portal: `/patient-login` -> `/patient-home` -> `/quick-booking`...*
3. **Data Binding (Tĩnh):** Các component import trực tiếp dữ liệu từ [mockData.ts](file:///d:/1.CONGVIEC/2.Learn/test-antigravity/frontend/src/data/mockData.ts) và render ra giao diện thông qua React State.
   * *Data Binding (Static): Components import data directly from [mockData.ts](file:///d:/1.CONGVIEC/2.Learn/test-antigravity/frontend/src/data/mockData.ts) and render it on the interface via React State.*

---

## 3. Giải Pháp Hiển Thị Danh Sách Cuộc Hẹn và User trong Backend / Solution to Show All Appointments & Users in Backend

Mặc định, các API của Backend được bảo mật bằng JWT và lọc dữ liệu nghiêm ngặt theo vai trò người dùng (Ví dụ: Bác sĩ chỉ xem lịch của phòng khám đó, Bệnh nhân chỉ xem lịch của cá nhân họ). 

Để giúp bạn dễ dàng kiểm tra toàn bộ dữ liệu trong CSDL MySQL, chúng tôi đề xuất tạo một **Debug Controller** tạm thời tại API Gateway. Controller này sẽ cung cấp các đường dẫn (endpoints) công khai không cần đăng nhập.

*By default, Backend APIs are secured with JWT and filter data strictly according to user roles (e.g., Doctors only see their clinic's schedule, Patients only see their own). To make it easy for you to inspect all database records, we propose creating a temporary **Debug Controller** in the API Gateway. This controller will provide public, unauthenticated endpoints.*

### Các đường dẫn kiểm tra dữ liệu đề xuất / Proposed Inspect Links:
Sau khi code được cập nhật, bạn có thể click trực tiếp các link sau để kiểm tra:
*Once the code is updated, you can click directly on the following links to check:*

1. **Xem tất cả Users trong hệ thống (gồm cả Bác sĩ & Bệnh nhân, đã ẩn mật khẩu):**
   * *View all Users in the system (both Doctors & Patients, passwords hidden):*
   * 🔗 **[http://localhost:3000/debug/users](http://localhost:3000/debug/users)**
2. **Xem tất cả các Cuộc hẹn khám đã đặt trong hệ thống:**
   * *View all Appointments booked in the system:*
   * 🔗 **[http://localhost:3000/debug/appointments](http://localhost:3000/debug/appointments)**
3. **Trang tài liệu Swagger UI để thử nghiệm API:**
   * *Swagger UI documentation page to test APIs:*
   * 🔗 **[http://localhost:3000/api](http://localhost:3000/api)** (Tìm nhóm **Debug**)

---

## 4. Chi Tiết File Sẽ Chỉnh Sửa (Nếu Bạn Đồng Ý) / Proposed File Changes (If You Agree)

Nếu bạn đồng ý với hướng xử lý này, chúng tôi sẽ thực hiện chỉnh sửa 2 file ở backend:
*If you agree with this approach, we will modify 2 files in the backend:*

### 1) Tạo file mới / Create new file: `backend/apps/api-gateway/src/debug.controller.ts`

```typescript
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
    // Ẩn mật khẩu trước khi trả về / Hide password before returning
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
```

### 2) Cập nhật file / Update file: `backend/apps/api-gateway/src/app.module.ts`

Chúng ta cần import và đăng ký `DebugController` trong `AppModule`:
*We need to import and register `DebugController` in `AppModule`:*

```diff
  import { AuthModule } from './auth/auth.module';
  import { UserModule } from './user/user.module';
  import { AppointmentModule } from './appointment/appointment.module';
  import { LifecycleMiddleware } from './common/lifecycle/lifecycle.middleware';
+ import { DebugController } from './debug.controller';

  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
      DatabaseModule,
      AuthModule,
      UserModule,
      AppointmentModule,
    ],
+   controllers: [DebugController],
  })
  export class AppModule implements NestModule {
```

---

## Bạn muốn tôi làm gì tiếp theo? / What would you like me to do next?
1. **Bạn có đồng ý để tôi cập nhật 2 file trên ở Backend để tạo link debug kiểm tra dữ liệu không?**
   * *Do you agree for me to update the 2 files above in the Backend to create the debug links for checking data?*
2. **Bạn có muốn tôi tiến hành tích hợp thật (gọi API thực tế thay cho mockData) từ Frontend lên Backend luôn không?**
   * *Would you like me to proceed with real integration (making actual API calls instead of mockData) from the Frontend to the Backend?*
