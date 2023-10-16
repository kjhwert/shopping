import { Outlet } from "react-router-dom";
import * as S from "./styles";

const GNB = () => {
  return (
    <S.NavigationBar>
      <S.NavList>
        <li>
          <S.NavLink to="/products">상품</S.NavLink>
        </li>
        <li>
          <S.NavLink to="/cart">장바구니</S.NavLink>
        </li>
      </S.NavList>
      <Outlet />
    </S.NavigationBar>
  );
};

export default GNB;
