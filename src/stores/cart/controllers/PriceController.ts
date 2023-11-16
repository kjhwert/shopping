import { CartItem } from "../types";
import { Coupon } from "../../../apis/coupon/types";

interface Props {
  carts: CartItem[];
}

class PriceController {
  carts: CartItem[];
  totalPrice: number;

  constructor(props: Props) {
    this.carts = props.carts;
    this.totalPrice = 0;

    this.#initialize();
  }

  applyCoupon(coupon: Coupon | null): PriceController {
    if (coupon === null || !this.haveCartsToApplyCoupon()) {
      return this;
    }

    switch (coupon.type) {
      case "rate":
        return this.#applyDiscountRateCoupon();
      case "amount":
        return this.#applyDiscountAmountCoupon(coupon.discountAmount);
    }
  }

  haveCartsToApplyCoupon() {
    return this.carts.some(this.isCartItemAvailableCoupon);
  }

  isCartItemAvailableCoupon(cart: CartItem) {
    return cart.product.availableCoupon !== false;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  #initialize() {
    this.carts = this.carts.filter((cart) => cart.checked);
    this.totalPrice = PriceController.getSumProductPrices(this.carts);
  }

  #applyDiscountRateCoupon(): PriceController {
    this.totalPrice = PriceController.getSumDiscountPrices(this.carts);

    return this;
  }

  #applyDiscountAmountCoupon(discountAmount: number): PriceController {
    const availableCouponPrices = PriceController.getSumProductPrices(
      this.carts.filter(this.isCartItemAvailableCoupon),
    );

    const discountedPrice =
      availableCouponPrices > discountAmount
        ? availableCouponPrices - discountAmount
        : 0;

    const unavailableCouponPrices = PriceController.getSumProductPrices(
      this.carts.filter((cart) => !this.isCartItemAvailableCoupon(cart)),
    );

    this.totalPrice = discountedPrice + unavailableCouponPrices;

    return this;
  }

  static getSumDiscountPrices(carts: CartItem[]) {
    return Math.floor(
      carts.reduce((prev, next) => prev + next.discountPrice * next.count, 0),
    );
  }

  static getSumProductPrices(carts: CartItem[]) {
    return Math.floor(
      carts.reduce((prev, next) => prev + next.product.price * next.count, 0),
    );
  }
}

export default PriceController;
