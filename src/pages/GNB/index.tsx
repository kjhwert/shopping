import { Outlet, useLocation } from "react-router-dom";
import * as S from "./styles";

const GNB = () => {
  const location = useLocation();

  const isActive = (pathname: string) => {
    return location.pathname.includes(pathname);
  };

  return (
    <S.Layout>
      <S.NavigationBar>
        <S.NavList>
          <S.NavLink>
            <S.Link to="/products" isActive={isActive("product")}>
              상품
            </S.Link>
          </S.NavLink>
          <S.NavLink>
            <S.Link to="/cart" isActive={isActive("cart")}>
              장바구니
            </S.Link>
          </S.NavLink>
        </S.NavList>
      </S.NavigationBar>
      <Outlet />
    </S.Layout>
  );
};

export default GNB;
