import useCartStore from "./useCartStore";
import { useCallback, useMemo } from "react";
import { Product } from "../../apis/products/types";

const useCart = () => {
  const carts = useCartStore((state) => state.carts);
  const addCart = useCartStore((state) => state.addCart);
  const removeCart = useCartStore((state) => state.removeCart);

  const isCartFull = useMemo(() => Object.keys(carts).length >= 3, [carts]);

  const handleAddCart = useCallback(
    (product: Product) => {
      if (isCartFull) {
        alert("장바구니는 최대 3개까지 담을 수 있습니다.");
        return;
      }

      addCart(product);
    },
    [addCart, isCartFull],
  );

  const handleRemoveCart = useCallback(
    (item_no: number) => {
      removeCart(item_no);
    },
    [removeCart],
  );

  const handleChangeCart = useCallback(
    (product: Product) => {
      if (carts[product.item_no]) {
        handleRemoveCart(product.item_no);
      } else {
        handleAddCart(product);
      }
    },
    [carts, handleAddCart, handleRemoveCart],
  );

  const cartsAsArray = Object.values(carts);

  return {
    cartsAsArray,
    onChangeCart: handleChangeCart,
  };
};

export default useCart;
