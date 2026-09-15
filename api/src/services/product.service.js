import {
  findCategories,
  findProductByIdOrSlug,
  findProducts,
} from "../repositories/product.repository.js";

export const listProducts = (query) => findProducts(query);
export const listCategories = () => findCategories();
export const getProduct = (value) => {
  const product = findProductByIdOrSlug(value);
  if (!product) throw Object.assign(new Error("Không tìm thấy sản phẩm."), { statusCode: 404 });
  return product;
};

