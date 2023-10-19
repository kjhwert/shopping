import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";
import * as S from "./styles";
import IconScore from "../../assets/icons/IconScore";
import Pagination from "../../components/Pagination";
import { useCallback, useState } from "react";
import IconShoppingBag from "../../assets/icons/IconShoppingBag";
import useCart from "../../stores/cart";

const Products = () => {
  const { onCreateOrDeleteItem } = useCart();

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
    <S.Layout>
      <S.List>
        {products.map((product) => (
          <S.Product key={product.item_no}>
            <S.ShoppingBagWrapper onClick={() => onCreateOrDeleteItem(product)}>
              <IconShoppingBag />
            </S.ShoppingBagWrapper>
            <S.Image src={product.detail_image_url} alt="상품 이미지" />
            <S.Info>
              <S.Name>{product.item_name}</S.Name>
              <S.Price>{product.price.toLocaleString()}</S.Price>
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
    </S.Layout>
  );
};

export default Products;
