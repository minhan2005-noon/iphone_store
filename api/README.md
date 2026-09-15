# API ÂN Store

API Node.js kết nối SQLite, không cần cài package bên thứ ba.

## Chạy API

Yêu cầu Node.js 22.5 trở lên.

```bash
npm run dev
```

API mặc định chạy tại `http://localhost:3001`. Database và 90 sản phẩm được tự động tạo trong lần chạy đầu.

## Endpoint

- `GET /api/health`: kiểm tra API.
- `GET /api/categories`: danh mục và số sản phẩm.
- `GET /api/products`: danh sách sản phẩm.
- `GET /api/products/:id-or-slug`: chi tiết sản phẩm.
- `POST /api/orders`: tạo đơn hàng và trừ tồn kho.

Tham số danh sách: `category`, `search`, `sort`, `page`, `limit`.

Ví dụ:

```text
/api/products?category=iphone&search=pro&sort=price-asc&page=1&limit=12
```

