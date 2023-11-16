import { Product } from "../../apis/products";

export interface CartItem {
  product: Product;
  count: number;
  checked: boolean;
  discountPrice: number;
}
