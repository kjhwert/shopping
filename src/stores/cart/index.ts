import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CartItem } from "./types";
import { subscribeWithSelector } from "zustand/middleware";
import { Coupon, isAmountCoupon } from "../../apis/coupon/types";
import {
  applyDiscountPriceByRate,
  availableCoupon,
  getTotalDiscountedPrice,
  getTotalPriceByDiscountAmount,
  initializeCartItems,
} from "./utils";
import CartController from "./controllers/CartController";
import PriceController from "./controllers/PriceController";

type State = {
  carts: CartItem[];
  totalPrice: number;
  coupon: Coupon | null;
};

type Action = {
  isAllChecked(): boolean;
  hasItem(item_no: number): boolean;

  onAddItem(product: CartItem["product"]): void;
  onRemoveItem(item_no: number): void;
  onSelectCoupon(coupon: Coupon | null): void;

  // item update Actions
  onIncreaseItemCount(item_no: number): void;
  onDecreaseItemCount(item_no: number): void;
  onCheckItem(item_no: number): void;
  onCheckItemAll(checked: boolean): void;

  // private actions
  getItemIndexByItemNo(item_no: number): number;
};

const useCartStore = create(
  subscribeWithSelector(
    immer<State & Action>((set, get) => ({
      totalPrice: 0,
      coupon: null,
      carts: [],
      isAllChecked: () => {
        if (get().carts.length === 0) {
          return false;
        }

        return get().carts.every((cartItem) => cartItem.checked);
      },
      hasItem: (item_no) =>
        get().carts.some((cartItem) => cartItem.product.item_no === item_no),
      onAddItem: (product) => {
        set((state) => {
          if (state.carts.length >= 3) {
            throw new Error("장바구니는 3개까지만 담을 수 있습니다.");
          }

          state.carts.push({
            product,
            count: 1,
            checked: true,
            discountPrice: product.price,
          });
        });
      },
      onSelectCoupon: (coupon) => {
        set((state) => {
          state.coupon = coupon;
        });
      },
      onIncreaseItemCount: (item_no) => {
        set((state) => {
          const itemIndex = get().getItemIndexByItemNo(item_no);

          if (itemIndex > -1) {
            state.carts[itemIndex].count += 1;
          }
        });
      },
      onDecreaseItemCount: (item_no) => {
        set((state) => {
          const itemIndex = get().getItemIndexByItemNo(item_no);

          if (itemIndex > -1) {
            const itemCount = state.carts[itemIndex].count;
            if (itemCount > 1) {
              state.carts[itemIndex].count -= 1;
            }
          }
        });
      },
      onCheckItem: (item_no) => {
        set((state) => {
          const itemIndex = get().getItemIndexByItemNo(item_no);

          if (itemIndex > -1) {
            state.carts[itemIndex].checked = !state.carts[itemIndex].checked;
            if (!state.carts[itemIndex].checked) {
              state.carts[itemIndex].discountPrice =
                state.carts[itemIndex].product.price;
            }
          }
        });
      },
      onCheckItemAll: (checked) => {
        set((state) => {
          state.carts.forEach((cartItem) => {
            cartItem.checked = checked;
          });
        });
      },
      onRemoveItem: (item_no) => {
        set((state) => {
          const index = state.carts.findIndex(
            (cartItem) => cartItem.product.item_no === item_no,
          );
          if (index > -1) {
            state.carts.splice(index, 1);
          }
        });
      },
      getItemIndexByItemNo: (item_no) => {
        return get().carts.findIndex(
          (cartItem) => cartItem.product.item_no === item_no,
        );
      },
    })),
  ),
);

/**
 * listen: coupon
 * changeable state: carts
 */
useCartStore.subscribe(
  (state) => state.coupon,
  (coupon) => {
    const { getState: get, setState: set } = useCartStore;

    const Cart = new CartController({
      carts: get().carts,
    });

    set(() => ({
      carts: Cart.applyCoupon(coupon).getCarts(),
    }));
  },
);

/**
 * listen: carts
 * changeable state: totalPrice
 */
useCartStore.subscribe(
  (state) => state.carts,
  (carts) => {
    const { getState: get, setState: set } = useCartStore;

    const Price = new PriceController({
      carts,
    });

    set(() => ({
      totalPrice: Price.applyCoupon(get().coupon).getTotalPrice(),
    }));
  },
);

export default useCartStore;
