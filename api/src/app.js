import { ordersCreate } from "./controllers/order.controller.js";
import { readJson, sendJson, setCors } from "./middleware/http.js";
import { matchProductRoute } from "./routes/product.routes.js";

export async function app(request, response) {
  setCors(response);
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    return response.end();
  }

  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/api/health") {
      return sendJson(response, 200, { status: "ok", service: "ÂN Store API" });
    }

    if (request.method === "POST" && url.pathname === "/api/orders") {
      const result = ordersCreate(await readJson(request));
      return sendJson(response, 201, result);
    }

    const result = matchProductRoute(request.method, url.pathname, url);
    if (result !== undefined) return sendJson(response, 200, result);

    return sendJson(response, 404, { message: "Đường dẫn API không tồn tại." });
  } catch (error) {
    console.error(error);
    return sendJson(response, error.statusCode || 500, {
      message: error.statusCode ? error.message : "Máy chủ đang gặp lỗi. Vui lòng thử lại.",
    });
  }
}

