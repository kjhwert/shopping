import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const NavigationBar = styled.nav``;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  list-style: none;
`;

export const NavLink = styled(Link)`
  color: #000;
  font-weight: 600;
  font-size: 36px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 6px;
  }
`;
