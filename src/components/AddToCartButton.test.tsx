import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import type { Product } from "../types/product";
import { createTestStore } from "../tests/test-store";

const product: Product = {
  id: 1,
  name: "MacBook Air M3",
  price: 1099,
  category: "Laptops",
  manufacturer: "Apple",
  image: "/laptop.jpg",
};

const renderComponent = (store = createTestStore()) => {
  render(
    <Provider store={store}>
      <AddToCartButton product={product} />
    </Provider>,
  );

  return store;
};

describe("AddToCartButton", () => {
  it("should render Add to cart button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  it("should display product price", () => {
    renderComponent();

    expect(screen.getByText("1099$")).toBeInTheDocument();
  });

  it("should add product to cart when clicked", async () => {
    const user = userEvent.setup();
    const store = renderComponent();

    const button = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(button);

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].id).toBe(product.id);
    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  it("should display Added after clicking", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(screen.getByRole("button", { name: /added/i })).toBeInTheDocument();
  });

  it("should disable button when product is already in cart", () => {
    const store = createTestStore();

    store.dispatch({
      type: "cart/addItem",
      payload: { item: product },
    });

    renderComponent(store);

    expect(screen.getByRole("button", { name: /added/i })).toBeDisabled();
  });
});
