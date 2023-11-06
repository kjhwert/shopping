import { useMemo } from "react";
import { Product } from "../../../apis/products/types";
import useCartStore from "../../../stores/cart/useCartStore";

const useCart = () => {
  const { carts, onRemoveItem, onAddItem } = useCartStore((state) => state);

  const isCartFull = useMemo(() => carts.length >= 3, [carts]);

  const isItemInCart = (item_no: number) => {
    return carts.some((cart) => cart.item_no === item_no);
  };

  const handleAddItem = (product: Product) => {
    if (isCartFull) {
      alert("장바구니는 최대 3개까지 담을 수 있습니다.");
      return;
    }

    onAddItem(product);
  };

  const handleRemoveItem = (index: number) => {
    onRemoveItem(index);
  };

  const handleCreateOrDeleteItem = (product: Product) => {
    const cartItem = carts.find((cart) => cart.item_no === product.item_no);

    if (cartItem) {
      handleRemoveItem(product.item_no);
    } else {
      handleAddItem(product);
    }
  };

  return {
    isItemInCart,
    onCreateOrDeleteItem: handleCreateOrDeleteItem,
  };
};

export default useCart;
