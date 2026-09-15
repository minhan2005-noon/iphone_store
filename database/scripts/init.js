import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { catalog } from "../seeders/product-catalog.js";

const currentDir = dirname(fileURLToPath(import.meta.url));
export const databasePath = resolve(currentDir, "../data/iphone-store.db");
const schemaPath = resolve(currentDir, "../schema/schema.sql");

export function initializeDatabase() {
  mkdirSync(dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec(readFileSync(schemaPath, "utf8"));

  const categoryCount = db.prepare("SELECT COUNT(*) AS count FROM categories").get().count;
  if (categoryCount === 0) {
    const insertCategory = db.prepare(
      "INSERT INTO categories (slug, name, description) VALUES (?, ?, ?)",
    );
    insertCategory.run("iphone", "iPhone", "Điện thoại iPhone chính hãng");
    insertCategory.run("macbook", "MacBook", "MacBook Air và MacBook Pro");
    insertCategory.run("phu-kien", "Phụ kiện", "Phụ kiện cho hệ sinh thái Apple");
  }

  const productCount = db.prepare("SELECT COUNT(*) AS count FROM products").get().count;
  if (productCount === 0) {
    const categories = Object.fromEntries(
      db.prepare("SELECT id, slug FROM categories").all().map((row) => [row.slug, row.id]),
    );
    const insertProduct = db.prepare(`
      INSERT INTO products (
        sku, slug, name, short_description, category_id, price,
        compare_at_price, stock, featured, color, specs_json, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec("BEGIN");
    try {
      for (const product of catalog) {
        insertProduct.run(
          product.sku,
          product.slug,
          product.name,
          product.shortDescription,
          categories[product.categorySlug],
          product.price,
          product.compareAtPrice,
          product.stock,
          product.featured,
          product.color,
          JSON.stringify(product.specs),
          product.imageUrl,
        );
      }
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }

  return db;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const db = initializeDatabase();
  const counts = db.prepare(`
    SELECT c.name, COUNT(p.id) AS total
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id
  `).all();
  console.log("Database ÂN Store đã sẵn sàng:", counts);
  db.close();
}

