import { Coupon } from "../../apis/coupon/types";

const coupons: Coupon[] = [
  {
    id: 1,
    type: "rate",
    title: "10% 할인 쿠폰",
    discountRate: 10,
  },
  {
    id: 2,
    type: "amount",
    title: "10,000원 할인 쿠폰",
    discountAmount: 10000,
  },
];

export default coupons;
