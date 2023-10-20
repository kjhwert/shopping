import useCartStore, { CartItem } from "../../../stores/cart/useCartStore";
import { useCallback, useMemo } from "react";
import { Product } from "../../../apis/products/types";

const useCart = () => {
  const {
    carts,
    discountAmount,
    addItem,
    removeItem,
    updateItem,
    discountByRate,
    discountByAmount,
    initializeDiscountPrices,
    initializeDiscountAmount,
  } = useCartStore((state) => state);

  const isCartFull = useMemo(() => carts.length >= 3, [carts]);

  const totalPrice = useMemo(() => {
    const discountPricesByRate = carts
      .filter((cart) => cart.checked)
      .reduce((prev, next) => prev + next.discountPrice * next.count, 0);

    return discountPricesByRate - discountAmount;
  }, [carts, discountAmount]);

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
    (index: number, fields: Partial<CartItem>) => {
      updateItem(index, fields);
    },
    [updateItem],
  );

  const handleDiscountUnselect = useCallback(() => {
    initializeDiscountAmount();
    initializeDiscountPrices();
  }, [initializeDiscountAmount, initializeDiscountPrices]);

  const handleDiscountByRate = useCallback(
    (discountRate: number) => {
      initializeDiscountAmount();
      discountByRate(discountRate);
    },
    [discountByRate],
  );

  const handleDiscountByAmount = useCallback(
    (discount: number) => {
      initializeDiscountPrices();
      discountByAmount(discount);
    },
    [discountByAmount],
  );

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
