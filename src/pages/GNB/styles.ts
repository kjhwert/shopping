import styled from "@emotion/styled";
import { Link as RouteLink } from "react-router-dom";

export const Layout = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.layout.maxWidth};
`;

export const NavigationBar = styled.nav``;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  list-style: none;
  padding: 0;
`;

export const NavLink = styled.li`
  position: relative;
`;

export const Link = styled(RouteLink, {
  shouldForwardProp: (props) => props !== "isActive",
})<{ isActive: boolean }>`
  color: #000;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  font-size: 36px;
  text-decoration: none;
`;
