import products from "./productsAPI.mock";
import { Product } from "./types";

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(products);
    }, 0);
  });
};
