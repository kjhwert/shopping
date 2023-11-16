import useQuery from "../../hooks/useQuery";
import { getCouponsQuery } from "../../apis/coupon/queries";
import * as S from "./styles";
import { useState } from "react";
import { Coupon } from "../../apis/coupon/types";

interface Props {
  onSelected(coupon: Coupon | null): void;
}

const CouponList = ({ onSelected }: Props) => {
  const { data: coupons } = useQuery({
    ...getCouponsQuery(),
    suspense: true,
  });

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleSelectCoupon = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
    onSelected(coupon);
  };

  return (
    <S.Layout>
      <h1>쿠폰</h1>
      <S.CouponButton
        isSelected={selectedCoupon === null}
        onClick={() => handleSelectCoupon(null)}
      >
        선택 안함
      </S.CouponButton>
      {coupons?.map((coupon) => (
        <S.CouponButton
          key={`coupon-option-${coupon.id}`}
          isSelected={selectedCoupon?.id === coupon.id}
          onClick={() => handleSelectCoupon(coupon)}
          data-testid={`coupon-option-${coupon.id}`}
        >
          {coupon.title}
        </S.CouponButton>
      ))}
    </S.Layout>
  );
};

export default CouponList;
