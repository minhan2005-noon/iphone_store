import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const processes = [];
let stopping = false;

function start(label, directory) {
  const child = spawn("npm", ["run", "dev"], {
    cwd: resolve(root, directory),
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  processes.push(child);
  child.on("error", (error) => {
    console.error(`[${label}] Không thể khởi động:`, error.message);
    stopAll(1);
  });
  child.on("exit", (code, signal) => {
    if (!stopping && code !== 0) {
      console.error(`[${label}] đã dừng (${signal || `mã lỗi ${code}`}).`);
      stopAll(code || 1);
    }
  });
}

function stopAll(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of processes) {
    if (!child.killed) child.kill("SIGTERM");
  }
  setTimeout(() => process.exit(exitCode), 250);
}

console.log("Đang khởi động ÂN Store...");
console.log("Giao diện: http://localhost:3000");
console.log("API:       http://localhost:3001/api/health\n");

start("API", "api");
start("Giao diện", "giao_dien");

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

