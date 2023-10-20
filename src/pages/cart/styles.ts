import styled from "@emotion/styled";

export const Layout = styled.main`
  padding: 20px 2% 0 2%;
`;

export const Table = styled.table`
  border-top: 4px solid #000;
  width: 100%;
  border-collapse: collapse;
`;

export const HeaderColumn = styled.th`
  padding: 20px 0;
  width: 200px;
  font-size: 18px;
  border-bottom: 1px solid #d4d4d4;
`;

export const HeaderColumnProduct = styled(HeaderColumn)`
  width: 50%;
`;

export const Image = styled.img`
  width: 110px;
  height: 110px;
`;

export const BodyColumn = styled.td`
  border: 1px solid #d4d4d4;
  padding: 5px 0;

  &:first-child {
    border-left: none;
  }

  &:last-child {
    border-right: none;
  }
`;

export const BodyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BodyColumnProduct = styled(BodyContent)`
  padding-left: 10px;
  justify-content: flex-start;
  gap: 20px;
`;

export const BodyColumnPrice = styled(BodyContent)`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const EmptyCart = styled.section`
  padding: 60px 0;
  gap: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top: 5px solid #000;
  border-bottom: 2px solid #000;
`;

export const MoveToShopButton = styled.button`
  cursor: pointer;
  padding: 20px 40px;
  background-color: #ffffff;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  border: 1px solid #000;

  &:hover {
    color: #ff4800;
  }
`;
