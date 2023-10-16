import { Product } from "./types";
import mockProducts from "./productsAPI.mock";

interface GetProductsParams {
  page: number;
}

export const getProducts = (params: GetProductsParams): Promise<Product[]> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(mockProducts);
    }, 0);
  });
};
