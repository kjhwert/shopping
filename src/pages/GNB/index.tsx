import { Link, Outlet } from "react-router-dom";

const GNB = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/products">상품</Link>
        </li>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  );
};

export default GNB;
