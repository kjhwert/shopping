import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";
import * as S from "./styles";
import Pagination from "../../components/Pagination";
import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import useCartStore from "../../stores/cart/useCartStore";
import { Product } from "../../apis/products/types";

const Products = () => {
  const { carts, onRemoveItem, onAddItem } = useCartStore((state) => state);

  const [page, setPage] = useState(1);

  const { data: res } = useQuery({
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

  const isItemInCart = (item_no: number) => {
    return carts.some((cart) => cart.item_no === item_no);
  };

  const handleAddItem = (item_no: Product["item_no"]) => {
    const product = res?.products.find((cart) => cart.item_no === item_no);
    if (!product) {
      return;
    }

    try {
      onAddItem(product);
    } catch (e) {
      if (e instanceof Error) {
        window.alert(e.message);
      }
    }
  };

  const handleAddOrRemove = (item_no: Product["item_no"]) => {
    const cartItem = carts.find((cart) => cart.item_no === item_no);

    if (cartItem) {
      onRemoveItem(item_no);
    } else {
      handleAddItem(item_no);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <S.Layout>
        <S.List>
          {res?.products.map((product) => (
            <ProductCard
              key={`product-card-${product.item_no}`}
              product={product}
              onCartClick={handleAddOrRemove}
              isAddedToCart={isItemInCart(product.item_no)}
            />
          ))}
        </S.List>
        <S.PaginationWrapper>
          <Pagination
            page={page}
            totalPage={res?.meta.totalPages ?? 0}
            onChange={handlePageChange}
          />
        </S.PaginationWrapper>
      </S.Layout>
    </React.Suspense>
  );
};

export default Products;
