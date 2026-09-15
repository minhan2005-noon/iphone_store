import { createOrder } from "../repositories/order.repository.js";

export function placeOrder(payload = {}) {
  const customerName = String(payload.customerName || "").trim();
  const customerPhone = String(payload.customerPhone || "").trim();
  const customerAddress = String(payload.customerAddress || "").trim();
  const items = Array.isArray(payload.items) ? payload.items : [];

  if (customerName.length < 2) {
    throw Object.assign(new Error("Vui lòng nhập họ tên."), { statusCode: 400 });
  }
  if (!/^(0|\+84)[0-9]{9,10}$/.test(customerPhone.replace(/\s/g, ""))) {
    throw Object.assign(new Error("Số điện thoại chưa đúng định dạng."), { statusCode: 400 });
  }
  if (customerAddress.length < 8) {
    throw Object.assign(new Error("Vui lòng nhập địa chỉ giao hàng đầy đủ."), { statusCode: 400 });
  }
  if (items.length === 0) {
    throw Object.assign(new Error("Giỏ hàng đang trống."), { statusCode: 400 });
  }

  return createOrder({ customerName, customerPhone, customerAddress, items });
}

