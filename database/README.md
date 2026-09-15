# Database ÂN Store

SQLite lưu danh mục sản phẩm và đơn hàng của cửa hàng.

## Dữ liệu mẫu

- 30 sản phẩm iPhone
- 30 sản phẩm MacBook
- 30 phụ kiện Apple

Giá, tồn kho và thông số trong seed là dữ liệu demo, không phải báo giá chính thức.

## Khởi tạo

Yêu cầu Node.js 22.5 trở lên.

```bash
npm run init
```

File SQLite được tạo tại `data/iphone-store.db`. Chạy `npm run reset` để xóa dữ liệu cũ và tạo lại 90 sản phẩm mẫu.

## Cấu trúc

- `schema/schema.sql`: bảng, ràng buộc và index.
- `seeders/product-catalog.js`: danh mục 90 sản phẩm.
- `scripts/init.js`: tạo database và thêm seed khi database đang rỗng.
- `scripts/reset.js`: tạo lại database từ đầu.
- `scripts/update-images.js`: cập nhật ảnh theo đúng model mà không xóa đơn hàng.
