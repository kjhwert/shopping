import { CartItem } from "./types";

import { create } from "zustand";
import { Product } from "../../apis/products/types";
import { immer } from "zustand/middleware/immer";

export type { CartItem } from "./types";

type State = {
  carts: CartItem[];
  discountAmount: number;
  discountRate: number;
};

type Action = {
  onAddItem: (product: Product) => void;
  onRemoveItem: (item_no: number) => void;
  onUpdateItem: (item_no: number, fields: Partial<CartItem>) => void;
  onDiscountByRate: (discountRate: number) => void;
  onDiscountByAmount: (discountAmount: number) => void;
  onInitializeDiscountRate: () => void;
  onInitializeDiscountAmount: () => void;
};

const useCartStore = create(
  immer<State & Action>((set) => ({
    carts: [],
    discountRate: 0,
    discountAmount: 0,
    onAddItem: (product) => {
      set((state) => {
        if (state.carts.length >= 3) {
          throw new Error("장바구니는 3개까지만 담을 수 있습니다.");
        }

        state.carts.push({
          ...product,
          count: 1,
          checked: true,
        });
      });
    },
    onRemoveItem: (item_no) => {
      set((state) => {
        const index = state.carts.findIndex(
          (cartItem) => cartItem.item_no === item_no,
        );
        if (index > -1) {
          state.carts.splice(index, 1);
        }
      });
    },
    onUpdateItem: (item_no, fields) => {
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
    onDiscountByRate: (discountRate) => {
      set((state) => {
        state.discountRate = discountRate;
      });
    },
    onDiscountByAmount: (discountAmount) => {
      set((state) => {
        state.discountAmount = discountAmount;
      });
    },
    onInitializeDiscountRate: () => {
      set((state) => {
        state.discountRate = 0;
      });
    },
    onInitializeDiscountAmount: () => {
      set((state) => {
        state.discountAmount = 0;
      });
    },
  })),
);

export default useCartStore;
