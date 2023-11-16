import styled from "@emotion/styled";

export const CouponButton = styled.button<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 20px;
  border: 1px solid ${(props) => (props.isSelected ? "#4d4d4d" : "#ddd")};
  background-color: #ffffff;
`;

export const Layout = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
