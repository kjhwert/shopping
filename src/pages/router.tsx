import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";
import GNB from "./GNB";
import SuspenseBoundary from "../components/SuspenseBoundary";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GNB />}>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route
        path="products"
        element={
          <SuspenseBoundary>
            <Products />
          </SuspenseBoundary>
        }
      />
      <Route
        path="cart"
        element={
          <SuspenseBoundary>
            <Cart />
          </SuspenseBoundary>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>,
  ),
);

export default appRouter;
