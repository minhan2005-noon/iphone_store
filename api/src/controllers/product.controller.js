import { getProduct, listCategories, listProducts } from "../services/product.service.js";

export function productsIndex(url) {
  return listProducts({
    category: url.searchParams.get("category") || "all",
    search: url.searchParams.get("search") || "",
    sort: url.searchParams.get("sort") || "featured",
    page: url.searchParams.get("page") || 1,
    limit: url.searchParams.get("limit") || 12,
  });
}

export const productsShow = (value) => getProduct(value);
export const categoriesIndex = () => ({ items: listCategories() });

