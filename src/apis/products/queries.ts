import { getProducts } from "./index";
import { ApiQuery } from "../ApiQuery";

export const getProductsQuery: ApiQuery<typeof getProducts> = (...params) => {
  return {
    queryFn: () => getProducts(...params),
    queryKey: ["products", ...params],
  };
};
