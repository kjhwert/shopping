import styled from "@emotion/styled";

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const ItemName = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

export const ImageInfo = styled.div`
  position: relative;
`;

export const CartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;
