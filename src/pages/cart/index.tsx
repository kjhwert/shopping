import useCart from "./hooks/useCart";
import * as S from "./styles";
import useCoupon from "./hooks/useCoupon";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const Cart = () => {
  const navigate = useNavigate();

  const { availableCoupons, selectedCoupon, onCouponSelect } = useCoupon();

  const {
    carts,
    totalPrice,
    onRemoveItem,
    onUpdateItem,
    onDiscountUnselect,
    onDiscountByRate,
    onDiscountByAmount,
  } = useCart();

  const haveItemsToAvailableCoupon = useMemo(
    () =>
      carts
        .filter((cart) => cart.checked)
        .some((cart) => cart.availableCoupon !== false),
    [carts],
  );

  const handleSelectCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const couponId = +e.target.value;

    onCouponSelect(couponId);
    if (couponId === -1) {
      onDiscountUnselect();
      return;
    }

    const coupon = availableCoupons?.find((coupon) => coupon.id === couponId);

    if (coupon) {
      switch (coupon.type) {
        case "rate":
          onDiscountByRate(coupon.discountRate);
          break;
        case "amount":
          onDiscountByAmount(coupon.discountAmount);
      }
    }
  };

  if (carts.length === 0) {
    return (
      <S.Layout>
        <S.EmptyCart>
          <h1>장바구니에 담은 상품이 없습니다.</h1>
          <S.MoveToShopButton onClick={() => navigate("/products")}>
            CONTINUE SHOPPING
          </S.MoveToShopButton>
        </S.EmptyCart>
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      <S.Table>
        <thead>
          <tr>
            <S.HeaderColumnProduct>상품정보</S.HeaderColumnProduct>
            <S.HeaderColumn>수량</S.HeaderColumn>
            <S.HeaderColumn>주문금액</S.HeaderColumn>
          </tr>
        </thead>
        <tbody>
          {carts.map((cartItem, index) => (
            <tr key={cartItem.item_no}>
              <S.BodyColumn>
                <S.BodyColumnProduct>
                  <input
                    type="checkbox"
                    checked={cartItem.checked}
                    onChange={(e) =>
                      onUpdateItem(index, { checked: e.target.checked })
                    }
                  />
                  <S.Image src={cartItem.detail_image_url} alt="상품 이미지" />
                  <div>{cartItem.item_name}</div>
                  <button onClick={() => onRemoveItem(index)}>remove</button>
                </S.BodyColumnProduct>
              </S.BodyColumn>
              <S.BodyColumn>
                <S.BodyContent>
                  <input
                    type="number"
                    value={cartItem.count}
                    min={1}
                    onChange={(e) =>
                      onUpdateItem(index, { count: Number(e.target.value) })
                    }
                  />
                </S.BodyContent>
              </S.BodyColumn>
              <S.BodyColumn>
                <S.BodyColumnPrice>
                  {(cartItem.discountPrice * cartItem.count).toLocaleString()}
                </S.BodyColumnPrice>
              </S.BodyColumn>
            </tr>
          ))}
        </tbody>
      </S.Table>
      <S.Section>
        <S.CouponSection>
          <h1>쿠폰</h1>
          <select
            disabled={!haveItemsToAvailableCoupon}
            value={selectedCoupon?.id}
            onChange={handleSelectCoupon}
          >
            <option value="-1">선택 안함</option>
            {availableCoupons.map((coupon) => (
              <option key={`coupon-option-${coupon.id}`} value={coupon.id}>
                {coupon.title}
              </option>
            ))}
          </select>
        </S.CouponSection>
        <S.PaymentPriceSection>
          <h1>총 결제금액</h1>
          <S.TotalPaymentPrice>
            {totalPrice.toLocaleString()}
          </S.TotalPaymentPrice>
          원
        </S.PaymentPriceSection>
      </S.Section>
    </S.Layout>
  );
};

export default Cart;
