import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";
import * as S from "./styles";
import IconScore from "../../assets/icons/IconScore";

const Products = () => {
  const { data } = useQuery({
    ...getProductsQuery({
      page: 1,
      pageSize: 5,
      sort: {
        field: "score",
        order: "desc",
      },
    }),
  });

  return (
    <div>
      <S.List>
        {data?.products.map((product) => (
          <S.Product key={product.item_no}>
            <S.Image src={product.detail_image_url} alt="상품 이미지" />
            <S.Info>
              <S.Name>{product.item_name}</S.Name>
              <S.Price>{product.price}</S.Price>
              <S.ScoreWrapper>
                <IconScore />
                <S.Score>{product.score}</S.Score>
              </S.ScoreWrapper>
            </S.Info>
          </S.Product>
        ))}
      </S.List>
    </div>
  );
};

export default Products;
