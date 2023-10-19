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
  discountClear: () => void;
  discountByRate: (discountRate: number) => void;
  discountByAmount: (discountAmount: number) => void;
};

const useCartStore = create(
  immer<State & Action>((set) => ({
    carts: [],
    totalPrice: 0,
    addItem: (product) => {
      set((state) => {
        state.totalPrice += product.price;

        state.carts.push({
          ...product,
          count: 1,
          discountPrice: product.price,
        });
      });
    },
    removeItem: (index) => {
      set((state) => {
        const cartItem = state.carts[index];
        state.totalPrice -= cartItem.discountPrice * cartItem.count;

        state.carts.splice(index, 1);
      });
    },
    updateItem: (index: number, fields: Partial<Cart>) => {
      set((state) => {
        const cartItem = state.carts[index];
        state.totalPrice -= cartItem.discountPrice * cartItem.count;

        state.carts[index] = {
          ...state.carts[index],
          ...fields,
        };

        const updatedCartItem = state.carts[index];
        state.totalPrice +=
          updatedCartItem.discountPrice * updatedCartItem.count;
      });
    },
    discountClear: () => {
      set((state) => {
        let totalPrice = 0;

        state.carts.forEach((cartItem, index) => {
          state.carts[index].discountPrice = cartItem.price;
          totalPrice += cartItem.price * cartItem.count;
        });

        state.totalPrice = totalPrice;
      });
    },
    discountByRate: (discountRate) => {
      set((state) => {
        let totalPrice = 0;
        state.carts.forEach((cartItem, index) => {
          if (cartItem.availableCoupon === false) {
            totalPrice += cartItem.price * cartItem.count;
            return;
          }

          const discountPrice = cartItem.price * ((100 - discountRate) / 100);
          state.carts[index].discountPrice = discountPrice;

          totalPrice += discountPrice * cartItem.count;
        });

        state.totalPrice = totalPrice;
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
