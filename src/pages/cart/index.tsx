import useCart from "./hooks/useCart";
import * as S from "./styles";
import useCoupon from "./hooks/useCoupon";
import { useNavigate } from "react-router-dom";

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
      <S.CartSection>
        <S.Table>
          <thead>
            <tr>
              <S.HeaderColumnCheckbox>선택</S.HeaderColumnCheckbox>
              <S.HeaderColumnProduct>상품정보</S.HeaderColumnProduct>
              <S.HeaderColumn>수량</S.HeaderColumn>
              <S.HeaderColumn>주문금액</S.HeaderColumn>
            </tr>
          </thead>
          <tbody>
            {carts.map((product, index) => (
              <tr key={product.item_no}>
                <td>
                  <S.BodyColumn>
                    <input type="checkbox" />
                  </S.BodyColumn>
                </td>
                <td>
                  <S.BodyColumnProduct>
                    <S.Image src={product.detail_image_url} alt="상품 이미지" />
                    <div>{product.item_name}</div>
                    <button onClick={() => onRemoveItem(index)}>remove</button>
                  </S.BodyColumnProduct>
                </td>
                <td>
                  <S.BodyColumn>
                    <input
                      type="number"
                      value={product.count}
                      min={1}
                      onChange={(e) =>
                        onUpdateItem(index, { count: Number(e.target.value) })
                      }
                    />
                  </S.BodyColumn>
                </td>
                <td>
                  <S.BodyColumnPrice>
                    {(product.discountPrice * product.count).toLocaleString()}
                  </S.BodyColumnPrice>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
        <S.Section>
          <h1>쿠폰</h1>
          <select value={selectedCoupon?.id} onChange={handleSelectCoupon}>
            <option value="-1">선택 안함</option>
            {availableCoupons.map((coupon) => (
              <option key={`coupon-option-${coupon.id}`} value={coupon.id}>
                {coupon.title}
              </option>
            ))}
          </select>
        </S.Section>
        <S.Section>
          <h1>총 결제금액</h1>
          <p>{totalPrice.toLocaleString()}</p>
        </S.Section>
      </S.CartSection>
    </S.Layout>
  );
};

export default Cart;
