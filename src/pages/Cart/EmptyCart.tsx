import * as S from "./styles";

const EmptyCart = () => {
  return (
    <S.Layout>
      <h4>장바구니에 담은 상품이 없습니다.</h4>
      <S.Order>
        <S.GoToShoppingLink to="/products">쇼핑하기</S.GoToShoppingLink>
      </S.Order>
    </S.Layout>
  );
};

export default EmptyCart;
