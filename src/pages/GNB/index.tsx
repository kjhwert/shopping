import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import * as S from "./styles";

const GNB = () => {
  const location = useLocation();

  const isActivePage = (pathname: string) => {
    return location.pathname.includes(pathname);
  };

  return (
    <>
      <S.NavigationBar>
        <S.NavList>
          <S.NavLink>
            <S.Link to="/products" isActive={isActivePage("products")}>
              상품
            </S.Link>
          </S.NavLink>
          <S.NavLink>
            <S.Link to="/cart" isActive={isActivePage("cart")}>
              장바구니
            </S.Link>
          </S.NavLink>
        </S.NavList>
      </S.NavigationBar>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default GNB;
