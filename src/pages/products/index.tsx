import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";
import * as S from "./styles";
import IconScore from "../../assets/icons/IconScore";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import useCart from "./hooks/useCart";
import IconShoppingCart from "../../assets/icons/IconShoppingCart";

const Products = () => {
  const { isItemInCart, onCreateOrDeleteItem } = useCart();

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
    suspense: true,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
              <IconShoppingCart isActive={isItemInCart(product.item_no)} />
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
