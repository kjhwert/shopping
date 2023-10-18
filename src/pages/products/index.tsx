import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";
import * as S from "./styles";
import IconScore from "../../assets/icons/IconScore";
import Pagination from "../../components/Pagination";
import { useCallback, useState } from "react";

const Products = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    ...getProductsQuery({
      page,
      pageSize: 5,
      sort: {
        field: "score",
        order: "desc",
      },
    }),
  });

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  // TODO Loading Spinner 구현 후 제거
  if (!data) {
    return null;
  }

  const { products, meta } = data;

  return (
    <div>
      <S.List>
        {products.map((product) => (
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
      <S.PaginationWrapper>
        <Pagination
          page={page}
          totalPage={meta.totalPages}
          onChange={handlePageChange}
        />
      </S.PaginationWrapper>
    </div>
  );
};

export default Products;
