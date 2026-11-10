import { render, screen } from "@testing-library/react";
import { createTestStore } from "../tests/test-store";
import { Provider } from "react-redux";
import CartItemComponent from "./CartItem";
import type { CartItem } from "../types/cart";
import { expect, describe, it } from "vitest";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const testCartItem: CartItem = {
  id: 1,
  category: "Laptops",
  image: "/test.png",
  manufacturer: "Acer",
  name: "Aspire V5",
  price: 536,
  quantity: 1,
};

const renderComponent = (store = createTestStore()) => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <CartItemComponent {...testCartItem} />
      </MemoryRouter>
    </Provider>,
  );

  return {
    container,
    store,
  };
};

describe("CartItem", () => {
  it("should render cart item", () => {
    const { container } = renderComponent();

    expect(screen.getByRole("link", { name: /aspire v5/i }));
    expect(screen.getByRole("button", { name: /increase count/i }));
    expect(screen.getByRole("button", { name: /decrease count/i }));
    expect(
      container.querySelector(`input[name="quantity-${testCartItem.id}"]`),
    ).toBeInTheDocument();
  });

  it("should increase cart item quanity", async () => {
    const { store } = renderComponent();
    const user = userEvent.setup();

    store.dispatch({
      type: "cart/addItem",
      payload: { item: testCartItem },
    });

    const increaseButton = screen.getByRole("button", {
      name: /increase count/i,
    });

    await user.click(increaseButton);

    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  it("should decrease cart item quanity", async () => {
    const { store } = renderComponent();
    const user = userEvent.setup();

    store.dispatch({
      type: "cart/addItem",
      payload: { item: { ...testCartItem, quantity: 2 } },
    });

    store.dispatch({
      type: "cart/changeQuantity",
      payload: { id: 1, newQuantity: 2 },
    });

    const decreaseButton = screen.getByRole("button", {
      name: /decrease count/i,
    });

    expect(store.getState().cart.items[0].quantity).toBe(2);

    await user.click(decreaseButton);

    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  it("should remove cart item", async () => {
    const { store } = renderComponent();
    const user = userEvent.setup();

    store.dispatch({
      type: "cart/addItem",
      payload: { item: testCartItem },
    });

    const removeButton = screen.getByRole("button", {
      name: /remove from cart/i,
    });

    await user.click(removeButton);

    expect(store.getState().cart.items.length).toBe(0);
  });

  it("should calculate correct total for cart item", async () => {
    const { store } = renderComponent();

    store.dispatch({
      type: "cart/addItem",
      payload: { item: testCartItem },
    });

    const total = screen.getByText(/total/i);

    expect(
      total.textContent.includes(
        `${testCartItem.quantity * testCartItem.price}`,
      ),
    ).toBe(true);
  });
});
