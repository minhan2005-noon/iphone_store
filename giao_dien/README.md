# Giao diện ÂN Store

Giao diện cửa hàng iPhone, MacBook và phụ kiện Apple, kết nối với API ở cổng `3001`.

## Chạy giao diện

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`. Cần chạy API trước hoặc song song để tải đủ 90 sản phẩm và đặt hàng.

## Chức năng

- Hiển thị, tìm kiếm, lọc và sắp xếp 90 sản phẩm.
- Giỏ hàng, thay đổi số lượng và gửi đơn hàng về API.
- Giao diện responsive cho máy tính và điện thoại.
- Logo ÂN kết hợp biểu tượng quả táo khuyết được tạo bằng CSS.

Biến môi trường tùy chọn:

```text
NEXT_PUBLIC_API_URL=http://localhost:3001
```

