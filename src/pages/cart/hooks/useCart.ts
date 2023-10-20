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
    onUpdateItem,
    onRemoveItem,
    onDiscountByRate,
    onDiscountByAmount,
    onInitializeDiscountRate,
    onInitializeDiscountAmount,
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

  const isAllChecked = useMemo(
    () => memoizedCartItems.every((cartItem) => cartItem.checked),
    [memoizedCartItems],
  );

  const totalPrice = useMemo(() => {
    const discountPricesByRate = memoizedCartItems
      .filter((cart) => cart.checked)
      .reduce((prev, next) => prev + next.discountPrice * next.count, 0);

    return Math.floor(discountPricesByRate - discountAmount);
  }, [memoizedCartItems, discountAmount]);

  const handleUpdateItem = useCallback(
    (item_no: number, fields: Partial<CartItem>) => {
      onUpdateItem(item_no, fields);
    },
    [onUpdateItem],
  );

  const handleRemoveItem = useCallback(
    (item_no: number) => {
      onRemoveItem(item_no);
    },
    [onRemoveItem],
  );

  const handleDiscountUnselect = useCallback(() => {
    onInitializeDiscountAmount();
    onInitializeDiscountRate();
  }, [onInitializeDiscountAmount, onInitializeDiscountRate]);

  const handleDiscountByRate = useCallback(
    (discountRate: number) => {
      onInitializeDiscountAmount();
      onDiscountByRate(discountRate);
    },
    [onDiscountByRate, onInitializeDiscountAmount],
  );

  const handleDiscountByAmount = useCallback(
    (discount: number) => {
      onInitializeDiscountRate();
      onDiscountByAmount(discount);
    },
    [onDiscountByAmount, onInitializeDiscountRate],
  );

  const handleCheckAll = useCallback(
    (checked: boolean) => {
      memoizedCartItems.forEach((cartItem) => {
        handleUpdateItem(cartItem.item_no, { checked });
      });
    },
    [handleUpdateItem, memoizedCartItems],
  );

  return {
    carts: memoizedCartItems,
    totalPrice,
    isAllChecked,
    onCheckAll: handleCheckAll,
    onUpdateItem: handleUpdateItem,
    onRemoveItem: handleRemoveItem,
    onDiscountUnselect: handleDiscountUnselect,
    onDiscountByRate: handleDiscountByRate,
    onDiscountByAmount: handleDiscountByAmount,
  };
};

export default useCart;
