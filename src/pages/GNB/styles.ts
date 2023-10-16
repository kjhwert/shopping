import styled from "@emotion/styled";
import { Link as RouteLink } from "react-router-dom";
import { css } from "@emotion/react";

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

const linkUnderline = css`
  position: absolute;
  content: "";
  height: 6px;
  background-color: #000;
  top: 36px;
  left: 0;
  width: 100%;
`;

export const Link = styled(RouteLink, {
  shouldForwardProp: (props) => props !== "isActive",
})<{ isActive: boolean }>`
  color: #000;
  font-weight: 600;
  font-size: 36px;
  text-decoration: none;

  ${(props) => props.isActive && linkUnderline}

  &:hover::after {
    ${linkUnderline}
  }
`;
