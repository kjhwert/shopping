import { Product } from "../../apis/products/types";
import * as S from "./styles";
import IconShoppingCart from "../../assets/icons/IconShoppingCart";
import IconHeart from "../../assets/icons/IconHeart";

interface ProductCardProps {
  product: Product;
  onCartClick: (item_no: Product["item_no"]) => void;
  isAddedToCart: boolean;
}

const ProductCard = (props: ProductCardProps) => {
  const { product, onCartClick, isAddedToCart } = props;

  return (
    <S.Item>
      <S.ShoppingCart onClick={() => onCartClick(product.item_no)}>
        <IconShoppingCart isActive={isAddedToCart} />
      </S.ShoppingCart>
      <S.Image src={product.detail_image_url} alt="상품 이미지" />
      <S.Info>
        <S.Name>{product.item_name}</S.Name>
        <S.Price>{product.price.toLocaleString()}</S.Price>
        <S.Heart>
          <IconHeart />
          <S.HeartText>{product.score}</S.HeartText>
        </S.Heart>
      </S.Info>
    </S.Item>
  );
};

export default ProductCard;
