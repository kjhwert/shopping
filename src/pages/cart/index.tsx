import useCart from "../../stores/cart";
import * as S from "./styles";
import { getCouponsQuery } from "../../apis/coupons/queries";
import { useQuery } from "@tanstack/react-query";

const Cart = () => {
  const { data: coupons } = useQuery({
    ...getCouponsQuery(),
  });

  const {
    carts,
    totalPrice,
    onRemoveItem,
    onUpdateItem,
    onUpdateItemsByDiscountRate,
    onDiscountByAmount,
  } = useCart();

  const handleSelectCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const coupon = e.target.value;

    const [type, discount] = coupon.split("-");
    if (type === "rate") {
      onUpdateItemsByDiscountRate(Number(discount));
    } else {
      onDiscountByAmount(Number(discount));
    }
  };

  return (
    <S.Layout>
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
        <select onChange={handleSelectCoupon}>
          {coupons?.map((coupon) => {
            const optionValue = `${coupon.type}-${
              coupon.type === "rate"
                ? coupon.discountRate
                : coupon.discountAmount
            }`;

            return (
              <option key={`coupon-option-${coupon.title}`} value={optionValue}>
                {coupon.title}
              </option>
            );
          })}
        </select>
      </S.Section>
      <S.Section>
        <h1>총 결제금액</h1>
        <p>{totalPrice.toLocaleString()}</p>
      </S.Section>
    </S.Layout>
  );
};

export default Cart;
