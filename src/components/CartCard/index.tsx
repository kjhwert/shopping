import * as S from "./styles";
import React from "react";
import { CartItem } from "../../stores/cart/types";

interface Props {
  cart: CartItem;
  onCheck: (item_no: number) => void;
  onIncreaseCount: (item_no: number) => void;
  onDecreaseCount: (item_no: number) => void;
  onRemove: (item_no: number) => void;
}

const CartCard = ({
  cart,
  onCheck,
  onIncreaseCount,
  onDecreaseCount,
  onRemove,
}: Props) => {
  return (
    <S.Item>
      <input
        type="checkbox"
        checked={cart.checked}
        onChange={() => onCheck(cart.product.item_no)}
        data-testid={`checkbox-${cart.product.item_no}`}
      />
      <S.ItemInfo>
        <S.ProductInfo>
          <S.ProductName>{cart.product.item_name}</S.ProductName>
          <S.PriceInfo>
            <S.OriginPrice>
              {cart.product.price.toLocaleString()}원
            </S.OriginPrice>
            <S.DiscountedPrice
              data-testid={`discountPrice-${cart.product.item_no}`}
            >
              {(cart.discountPrice * cart.count).toLocaleString()}원
            </S.DiscountedPrice>
          </S.PriceInfo>
          <S.RemoveButton
            data-testid={`removeButton-${cart.product.item_no}`}
            onClick={() => onRemove(cart.product.item_no)}
          >
            삭제
          </S.RemoveButton>
        </S.ProductInfo>
        <S.CountInfo>
          <S.CountButton
            data-testid={`decreaseCount-${cart.product.item_no}`}
            onClick={() => onDecreaseCount(cart.product.item_no)}
          >
            -
          </S.CountButton>
          <S.Count data-testid={`count-${cart.product.item_no}`}>
            {cart.count}
          </S.Count>
          <S.CountButton
            data-testid={`increaseCount-${cart.product.item_no}`}
            onClick={() => onIncreaseCount(cart.product.item_no)}
          >
            +
          </S.CountButton>
        </S.CountInfo>
        <S.Image src={cart.product.detail_image_url} alt="상품 이미지" />
      </S.ItemInfo>
    </S.Item>
  );
};

export default CartCard;
