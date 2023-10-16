import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";

const Products = () => {
  const { data } = useQuery({
    ...getProductsQuery({ page: 1 }),
  });

  return (
    <div>
      <ul>
        {data?.map((product) => (
          <li key={product.item_no}>{product.item_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
