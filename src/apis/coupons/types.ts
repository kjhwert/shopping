interface BaseCoupon {
  title: string;
}

interface RateCoupon extends BaseCoupon {
  type: "rate";
  discountRate: number;
}

interface AmountCoupon extends BaseCoupon {
  type: "amount";
  discountAmount: number;
}

export type Coupon = RateCoupon | AmountCoupon;
