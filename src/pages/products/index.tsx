import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "../../apis/products/queries";

const Products = () => {
  const { data } = useQuery({
    ...getProductsQuery({
      page: 1,
      pageSize: 5,
      sort: {
        field: "score",
        order: "desc",
      },
    }),
  });

  return (
    <div>
      <ul>
        {data?.products.map((product) => (
          <li key={product.item_no}>{product.item_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
