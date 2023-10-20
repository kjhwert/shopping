import useCartStore, { CartItem } from "../../../stores/cart/useCartStore";
import { useCallback, useMemo } from "react";

const useCart = () => {
  const {
    carts,
    discountAmount,
    updateItem,
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
    onDiscountUnselect: handleDiscountUnselect,
    onDiscountByRate: handleDiscountByRate,
    onDiscountByAmount: handleDiscountByAmount,
  };
};

export default useCart;
