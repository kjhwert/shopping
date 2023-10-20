import useCartStore, { CartItem } from "../../../stores/cart/useCartStore";
import { useCallback, useMemo } from "react";

const useCart = () => {
  const {
    carts,
    discountAmount,
    updateItem,
    removeItem,
    discountByRate,
    discountByAmount,
    initializeDiscountPrices,
    initializeDiscountAmount,
  } = useCartStore((state) => state);

  const totalPrice = useMemo(() => {
    const discountPricesByRate = carts
      .filter((cart) => cart.checked)
      .reduce((prev, next) => prev + next.discountPrice * next.count, 0);

    return discountPricesByRate - discountAmount;
  }, [carts, discountAmount]);

  const handleUpdateItem = useCallback(
    (item_no: number, fields: Partial<CartItem>) => {
      updateItem(item_no, fields);
    },
    [updateItem],
  );

  const handleRemoveItem = useCallback(
    (item_no: number) => {
      removeItem(item_no);
    },
    [removeItem],
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
    [discountByRate, initializeDiscountAmount],
  );

  const handleDiscountByAmount = useCallback(
    (discount: number) => {
      initializeDiscountPrices();
      discountByAmount(discount);
    },
    [discountByAmount, initializeDiscountPrices],
  );

  return {
    carts,
    totalPrice,
    onUpdateItem: handleUpdateItem,
    onRemoveItem: handleRemoveItem,
    onDiscountUnselect: handleDiscountUnselect,
    onDiscountByRate: handleDiscountByRate,
    onDiscountByAmount: handleDiscountByAmount,
  };
};

export default useCart;
