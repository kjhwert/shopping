import useCartStore, { Cart } from "../../../stores/cart/useCartStore";
import { useCallback, useMemo } from "react";
import { Product } from "../../../apis/products/types";

const useCart = () => {
  const {
    carts,
    totalPrice,
    addItem,
    removeItem,
    updateItem,
    discountClear,
    discountByRate,
    discountByAmount,
  } = useCartStore((state) => state);

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

  const handleDiscountClear = useCallback(() => {
    discountClear();
  }, [discountClear]);

  const handleDiscountByRate = useCallback(
    (discountRate: number) => {
      discountByRate(discountRate);
    },
    [discountByRate],
  );

  const handleDiscountByAmount = useCallback(
    (discount: number) => {
      handleDiscountClear();
      discountByAmount(discount);
    },
    [handleDiscountClear, discountByAmount],
  );

  return {
    carts,
    totalPrice,
    onRemoveItem: handleRemoveItem,
    onAddItem: handleAddItem,
    onUpdateItem: handleUpdateItem,
    onCreateOrDeleteItem: handleCreateOrDeleteItem,
    onDiscountClear: handleDiscountClear,
    onDiscountByRate: handleDiscountByRate,
    onDiscountByAmount: handleDiscountByAmount,
  };
};

export default useCart;
