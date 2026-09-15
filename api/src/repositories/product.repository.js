import { db } from "../config/database.js";

const sortSql = {
  featured: "p.featured DESC, p.id ASC",
  newest: "p.id DESC",
  "price-asc": "p.price ASC, p.id ASC",
  "price-desc": "p.price DESC, p.id ASC",
  name: "p.name COLLATE NOCASE ASC",
};

const toProduct = (row) => ({
  id: row.id,
  sku: row.sku,
  slug: row.slug,
  name: row.name,
  shortDescription: row.short_description,
  category: { slug: row.category_slug, name: row.category_name },
  price: row.price,
  compareAtPrice: row.compare_at_price,
  stock: row.stock,
  featured: Boolean(row.featured),
  color: row.color,
  specs: JSON.parse(row.specs_json || "{}"),
  imageUrl: row.image_url,
});

export function findProducts({ category, search, sort = "featured", page = 1, limit = 12 }) {
  const where = [];
  const params = [];

  if (category && category !== "all") {
    where.push("c.slug = ?");
    params.push(category);
  }

  if (search) {
    where.push("(p.name LIKE ? OR p.short_description LIKE ? OR p.sku LIKE ?)");
    const keyword = `%${search}%`;
    params.push(keyword, keyword, keyword);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const safeLimit = Math.min(Math.max(Number(limit) || 12, 1), 90);
  const safePage = Math.max(Number(page) || 1, 1);
  const offset = (safePage - 1) * safeLimit;
  const orderBy = sortSql[sort] || sortSql.featured;

  const total = db
    .prepare(`SELECT COUNT(*) AS count FROM products p JOIN categories c ON c.id = p.category_id ${whereSql}`)
    .get(...params).count;

  const rows = db
    .prepare(`
      SELECT p.*, c.slug AS category_slug, c.name AS category_name
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ${whereSql}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `)
    .all(...params, safeLimit, offset);

  return {
    items: rows.map(toProduct),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
}

export function findProductByIdOrSlug(value) {
  const row = db
    .prepare(`
      SELECT p.*, c.slug AS category_slug, c.name AS category_name
      FROM products p
      JOIN categories c ON c.id = p.category_id
      WHERE p.id = ? OR p.slug = ?
      LIMIT 1
    `)
    .get(Number(value) || -1, value);
  return row ? toProduct(row) : null;
}

export function findCategories() {
  return db.prepare(`
    SELECT c.id, c.slug, c.name, c.description, COUNT(p.id) AS productCount
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.id
  `).all();
}

