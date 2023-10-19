import useCartStore, { Cart } from "./useCartStore";
import { useCallback, useMemo } from "react";
import { Product } from "../../apis/products/types";

const useCart = () => {
  const carts = useCartStore((state) => state.carts);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItem = useCartStore((state) => state.updateItem);

  const totalPrice = useMemo(
    () =>
      carts.reduce((prev, next) => prev + next.count * next.discountPrice, 0),
    [carts],
  );

  const isCartFull = useMemo(() => carts.length >= 3, [carts]);

  const handleAddItem = useCallback(
    (product: Product) => {
      if (isCartFull) {
        alert("장바구니는 최대 3개까지 담을 수 있습니다.");
        return;
      }

      addItem(product);
    },
    [addItem, isCartFull],
  );

  const handleRemoveItem = useCallback(
    (index: number) => {
      removeItem(index);
    },
    [removeItem],
  );

  const handleCreateOrDeleteItem = useCallback(
    (product: Product) => {
      if (carts[product.item_no]) {
        handleRemoveItem(product.item_no);
      } else {
        handleAddItem(product);
      }
    },
    [carts, handleAddItem, handleRemoveItem],
  );

  const handleUpdateItem = useCallback(
    (index: number, fields: Partial<Cart>) => {
      updateItem(index, fields);
    },
    [updateItem],
  );

  return {
    carts,
    totalPrice,
    onRemoveItem: handleRemoveItem,
    onAddItem: handleAddItem,
    onUpdateItem: handleUpdateItem,
    onCreateOrDeleteItem: handleCreateOrDeleteItem,
  };
};

export default useCart;
