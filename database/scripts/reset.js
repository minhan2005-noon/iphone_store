import { existsSync, unlinkSync } from "node:fs";
import { databasePath, initializeDatabase } from "./init.js";

if (existsSync(databasePath)) {
  unlinkSync(databasePath);
}

const db = initializeDatabase();
console.log("Đã tạo lại database với 90 sản phẩm demo.");
db.close();

