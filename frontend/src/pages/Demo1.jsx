import React from 'react';

// ============================================================================
// 0. HÀM SAO CHÉP STATIC TỰ VIẾT (Thay thế hoàn toàn cho thư viện ngoài)
// ============================================================================
const hoistStaticsHandmade = (targetComponent, sourceComponent) => {
  // Lấy ra tất cả các thuộc tính và hàm gắn trên Component gốc
  const keys = Object.getOwnPropertyNames(sourceComponent);
  
  // Danh sách các từ khóa mặc định của React tuyệt đối không được ghi đè
  const reactBlacklist = ['length', 'name', 'prototype', 'arguments', 'caller', 'defaultProps', 'displayName', 'propTypes', 'contextTypes'];

  keys.forEach(key => {
    if (!reactBlacklist.includes(key)) {
      try {
        // Tiến hành sao chép hàm static sang component mới
        targetComponent[key] = sourceComponent[key];
      } catch (e) {
        // Bỏ qua nếu gặp thuộc tính đặc biệt bị khóa read-only
      }
    }
  });
  return targetComponent;
};

// ============================================================================
// 1. GIẢ LẬP HỆ THỐNG (Mô phỏng dữ liệu User để bạn dễ test)
// ============================================================================
const getCurrentUser = () => ({ 
  name: "Nguyễn Văn A", 
  role: "USER" // Hãy thử sửa thành "ADMIN" hoặc "EDITOR" để thấy sự thay đổi ở giao diện
});

// ============================================================================
// 2. HIGHER-ORDER COMPONENT (HOC) - PHIÊN BẢN CHUẨN JSX THUẦN
// ============================================================================
export const withAuthorization = (allowedRoles) => (WrappedComponent) => {
  
  // Tạo Function Component mới sử dụng cơ chế forwardRef của React
  const WithAuthorization = React.forwardRef((props, ref) => {
    const user = getCurrentUser();

    // Logic phân quyền viết bằng JSX
    if (!allowedRoles.includes(user.role)) {
      return (
        <div style={{ padding: '20px', border: '1px solid red', backgroundColor: '#fff5f5', color: 'red', borderRadius: '4px', margin: '10px 0' }}>
          <h3>X Lỗi Phân Quyền</h3>
          <p>Tài khoản <strong>{user.name}</strong> (Quyền: <code>{user.role}</code>) không được phép truy cập nội dung này.</p>
          <p>Vui lòng liên hệ Admin để cấp quyền truy cập các chức năng: [ {allowedRoles.join(', ')} ]</p>
        </div>
      );
    }

    // Trả về component gốc sạch sẽ dưới dạng JSX
    return <WrappedComponent ref={ref} {...props} />;
  });

  // Đặt tên hiển thị hỗ trợ debug trên React DevTools
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuthorization.displayName = `WithAuthorization(${wrappedComponentName})`;

  // Sử dụng hàm tự viết ở bước 0 để sao chép hàm static
  hoistStaticsHandmade(WithAuthorization, WrappedComponent);

  return WithAuthorization;
};

// ============================================================================
// 3. CÁC COMPONENT GỐC (Viết bằng cú pháp JSX căn bản)
// ============================================================================

// Trang Quản Lý Doanh Thu
function RawAdminDashboard({ title = "Báo cáo" }) {
  return (
    <div style={{ padding: '20px', border: '1px solid green', backgroundColor: '#f5fff5', borderRadius: '4px', margin: '10px 0' }}>
      <h2>👑 {title} Tổng Tổng Doanh Thu</h2>
      <p style={{ color: '#2ecc71', fontSize: '24px', fontWeight: 'bold' }}>$1,250,000 USD</p>
    </div>
  );
}
// Gắn thử một hàm static để kiểm tra xem HOC tự viết có copy thành công không
RawAdminDashboard.getRouteConfig = () => ({ path: '/admin/dashboard', exact: true });

// Trang Viết Bài
function RawEditorPage() {
  return (
    <div style={{ padding: '20px', border: '1px solid blue', backgroundColor: '#f5faff', borderRadius: '4px', margin: '10px 0' }}>
      <h2>📝 Hệ Thống Biên Tập Bài Viết</h2>
      <textarea rows="4" cols="50" placeholder="Nhập nội dung bài viết mới vào đây..." style={{ width: '100%', padding: '10px' }} />
    </div>
  );
}

// ============================================================================
// 4. TIẾN HÀNH BỌC (ENHANCE) COMPONENT
// ============================================================================
export const AdminDashboard = withAuthorization(['ADMIN'])(RawAdminDashboard);
export const EditorPage = withAuthorization(['ADMIN', 'EDITOR'])(RawEditorPage);

// ============================================================================
// 5. COMPONENT ĐIỀU HƯỚNG CHÍNH (App Component để chạy hiển thị)
// ============================================================================
export default function Demo1App() {
  // Đọc thử hàm static đã được copy qua HOC tự viết
  const config = AdminDashboard.getRouteConfig?.();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Demo Thực Tế Về Higher-Order Component (HOC)</h1>
      <p>💡 <em>Mẹo: Hãy thay đổi giá trị <code>role</code> ở dòng 28 để xem giao diện thay đổi tương ứng.</em></p>
      
      {config && <p style={{ color: '#666' }}>⚙️ Cấu hình Router đọc từ hàm Static thành công: <code>{config.path}</code></p>}
      
      <hr />

      {/* Gọi sử dụng các component đã được nâng cấp bằng cú pháp JSX */}
      <AdminDashboard title="Thống Kê Toàn Cầu" />
      <EditorPage />
    </div>
  );
}