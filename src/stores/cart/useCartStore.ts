import { create } from "zustand";
import { Product } from "../../apis/products/types";
import { immer } from "zustand/middleware/immer";

type State = {
  carts: Record<number, Product>;
};

type Action = {
  addCart: (product: Product) => void;
  removeCart: (item_no: number) => void;
};

const useCartStore = create(
  immer<State & Action>((set) => ({
    carts: {},
    addCart: (product) => {
      set((state) => {
        state.carts[product.item_no] = product;
      });
    },
    removeCart: (item_no) => {
      set((state) => {
        delete state.carts[item_no];
      });
    },
  })),
);

export default useCartStore;
