import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Products from "./products";
import Cart from "./cart";
import GNB from "./GNB";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GNB />}>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="products" element={<Products />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>,
  ),
);

export default appRouter;
