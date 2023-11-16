import React from "react";
import * as S from "./styles";
import useCartStore from "../../stores/cart";
import CouponList from "../../components/CouponList";
import SuspenseBoundary from "../../components/SuspenseBoundary";
import CartCard from "../../components/CartCard";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const {
    carts,
    totalPrice,
    isAllChecked,
    onCheckItem,
    onCheckItemAll,
    onIncreaseItemCount,
    onDecreaseItemCount,
    onRemoveItem,
    onSelectCoupon,
  } = useCartStore((state) => state);

  if (carts.length === 0) {
    return <EmptyCart />;
  }

  return (
    <S.Layout>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAllChecked()}
            onChange={(e) => onCheckItemAll(e.target.checked)}
          />
          <span>전체선택</span>
        </label>
      </div>
      <S.List>
        {carts.map((cart) => (
          <CartCard
            key={`cart-item-${cart.product.item_no}`}
            cart={cart}
            onCheck={onCheckItem}
            onIncreaseCount={onIncreaseItemCount}
            onDecreaseCount={onDecreaseItemCount}
            onRemove={onRemoveItem}
          />
        ))}
      </S.List>
      <SuspenseBoundary>
        <CouponList onSelected={onSelectCoupon} />
      </SuspenseBoundary>
      <S.Order>
        <S.TotalPriceLabel>총 결제금액</S.TotalPriceLabel>
        <S.TotalPrice data-testid="total-price">
          {totalPrice.toLocaleString()}원
        </S.TotalPrice>
      </S.Order>
    </S.Layout>
  );
};

export default Cart;
