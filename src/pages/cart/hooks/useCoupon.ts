import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCouponsQuery } from "../../../apis/coupons/queries";
import { Coupon } from "../../../apis/coupons/types";

const useCoupon = () => {
  const { data: availableCoupons } = useQuery({
    ...getCouponsQuery(),
  });

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();

  const handleCouponSelect = (id: number) => {
    const coupon = availableCoupons?.find((coupon) => coupon.id === id);

    setSelectedCoupon(coupon);
  };

  return {
    availableCoupons: availableCoupons ?? [],
    selectedCoupon,
    onCouponSelect: handleCouponSelect,
  };
};

export default useCoupon;
