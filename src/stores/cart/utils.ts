import { CartItem } from "./types";

export const initializeCartItems = (carts: CartItem[]): CartItem[] => {
  return carts.map((cartItem) => {
    return {
      ...cartItem,
      discountPrice: cartItem.product.price,
    };
  });
};

export const applyDiscountPriceByRate = (
  carts: CartItem[],
  discountRate: number,
): CartItem[] => {
  return carts.map((cartItem) => {
    if (!cartItem.checked || cartItem.product.availableCoupon === false) {
      return {
        ...cartItem,
        discountPrice: cartItem.product.price,
      };
    }

    const discountPrice = cartItem.product.price * ((100 - discountRate) / 100);

    return {
      ...cartItem,
      discountPrice,
    };
  });
};

const getTotalProductPrice = (carts: CartItem[]) => {
  return carts
    .filter((cart) => cart.checked)
    .reduce((prev, next) => prev + next.product.price * next.count, 0);
};

export const getTotalPriceByDiscountAmount = (
  carts: CartItem[],
  discountAmount: number,
) => {
  const checkedItems = carts.filter((cart) => cart.checked);

  const discountableTotalPrice = getTotalProductPrice(
    checkedItems.filter(availableCoupon),
  );

  const discountedPrice =
    discountableTotalPrice > discountAmount
      ? discountableTotalPrice - discountAmount
      : 0;

  const unDiscountableTotalPrice = getTotalProductPrice(
    checkedItems.filter((cart) => !availableCoupon(cart)),
  );

  return discountedPrice + unDiscountableTotalPrice;
};

export const availableCoupon = (cart: CartItem) => {
  return cart.product.availableCoupon !== false;
};

export const getTotalDiscountedPrice = (carts: CartItem[]) => {
  return carts
    .filter((cart) => cart.checked)
    .reduce((prev, next) => prev + next.discountPrice * next.count, 0);
};

export const getDiscountedPrice = (price: number, discount: number) => {
  return price > discount ? price - discount : 0;
};
