interface BaseCoupon {
  id: number;
  title: string;
}

interface RateCoupon extends BaseCoupon {
  type: "rate";
  discountRate: number;
}

export interface AmountCoupon extends BaseCoupon {
  type: "amount";
  discountAmount: number;
}

export const isAmountCoupon = (
  coupon: Coupon | null,
): coupon is AmountCoupon => {
  return coupon?.type === "amount";
};

export type Coupon = RateCoupon | AmountCoupon;
