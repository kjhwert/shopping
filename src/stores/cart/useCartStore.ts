import { create } from "zustand";
import { Product } from "../../apis/products/types";
import { immer } from "zustand/middleware/immer";

export interface Cart extends Product {
  count: number;
  discountPrice: number;
}

type State = {
  carts: Cart[];
  totalPrice: number;
};

type Action = {
  addItem: (product: Product) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, fields: Partial<Cart>) => void;
  updateTotalPrice: (totalPrice: number) => void;
  discountUnselect: () => void;
  discountByRate: (discountRate: number) => void;
  discountByAmount: (discountAmount: number) => void;
};

const useCartStore = create(
  immer<State & Action>((set) => ({
    carts: [],
    totalPrice: 0,
    updateTotalPrice: (totalPrice) => {
      set((state) => {
        state.totalPrice = totalPrice;
      });
    },
    addItem: (product) => {
      set((state) => {
        state.carts.push({
          ...product,
          count: 1,
          discountPrice: product.price,
        });
      });
    },
    removeItem: (index) => {
      set((state) => {
        state.carts.splice(index, 1);
      });
    },
    updateItem: (index: number, fields: Partial<Cart>) => {
      set((state) => {
        state.carts[index] = {
          ...state.carts[index],
          ...fields,
        };
      });
    },
    discountUnselect: () => {
      set((state) => {
        state.carts.forEach((cartItem, index) => {
          state.carts[index].discountPrice = cartItem.price;
        });
      });
    },
    discountByRate: (discountRate) => {
      set((state) => {
        state.carts.forEach((cartItem, index) => {
          if (cartItem.availableCoupon === false) {
            return;
          }

          state.carts[index].discountPrice =
            cartItem.price * ((100 - discountRate) / 100);
        });
      });
    },
    discountByAmount: (discountAmount) => {
      set((state) => {
        const originTotalPrice = state.carts.reduce(
          (prev, next) => prev + next.price * next.count,
          0,
        );

        state.totalPrice = originTotalPrice - discountAmount;
      });
    },
  })),
);

export default useCartStore;
