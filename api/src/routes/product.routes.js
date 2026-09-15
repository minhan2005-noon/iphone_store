import {
  categoriesIndex,
  productsIndex,
  productsShow,
} from "../controllers/product.controller.js";

export function matchProductRoute(method, pathname, url) {
  if (method === "GET" && pathname === "/api/categories") return categoriesIndex();
  if (method === "GET" && pathname === "/api/products") return productsIndex(url);
  if (method === "GET" && pathname.startsWith("/api/products/")) {
    return productsShow(decodeURIComponent(pathname.slice("/api/products/".length)));
  }
  return undefined;
}

