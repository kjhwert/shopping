import { Product } from "../../apis/products/types";

export interface CartItem extends Omit<Product, "score"> {
  count: number;
  checked: boolean;
}
