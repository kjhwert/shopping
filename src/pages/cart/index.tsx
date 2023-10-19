import useCart from "../../stores/cart";
import * as S from "./styles";
import { getCouponsQuery } from "../../apis/coupons/queries";
import { useQuery } from "@tanstack/react-query";

const Cart = () => {
  const { data: coupons } = useQuery({
    ...getCouponsQuery(),
  });

  const { cartsAsArray } = useCart();

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
          {cartsAsArray.map((product, index) => (
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
                  <button>remove</button>
                </S.BodyColumnProduct>
              </td>
              <td>
                <S.BodyColumn>
                  <input type="number" />
                </S.BodyColumn>
              </td>
              <td>
                <S.BodyColumnPrice>
                  <span>{product.price.toLocaleString()}</span>
                </S.BodyColumnPrice>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
      <S.Section>
        <h1>쿠폰</h1>
        <select>
          {coupons?.map((coupon) => (
            <option key={`coupon-option-${coupon.title}`}>
              {coupon.title}
            </option>
          ))}
        </select>
      </S.Section>
      <S.Section>
        <h1>총 결제금액</h1>
        <p>10000원</p>
      </S.Section>
    </S.Layout>
  );
};

export default Cart;
