import { create } from "zustand";
import { Product } from "../../apis/products/types";
import { immer } from "zustand/middleware/immer";

export interface Cart extends Product {
  count: number;
  discountPrice: number;
  checked: boolean;
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

const defaultItems = [
  {
    item_no: 1045738,
    item_name: "[STANLEY] 스탠리 클래식 포어 오버 커피 드리퍼 세트",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2021/04/13/88f7fc4808e3420a94bd3364276f7a46_20210413171920.jpg?width=500",
    price: 65000,
    discountPrice: 65000,
    count: 1,
    score: 120,
    availableCoupon: false,
    checked: false,
  },
  {
    item_no: 768848,
    item_name: "[STANLEY] GO CERAMIVAC 진공 텀블러/보틀 473ml",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/11/23/18a5303591f446e79b806945347e7473_20201123143211.jpg?width=500",
    price: 42000,
    discountPrice: 42000,
    count: 1,
    score: 300,
    checked: true,
  },
  {
    item_no: 552913,
    item_name: "LEXON 렉슨 MINA 미니 조명 - LH60",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/08/05/11ba8acd4ca645729666088309248920_20200805083231.jpg?width=500",
    price: 240000,
    discountPrice: 240000,
    count: 1,
    score: 350,
    checked: true,
  },
];

const useCartStore = create(
  immer<State & Action>((set) => ({
    carts: defaultItems,
    totalPrice: defaultItems.reduce((prev, next) => prev + next.price, 0),
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
          checked: true,
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
        const originTotalPrice = state.carts
          .filter((cart) => cart.checked)
          .reduce((prev, next) => prev + next.price * next.count, 0);

        state.totalPrice = originTotalPrice - discountAmount;
      });
    },
  })),
);

export default useCartStore;
