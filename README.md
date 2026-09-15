# ÂN Store

Website bán hàng demo gồm 90 sản phẩm Apple: 30 iPhone, 30 MacBook và 30 phụ kiện.

## Cấu trúc

- `giao_dien`: website React/Vinext, chạy ở cổng `3000`.
- `api`: API Node.js, chạy ở cổng `3001`.
- `database`: schema SQLite, seed 90 sản phẩm và dữ liệu đơn hàng.
- `uploads`: nơi dành cho file tải lên trong giai đoạn phát triển sau.

## Chạy dự án

Lần đầu tiên, cài đặt và tạo database:

```bash
npm run setup
```

Sau đó chạy toàn bộ API và giao diện bằng một lệnh từ thư mục tổng:

```bash
npm run dev
```

Mở `http://localhost:3000`. Nhấn `Ctrl + C` để dừng cả hai tiến trình.

Nếu muốn chạy riêng từng phần, dùng `npm run api` hoặc `npm run frontend`.

> Giá, tồn kho và thông số sản phẩm hiện là dữ liệu mẫu phục vụ phát triển giao diện.
