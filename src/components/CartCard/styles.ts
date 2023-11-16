import styled from "@emotion/styled";

export const Item = styled.li`
  display: flex;
  padding: 10px 0;
  align-items: center;
  gap: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

export const ItemInfo = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductInfo = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductName = styled.div`
  max-width: 380px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const RemoveButton = styled.button`
  width: 50px;
`;

export const CountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CountButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
`;

export const Count = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const OriginPrice = styled.span`
  color: #bbb;
  font-size: 12px;
`;

export const DiscountedPrice = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

export const Image = styled.img`
  width: 94px;
`;
