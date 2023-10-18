import styled from "@emotion/styled";

export const Layout = styled.article`
  display: flex;
  align-items: center;
`;

export const PageList = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

export const PageItem = styled.li``;

export const PageSpan = styled.span`
  font-size: 48px;
  color: #d4d4d4;
  font-weight: 200;
  cursor: pointer;
  padding: 0 10px;

  &.active {
    font-weight: 400;
    color: #000;
  }
`;

export const Arrow = styled.i`
  cursor: pointer;
  padding: 0 10px;
`;
