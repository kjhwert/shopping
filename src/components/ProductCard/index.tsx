import { Product } from "../../apis/products";
import * as S from "./styles";

interface Props {
  product: Product;
  onAddOrRemoveItem(item_no: number): void;
  isAddedToCart: boolean;
}

const ProductCard = ({ product, onAddOrRemoveItem, isAddedToCart }: Props) => {
  return (
    <S.Item>
      <S.ImageInfo>
        <S.Image src={product.detail_image_url} alt="상품 이미지" />
        <S.CartButton onClick={() => onAddOrRemoveItem(product.item_no)}>
          {isAddedToCart ? "빼기" : "담기"}
        </S.CartButton>
      </S.ImageInfo>
      <S.ItemName>{product.item_name}</S.ItemName>
      <S.ItemInfo>
        <span>{product.price.toLocaleString()}원</span>
        <span>score: {product.score}</span>
      </S.ItemInfo>
    </S.Item>
  );
};

export default ProductCard;
