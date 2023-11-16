import { http, HttpResponse } from "msw";
import productsMock from "./products/products.mock";
import couponsMock from "./coupons/coupons.mock";

const handlers = [
  http.get("api/products", () => {
    return HttpResponse.json({
      products: productsMock,
    });
  }),
  http.get("api/coupons", () => {
    return HttpResponse.json(couponsMock);
  }),
];

export default handlers;
