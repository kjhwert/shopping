import { Outlet } from "react-router-dom";
import * as S from "./styles";

const GNB = () => {
  return (
    <S.NavigationBar>
      <S.NavList>
        <S.NavLink>
          <S.Link to="/products">상품</S.Link>
        </S.NavLink>
        <S.NavLink>
          <S.Link to="/cart">장바구니</S.Link>
        </S.NavLink>
      </S.NavList>
      <Outlet />
    </S.NavigationBar>
  );
};

export default GNB;
