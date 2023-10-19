import useCartStore, { Cart } from "../../../stores/cart/useCartStore";
import { useCallback, useEffect, useMemo } from "react";
import { Product } from "../../../apis/products/types";

const useCart = () => {
  const {
    carts,
    totalPrice,
    addItem,
    removeItem,
    updateItem,
    discountUnselect,
    discountByRate,
    discountByAmount,
    updateTotalPrice,
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

  const handleTotalPriceChange = useCallback(() => {
    const totalPrice = carts.reduce(
      (prev, next) => prev + next.discountPrice * next.count,
      0,
    );

    updateTotalPrice(totalPrice);
  }, [carts, updateTotalPrice]);

  const handleDiscountUnselect = useCallback(() => {
    handleTotalPriceChange();
    discountUnselect();
  }, [handleTotalPriceChange, discountUnselect]);

  const handleDiscountByRate = useCallback(
    (discountRate: number) => {
      discountByRate(discountRate);
    },
    [discountByRate],
  );

  const handleDiscountByAmount = useCallback(
    (discount: number) => {
      discountByAmount(discount);
    },
    [discountByAmount],
  );

  useEffect(() => {
    handleTotalPriceChange();
  }, [handleTotalPriceChange]);

  return {
    carts,
    totalPrice,
    onRemoveItem: handleRemoveItem,
    onAddItem: handleAddItem,
    onUpdateItem: handleUpdateItem,
    onCreateOrDeleteItem: handleCreateOrDeleteItem,
    onDiscountUnselect: handleDiscountUnselect,
    onDiscountByRate: handleDiscountByRate,
    onDiscountByAmount: handleDiscountByAmount,
  };
};

export default useCart;
