import { ApiQuery } from "../ApiQuery";
import { getCoupons } from "./index";

export const getCouponsQuery: ApiQuery<typeof getCoupons> = (...params) => ({
  queryFn: () => getCoupons(...params),
  queryKey: ["coupons", ...params],
});
