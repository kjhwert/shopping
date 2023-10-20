import useCartStore, { CartItem } from "../../../stores/cart/useCartStore";
import { useCallback, useMemo } from "react";

export interface MemoizedCartItem extends CartItem {
  discountPrice: number;
}

const useCart = () => {
  const {
    carts,
    discountRate,
    discountAmount,
    updateItem,
    removeItem,
    discountByRate,
    discountByAmount,
    initializeDiscountRate,
    initializeDiscountAmount,
  } = useCartStore((state) => state);

  const memoizedCartItems: MemoizedCartItem[] = useMemo(
    () =>
      carts.map((cartItem) => {
        const discountPrice = cartItem.checked
          ? cartItem.price * ((100 - discountRate) / 100)
          : cartItem.price;

        return {
          ...cartItem,
          discountPrice,
        };
      }),
    [carts, discountRate],
  );

  const totalPrice = useMemo(() => {
    const discountPricesByRate = memoizedCartItems
      .filter((cart) => cart.checked)
      .reduce((prev, next) => prev + next.discountPrice * next.count, 0);

    return discountPricesByRate - discountAmount;
  }, [memoizedCartItems, discountAmount]);

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
    initializeDiscountRate();
  }, [initializeDiscountAmount, initializeDiscountRate]);

  const handleDiscountByRate = useCallback(
    (discountRate: number) => {
      initializeDiscountAmount();
      discountByRate(discountRate);
    },
    [discountByRate, initializeDiscountAmount],
  );

  const handleDiscountByAmount = useCallback(
    (discount: number) => {
      initializeDiscountRate();
      discountByAmount(discount);
    },
    [discountByAmount, initializeDiscountRate],
  );

  return {
    carts: memoizedCartItems,
    totalPrice,
    onUpdateItem: handleUpdateItem,
    onRemoveItem: handleRemoveItem,
    onDiscountUnselect: handleDiscountUnselect,
    onDiscountByRate: handleDiscountByRate,
    onDiscountByAmount: handleDiscountByAmount,
  };
};

export default useCart;
