import { placeOrder } from "../services/order.service.js";

export const ordersCreate = (payload) => ({
  message: "Đặt hàng thành công. ÂN Store sẽ liên hệ xác nhận sớm.",
  order: placeOrder(payload),
});

