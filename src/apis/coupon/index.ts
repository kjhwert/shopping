import couponsMock from "../../mocks/coupons/coupons.mock";
import { Coupon } from "./types";

export const getCoupons = (): Promise<Coupon[]> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(couponsMock);
    }, 500);
  });
};
