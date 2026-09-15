export function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

export async function readJson(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > 1_000_000) {
      throw Object.assign(new Error("Dữ liệu gửi lên quá lớn."), { statusCode: 413 });
    }
    chunks.push(chunk);
  }
  try {
    return chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
  } catch {
    throw Object.assign(new Error("JSON không hợp lệ."), { statusCode: 400 });
  }
}

export function setCors(response) {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  response.setHeader("Access-Control-Allow-Origin", frontendUrl);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

