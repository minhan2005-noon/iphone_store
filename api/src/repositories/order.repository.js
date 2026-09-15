import { db } from "../config/database.js";

export function createOrder({ customerName, customerPhone, customerAddress, items }) {
  const productQuery = db.prepare("SELECT id, name, price, stock FROM products WHERE id = ?");
  const normalizedItems = items.map((item) => {
    const product = productQuery.get(Number(item.productId));
    const quantity = Number(item.quantity);
    if (!product) throw Object.assign(new Error("Có sản phẩm không tồn tại."), { statusCode: 400 });
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw Object.assign(new Error("Số lượng sản phẩm không hợp lệ."), { statusCode: 400 });
    }
    if (product.stock < quantity) {
      throw Object.assign(new Error(`${product.name} chỉ còn ${product.stock} sản phẩm.`), { statusCode: 409 });
    }
    return { ...product, quantity };
  });

  const total = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderCode = `AN${Date.now().toString().slice(-9)}`;
  const insertOrder = db.prepare(`
    INSERT INTO orders (order_code, customer_name, customer_phone, customer_address, total)
    VALUES (?, ?, ?, ?, ?)
  `);
  const insertItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price)
    VALUES (?, ?, ?, ?, ?)
  `);
  const reduceStock = db.prepare("UPDATE products SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");

  db.exec("BEGIN IMMEDIATE");
  try {
    const order = insertOrder.run(orderCode, customerName, customerPhone, customerAddress, total);
    for (const item of normalizedItems) {
      insertItem.run(order.lastInsertRowid, item.id, item.name, item.quantity, item.price);
      reduceStock.run(item.quantity, item.id);
    }
    db.exec("COMMIT");
    return { orderCode, total, status: "pending" };
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

