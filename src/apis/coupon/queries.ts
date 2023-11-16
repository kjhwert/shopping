import { ApiQuery } from "../ApiQuery";
import { getCoupons } from "./index";

export const getCouponsQuery: ApiQuery<typeof getCoupons> = (...params) => {
  return {
    queryFn: () => getCoupons(...params),
    queryKey: ["api", "coupons", ...params],
  };
};
