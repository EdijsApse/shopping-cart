import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Checkout from "./Checkout";
import { createTestStore } from "../tests/test-store";
import type { CartItem } from "../types/cart";

const firstCartItem: CartItem = {
  id: 1,
  category: "Laptops",
  image: "/test.png",
  manufacturer: "Acer",
  name: "Aspire V5",
  price: 536,
  quantity: 1,
};

const secondCartItem: CartItem = {
  id: 2,
  category: "Phone",
  image: "/test.png",
  manufacturer: "Samsung",
  name: "Galaxy A25",
  price: 256,
  quantity: 1,
};

describe("Checkout", () => {
  const renderComponent = (store = createTestStore()) => {
    store.dispatch({
      type: "cart/addItem",
      payload: { item: firstCartItem },
    });

    store.dispatch({
      type: "cart/addItem",
      payload: { item: secondCartItem },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </Provider>,
    );

    return {
      container,
      store,
    };
  };

  it("should render checkout page", () => {
    renderComponent();

    expect(screen.queryByText(/galaxy a25/i)).toBeInTheDocument();
    expect(screen.queryByText(/aspire v5/i)).toBeInTheDocument();
  });

  it("should render total value", () => {
    renderComponent();
    const total =
      firstCartItem.quantity * firstCartItem.price +
      secondCartItem.quantity * secondCartItem.price;

    expect(screen.queryByText(`Total: $${total}`)).toBeInTheDocument();
  });
});
