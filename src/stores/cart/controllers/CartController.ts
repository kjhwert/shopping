import { CartItem } from "../types";
import { Coupon } from "../../../apis/coupon/types";

interface Props {
  carts: CartItem[];
}

class CartController {
  carts: CartItem[];

  constructor(props: Props) {
    this.carts = props.carts;

    this.#initialize();
  }

  applyCoupon(coupon: Coupon | null): CartController {
    if (coupon === null) {
      return this;
    }

    switch (coupon.type) {
      case "rate":
        return this.#applyDiscountRateCoupon(coupon.discountRate);
      default:
        return this;
    }
  }

  getCarts() {
    return this.carts;
  }

  #initialize() {
    this.#initializeCarts();
  }

  #applyDiscountRateCoupon(discountRate: number): CartController {
    this.carts = this.carts.map((cartItem) => {
      if (!cartItem.checked || cartItem.product.availableCoupon === false) {
        return {
          ...cartItem,
          discountPrice: cartItem.product.price,
        };
      }

      const discountPrice =
        cartItem.product.price * ((100 - discountRate) / 100);

      return {
        ...cartItem,
        discountPrice,
      };
    });

    return this;
  }

  #initializeCarts() {
    this.carts = this.carts.map((cartItem) => {
      return {
        ...cartItem,
        discountPrice: cartItem.product.price,
      };
    });
  }
}

export default CartController;
