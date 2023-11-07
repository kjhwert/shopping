import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";
import * as S from "./styles";
import Pagination from "../../components/Pagination";
import { useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import useCartStore from "../../stores/cart/useCartStore";
import { Product } from "../../apis/products/types";

const Products = () => {
  const { carts, onRemoveItem, onAddItem } = useCartStore((state) => state);

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

  const isCartFull = useMemo(() => carts.length >= 3, [carts]);

  const isItemInCart = (item_no: number) => {
    return carts.some((cart) => cart.item_no === item_no);
  };

  const handleAddItem = (item_no: Product["item_no"]) => {
    if (isCartFull) {
      alert("장바구니는 최대 3개까지 담을 수 있습니다.");
      return;
    }

    const product = data?.products.find((cart) => cart.item_no === item_no);
    if (product) {
      onAddItem(product);
    }
  };

  const handleRemoveItem = (index: number) => {
    onRemoveItem(index);
  };

  const handleCreateOrDeleteItem = (item_no: Product["item_no"]) => {
    const cartItem = carts.find((cart) => cart.item_no === item_no);

    if (cartItem) {
      handleRemoveItem(item_no);
    } else {
      handleAddItem(item_no);
    }
  };

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
          <ProductCard
            key={`product-card-${product.item_no}`}
            product={product}
            onCartClick={handleCreateOrDeleteItem}
            isAddedToCart={isItemInCart(product.item_no)}
          />
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
