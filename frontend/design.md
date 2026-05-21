# Design System Documentation

Tài liệu này tổng hợp các thông số thiết kế được trích xuất từ Google Stitch và cấu hình trong dự án ClinicPulse.

## 🎨 Bảng màu (Color Palette)

### Màu Chính (Primary)
- **Primary:** `#003d9b` (Sử dụng cho Brand, Buttons chính, Headers)
- **On Primary:** `#ffffff` (Màu chữ trên nền Primary)
- **Primary Container:** `#0052cc` (Nền cho các khối quan trọng)

### Màu Phụ (Secondary)
- **Secondary:** `#006c47` (Sử dụng cho các trạng thái thành công, tích cực)
- **Secondary Container:** `#82f9be`

### Màu Cảnh báo (Error)
- **Error:** `#ba1a1a`
- **Error Container:** `#ffdad6`

### Màu Nền & Bề mặt (Surface)
- **Background:** `#f9f9ff`
- **Surface:** `#f9f9ff`
- **Outline:** `#737685` (Dùng cho border)

## Typography (Kiểu chữ)

Dự án sử dụng Font **Inter** làm chủ đạo.

| Token | Size | Weight | Line Height |
| :--- | :--- | :--- | :--- |
| **h1** | 32px | 700 | 40px |
| **h2** | 24px | 600 | 32px |
| **h3** | 20px | 600 | 28px |
| **body-lg** | 16px | 400 | 24px |
| **body-md** | 14px | 400 | 20px |
| **label-md** | 14px | 600 | 20px |
| **caption** | 12px | 400 | 16px |

## 📐 Spacing & Layout

- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **xxl:** 48px

## 💠 Border Radius (Bo góc)

- **Default:** 2px (`0.125rem`)
- **lg:** 4px (`0.25rem`)
- **xl:** 8px (`0.5rem`)
- **full:** 12px (`0.75rem`)

---

*Lưu ý: Các giá trị này được cấu hình tự động trong `tailwind.config.js`. Khi viết code CSS/Tailwind, hãy ưu tiên sử dụng các class như `text-primary`, `bg-surface-container`, `p-md`... thay vì dùng mã màu hex trực tiếp.*
