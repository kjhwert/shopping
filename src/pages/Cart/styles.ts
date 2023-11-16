import styled from "@emotion/styled";
import { Link as RouteLink } from "react-router-dom";

export const Layout = styled.main`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 150px;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0;
`;

export const Order = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.theme.layout.maxWidth};
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.08);
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
`;

export const TotalPriceLabel = styled.h1``;

export const TotalPrice = styled.h1``;

export const GoToShoppingLink = styled(RouteLink)`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
`;
