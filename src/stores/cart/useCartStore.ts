import { create } from "zustand";
import { Product } from "../../apis/products/types";
import { immer } from "zustand/middleware/immer";

export interface CartItem extends Product {
  count: number;
  checked: boolean;
}

type State = {
  carts: CartItem[];
  discountAmount: number;
  discountRate: number;
};

type Action = {
  addItem: (product: Product) => void;
  removeItem: (item_no: number) => void;
  updateItem: (item_no: number, fields: Partial<CartItem>) => void;
  discountByRate: (discountRate: number) => void;
  discountByAmount: (discountAmount: number) => void;
  initializeDiscountRate: () => void;
  initializeDiscountAmount: () => void;
};

const useCartStore = create(
  immer<State & Action>((set) => ({
    carts: [],
    discountRate: 0,
    discountAmount: 0,
    addItem: (product) => {
      set((state) => {
        state.carts.push({
          ...product,
          count: 1,
          checked: true,
        });
      });
    },
    removeItem: (item_no) => {
      set((state) => {
        const index = state.carts.findIndex(
          (cartItem) => cartItem.item_no === item_no,
        );
        if (index > -1) {
          state.carts.splice(index, 1);
        }
      });
    },
    updateItem: (item_no, fields) => {
      set((state) => {
        const index = state.carts.findIndex(
          (cartItem) => cartItem.item_no === item_no,
        );
        if (index > -1) {
          state.carts[index] = {
            ...state.carts[index],
            ...fields,
          };
        }
      });
    },
    discountByRate: (discountRate) => {
      set((state) => {
        state.discountRate = discountRate;
      });
    },
    discountByAmount: (discountAmount) => {
      set((state) => {
        state.discountAmount = discountAmount;
      });
    },
    initializeDiscountRate: () => {
      set((state) => {
        state.discountRate = 0;
      });
    },
    initializeDiscountAmount: () => {
      set((state) => {
        state.discountAmount = 0;
      });
    },
  })),
);

export default useCartStore;
