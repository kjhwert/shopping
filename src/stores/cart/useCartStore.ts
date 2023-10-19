import { create } from "zustand";
import { Product } from "../../apis/products/types";
import { immer } from "zustand/middleware/immer";

export interface Cart extends Product {
  count: number;
  discountPrice: number;
}

type State = {
  carts: Cart[];
};

type Action = {
  addItem: (product: Product) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, fields: Partial<Cart>) => void;
};

const useCartStore = create(
  immer<State & Action>((set) => ({
    carts: [],
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
  })),
);

export default useCartStore;
