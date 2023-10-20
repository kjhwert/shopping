import { useCallback, useMemo } from "react";
import { Product } from "../../../apis/products/types";
import useCartStore from "../../../stores/cart/useCartStore";

const useCart = () => {
  const { carts, onRemoveItem, onAddItem } = useCartStore((state) => state);

  const isCartFull = useMemo(() => carts.length >= 3, [carts]);

  const isItemInCart = useCallback(
    (item_no: number) => {
      return carts.some((cart) => cart.item_no === item_no);
    },
    [carts],
  );

  const handleAddItem = useCallback(
    (product: Product) => {
      if (isCartFull) {
        alert("장바구니는 최대 3개까지 담을 수 있습니다.");
        return;
      }

      onAddItem(product);
    },
    [onAddItem, isCartFull],
  );

  const handleRemoveItem = useCallback(
    (index: number) => {
      onRemoveItem(index);
    },
    [onRemoveItem],
  );

  const handleCreateOrDeleteItem = useCallback(
    (product: Product) => {
      const cartItem = carts.find((cart) => cart.item_no === product.item_no);

      if (cartItem) {
        handleRemoveItem(product.item_no);
      } else {
        handleAddItem(product);
      }
    },
    [carts, handleAddItem, handleRemoveItem],
  );

  return {
    isItemInCart,
    onCreateOrDeleteItem: handleCreateOrDeleteItem,
  };
};

export default useCart;
