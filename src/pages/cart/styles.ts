import styled from "@emotion/styled";

export const Layout = styled.main``;

export const Table = styled.table`
  width: 100%;
`;

export const HeaderColumn = styled.th`
  width: 200px;
  font-size: 18px;
`;

export const HeaderColumnCheckbox = styled(HeaderColumn)`
  width: 5%;
`;

export const HeaderColumnProduct = styled(HeaderColumn)`
  width: 50%;
`;

export const Image = styled.img`
  width: 110px;
  height: 110px;
`;

export const BodyColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BodyColumnProduct = styled(BodyColumn)`
  justify-content: flex-start;
  gap: 10px;
`;

export const BodyColumnPrice = styled(BodyColumn)`
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
