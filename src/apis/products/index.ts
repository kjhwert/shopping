import apiFetch from "../apiFetch";
import productItems from "../../mocks/products/products.mock";

export interface Product {
  item_no: number;
  item_name: string;
  detail_image_url: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}

export type AvailableProductSortField = Extract<keyof Product, "score">;

interface GetProductsParams {
  page: number;
  pageSize: number;
  sort: Sort<AvailableProductSortField>;
}

interface GetProductsResponse {
  products: Product[];
  meta: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export const getProducts = (
  params: GetProductsParams,
): Promise<GetProductsResponse> => {
  const { page: paramsPage, pageSize, sort } = params;

  const page = paramsPage - 1;

  return new Promise((resolve) => {
    window.setTimeout(() => {
      const sortedProducts = productItems.sort((prev, next) => {
        if (sort.order === "desc") {
          return next[sort.field] - prev[sort.field];
        }

        return prev[sort.field] - next[sort.field];
      });

      const pagingProducts = sortedProducts.slice(
        page * pageSize,
        page * pageSize + pageSize,
      );

      const response: GetProductsResponse = {
        products: pagingProducts,
        meta: {
          page: paramsPage,
          pageSize,
          totalPages: Math.ceil(sortedProducts.length / pageSize),
        },
      };

      resolve(response);
    }, 500);
  });
};
