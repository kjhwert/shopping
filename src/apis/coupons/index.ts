import { Coupon } from "./types";
import coupons from "./couponsAPI.mock";

export const getCoupons = (): Promise<Coupon[]> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(coupons);
    }, 500);
  });
};
