import Cart from "../index";
import { fireEvent, render, screen } from "@testing-library/react";
import { queryClient, QueryClientProvider } from "../../../configs/reactQuery";
import React from "react";
import theme from "../../../themes/theme";
import { ThemeProvider } from "@emotion/react";
import useCartStore from "../../../stores/cart";
import cartItemsMock from "./cartItems.mock";

const CartComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const cartItemsNo = cartItemsMock.map((cartItem) => cartItem.product.item_no);

const availableCouponCartItems = [cartItemsMock[0], cartItemsMock[1]];

const unavailableCouponCartItems = [cartItemsMock[2]];

const setup = (setItems: () => void) => {
  setItems();
  render(<CartComponent />);
};

const asyncSetup = async (setItems: () => void) => {
  setup(setItems);
  await screen.findByText("쿠폰");
};

describe("<CartController />", () => {
  it("render", () => {
    setup(() => useCartStore.setState({ carts: cartItemsMock }));

    expect(screen.getByText("전체선택")).toBeInTheDocument();
    expect(screen.getByText("총 결제금액")).toBeInTheDocument();
    expect(screen.getByTestId("total-price")).toHaveTextContent("65,900원");

    expect(
      screen.getByTestId(`discountPrice-${cartItemsNo[0]}`),
    ).toHaveTextContent(cartItemsMock[0].discountPrice.toLocaleString());
    expect(
      screen.getByTestId(`discountPrice-${cartItemsNo[1]}`),
    ).toHaveTextContent(cartItemsMock[1].discountPrice.toLocaleString());
    expect(
      screen.getByTestId(`discountPrice-${cartItemsNo[2]}`),
    ).toHaveTextContent(cartItemsMock[2].discountPrice.toLocaleString());
  });

  it("상품 선택/해제시에 총 결제금액에 반영된다.", () => {
    setup(() => useCartStore.setState({ carts: cartItemsMock }));

    const checkbox0 = screen.getByTestId(`checkbox-${cartItemsNo[0]}`);
    fireEvent.click(checkbox0);

    expect(screen.getByTestId("total-price")).toHaveTextContent("42,900원");

    fireEvent.click(checkbox0);

    expect(screen.getByTestId("total-price")).toHaveTextContent("65,900원");
  });

  it("수량 변경시에 총 결제금액에 반영된다.", () => {
    setup(() => useCartStore.setState({ carts: cartItemsMock }));

    const increaseCount = screen.getByTestId(`increaseCount-${cartItemsNo[0]}`);
    const decreaseCount = screen.getByTestId(`decreaseCount-${cartItemsNo[0]}`);
    fireEvent.click(increaseCount);

    expect(screen.getByTestId(`count-${cartItemsNo[0]}`)).toHaveTextContent(
      "2",
    );
    expect(
      screen.getByTestId(`discountPrice-${cartItemsNo[0]}`),
    ).toHaveTextContent("46,000원");
    expect(screen.getByTestId("total-price")).toHaveTextContent("88,900원");

    fireEvent.click(decreaseCount);

    expect(screen.getByTestId(`count-${cartItemsNo[0]}`)).toHaveTextContent(
      "1",
    );
    expect(
      screen.getByTestId(`discountPrice-${cartItemsNo[0]}`),
    ).toHaveTextContent("23,000원");
    expect(screen.getByTestId("total-price")).toHaveTextContent("65,900원");
  });
  it("상품 삭제시에 총 결제금액에 반영된다.", () => {
    setup(() => useCartStore.setState({ carts: cartItemsMock }));

    const removeButton0 = screen.getByTestId(`removeButton-${cartItemsNo[0]}`);
    fireEvent.click(removeButton0);

    expect(screen.getByTestId("total-price")).toHaveTextContent("42,900원");

    const removeButton1 = screen.getByTestId(`removeButton-${cartItemsNo[1]}`);
    fireEvent.click(removeButton1);

    expect(screen.getByTestId("total-price")).toHaveTextContent("39,900원");
  });

  it("비동기로 호출되는 쿠폰이 화면에 노출되어야 한다.", async () => {
    await asyncSetup(() => {});

    expect(screen.getByText("10% 할인 쿠폰")).toBeInTheDocument();
    expect(screen.getByText("10,000원 할인 쿠폰")).toBeInTheDocument();
  });

  describe("쿠폰 적용 가능 상품", () => {
    it("비율 할인 쿠폰 적용시 할인된 금액이 반영된다.", async () => {
      await asyncSetup(() =>
        useCartStore.setState({ carts: availableCouponCartItems }),
      );

      const coupon = screen.getByText("10% 할인 쿠폰");
      fireEvent.click(coupon);

      expect(
        screen.getByTestId(`discountPrice-${cartItemsNo[0]}`),
      ).toHaveTextContent("20,700원");
      expect(
        screen.getByTestId(`discountPrice-${cartItemsNo[1]}`),
      ).toHaveTextContent("2,700원");
      expect(screen.getByTestId("total-price")).toHaveTextContent("23,400원");
    });

    it("금액 할인 쿠폰 적용시 금액만큼 총 결제금액이 차감된다.", async () => {
      await asyncSetup(() =>
        useCartStore.setState({ carts: availableCouponCartItems }),
      );

      const coupon = screen.getByText("10,000원 할인 쿠폰");
      fireEvent.click(coupon);

      expect(screen.getByTestId("total-price")).toHaveTextContent("16,000원");
    });

    it("금액 할인 쿠폰 적용시 할인금액이 제품 가격보다 큰 경우 0원으로 노출된다.", async () => {
      await asyncSetup(() =>
        useCartStore.setState({
          carts: [
            {
              product: {
                item_no: 363559,
                item_name: "WOOD GLOVES",
                detail_image_url:
                  "https://img.29cm.co.kr/next-product/2019/04/25/4fe7eda3069d4cdb867636faf36ad5a3_20190425135058.jpg?width=500",
                price: 3000,
                score: 220,
              },
              count: 1,
              checked: true,
              discountPrice: 3000,
            },
          ],
        }),
      );

      const coupon = screen.getByText("10,000원 할인 쿠폰");
      fireEvent.click(coupon);

      expect(screen.getByTestId("total-price")).toHaveTextContent("0원");
    });

    it("선택 해제하면 할인 전 금액으로 노출된다.", async () => {
      await asyncSetup(() =>
        useCartStore.setState({ carts: availableCouponCartItems }),
      );

      const coupon = screen.getByText("10% 할인 쿠폰");
      fireEvent.click(coupon);

      expect(
        screen.getByTestId(`discountPrice-${cartItemsNo[0]}`),
      ).toHaveTextContent("20,700원");

      const checkbox0 = screen.getByTestId(`checkbox-${cartItemsNo[0]}`);
      fireEvent.click(checkbox0);

      expect(
        screen.getByTestId(`discountPrice-${cartItemsNo[0]}`),
      ).toHaveTextContent("23,000원");
    });
  });

  it("금액 할인은 할인 적용이 가능한 상품을 기준으로 차감된다.", async () => {
    await asyncSetup(() =>
      useCartStore.setState({
        carts: [availableCouponCartItems[1], ...unavailableCouponCartItems],
      }),
    );

    const coupon = screen.getByText("10,000원 할인 쿠폰");
    fireEvent.click(coupon);

    expect(screen.getByTestId("total-price")).toHaveTextContent("39,900원");
  });

  describe("쿠폰 적용 불가능 상품", () => {
    it("비율 할인 쿠폰을 적용해도 할인 금액이 반영되지 않는다.", async () => {
      await asyncSetup(() =>
        useCartStore.setState({ carts: unavailableCouponCartItems }),
      );

      const coupon = screen.getByText("10% 할인 쿠폰");
      fireEvent.click(coupon);

      expect(
        screen.getByTestId(
          `discountPrice-${unavailableCouponCartItems[0].product.item_no}`,
        ),
      ).toHaveTextContent("39,900원");
      expect(screen.getByTestId("total-price")).toHaveTextContent("39,900원");
    });

    it("금액 할인 쿠폰을 적용해도 할인 금액이 반영되지 않는다.", async () => {
      await asyncSetup(() =>
        useCartStore.setState({ carts: unavailableCouponCartItems }),
      );

      const coupon = screen.getByText("10,000원 할인 쿠폰");
      fireEvent.click(coupon);

      expect(
        screen.getByTestId(
          `discountPrice-${unavailableCouponCartItems[0].product.item_no}`,
        ),
      ).toHaveTextContent("39,900원");
      expect(screen.getByTestId("total-price")).toHaveTextContent("39,900원");
    });

    it("금액 할인 쿠폰은 할인 적용이 가능한 쿠폰을 기준으로 차감된다.", () => {});
  });
});
