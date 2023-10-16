import products from "./productsAPI.mock";
import { Product } from "./types";

interface GetProductsParams {
  page: number;
}

export const getProducts = (params: GetProductsParams): Promise<Product[]> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(products);
    }, 0);
  });
};
