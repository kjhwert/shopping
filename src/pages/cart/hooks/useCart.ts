import useCartStore, { CartItem } from "../../../stores/cart/useCartStore";

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

  const memoizedCartItems: MemoizedCartItem[] = carts.map((cartItem) => {
    if (cartItem.availableCoupon === false) {
      return {
        ...cartItem,
        discountPrice: cartItem.price,
      };
    }

    const discountPrice = cartItem.checked
      ? cartItem.price * ((100 - discountRate) / 100)
      : cartItem.price;

    return {
      ...cartItem,
      discountPrice,
    };
  });

  const isAllChecked = memoizedCartItems.every((cartItem) => cartItem.checked);

  const totalPrice = () => {
    const discountPricesByRate = memoizedCartItems
      .filter((cart) => cart.checked)
      .reduce((prev, next) => prev + next.discountPrice * next.count, 0);

    const discountPriceByAmount = discountPricesByRate - discountAmount;

    return discountPriceByAmount < 0 ? 0 : Math.floor(discountPriceByAmount);
  };

  const handleUpdateItem = (item_no: number, fields: Partial<CartItem>) => {
    onUpdateItem(item_no, fields);
  };

  const handleRemoveItem = (item_no: number) => {
    onRemoveItem(item_no);
  };

  const handleDiscountUnselect = () => {
    onInitializeDiscountAmount();
    onInitializeDiscountRate();
  };

  const handleDiscountByRate = (discountRate: number) => {
    onInitializeDiscountAmount();
    onDiscountByRate(discountRate);
  };

  const handleDiscountByAmount = (discount: number) => {
    onInitializeDiscountRate();
    onDiscountByAmount(discount);
  };

  const handleCheckAll = (checked: boolean) => {
    memoizedCartItems.forEach((cartItem) => {
      handleUpdateItem(cartItem.item_no, { checked });
    });
  };

  return {
    carts: memoizedCartItems,
    totalPrice: totalPrice(),
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
