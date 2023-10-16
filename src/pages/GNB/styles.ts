import styled from "@emotion/styled";
import { Link as RouteLink } from "react-router-dom";

export const NavigationBar = styled.nav``;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  list-style: none;
`;

export const NavLink = styled.li`
  position: relative;
`;

export const Link = styled(RouteLink)`
  color: #000;
  font-weight: 600;
  font-size: 36px;
  text-decoration: none;

  &:hover::after {
    position: absolute;
    content: "";
    height: 6px;
    background-color: #000;
    top: 36px;
    left: 0;
    width: 100%;
  }
`;
