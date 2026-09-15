import { DatabaseSync } from "node:sqlite";
import { catalog } from "../seeders/product-catalog.js";
import { databasePath, initializeDatabase } from "./init.js";

const bootstrap = initializeDatabase();
bootstrap.close();

const db = new DatabaseSync(databasePath);
const updateImage = db.prepare("UPDATE products SET image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE sku = ?");

db.exec("BEGIN");
try {
  let updated = 0;
  for (const product of catalog) {
    const result = updateImage.run(product.imageUrl, product.sku);
    updated += Number(result.changes);
  }
  db.exec("COMMIT");
  console.log(`Đã cập nhật ảnh đúng model cho ${updated} sản phẩm.`);
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
} finally {
  db.close();
}

