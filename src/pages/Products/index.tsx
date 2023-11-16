import useQuery from "../../hooks/useQuery";
import { getProductsQuery } from "../../apis/products/queries";
import * as S from "./styles";
import useCartStore from "../../stores/cart";
import Pagination from "../../components/Pagination";
import useProductListFilter from "./hooks/useProductListFilter";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const { hasItem, onAddItem, onRemoveItem } = useCartStore((store) => store);

  const { page, onPageChange } = useProductListFilter();

  const { data } = useQuery({
    ...getProductsQuery({
      page,
      pageSize: 5,
      sort: {
        field: "score",
        order: "desc",
      },
    }),
    suspense: true,
  });

  const handleAddCartItem = (item_no: number) => {
    const product = data?.products.find((cart) => cart.item_no === item_no);
    if (!product) {
      return;
    }

    try {
      onAddItem(product);
    } catch (e) {
      if (e instanceof Error) {
        window.alert(e.message);
      }
    }
  };

  const handleAddOrRemoveCartItem = (item_no: number) => {
    if (hasItem(item_no)) {
      onRemoveItem(item_no);
    } else {
      handleAddCartItem(item_no);
    }
  };

  return (
    <S.Layout>
      <S.List>
        {data?.products.map((product) => (
          <ProductCard
            key={`product-list-${product.item_no}`}
            product={product}
            onAddOrRemoveItem={handleAddOrRemoveCartItem}
            isAddedToCart={hasItem(product.item_no)}
          />
        ))}
      </S.List>
      <S.Pagination>
        <Pagination
          page={page}
          totalPage={data?.meta.totalPages ?? 0}
          onChange={onPageChange}
        />
      </S.Pagination>
    </S.Layout>
  );
};

export default Products;
