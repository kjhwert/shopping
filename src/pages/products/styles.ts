import styled from "@emotion/styled";

export const Layout = styled.main``;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  gap: 1%;
  row-gap: 20px;
  padding: 0 1%;
`;

export const Product = styled.li`
  position: relative;

  @media screen and (max-width: 1920px) {
    width: 19%;
  }

  @media screen and (max-width: 1550px) {
    width: 31.33%;
  }

  @media screen and (max-width: 1100px) {
    width: 48%;
  }
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const Info = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: bold;
`;

export const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1%;
`;

export const Score = styled.span`
  color: #5d5d5d;
  font-size: 11px;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ShoppingBagWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
