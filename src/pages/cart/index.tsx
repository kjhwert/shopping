import useCart from "../../stores/cart";

const Cart = () => {
  const { cartsAsArray } = useCart();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>상품정보</th>
            <th>주문금액</th>
          </tr>
        </thead>
        <tbody>
          {cartsAsArray.map((product) => (
            <tr key={product.item_no}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <img src={product.detail_image_url} alt="" />
                <div>{product.item_name}</div>
              </td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
