import { getProducts } from "./index";
import { RequiredQueryOptions } from "../../configs/queryClient/types";

export const getProductsQuery = (
  ...params: Parameters<typeof getProducts>
): RequiredQueryOptions<typeof getProducts> => {
  return {
    queryFn: () => getProducts(...params),
    queryKey: ["products", ...params],
  };
};
