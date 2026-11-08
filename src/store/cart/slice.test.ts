import { describe, it, expect } from "vitest";
import cartReducer, { addItem, changeQuantity, removeItem } from "./slice";
import type { Product } from "../../types/product";

const product: Product = {
  id: 1,
  name: "MacBook Air M3",
  price: 1099,
  category: "Laptops",
  manufacturer: "Apple",
  image: "/laptop.jpg",
};

describe("cartSlice", () => {
  it("should add a new product to the cart", () => {
    const state = cartReducer(undefined, addItem({ item: product }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(product.id);
    expect(state.items[0].quantity).toBe(1);
  });

  it("should increase quantity when adding an existing product", () => {
    const initialState = {
      items: [{ ...product, quantity: 1 }],
    };

    const state = cartReducer(initialState, addItem({ item: product }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("should change product quantity", () => {
    const initialState = {
      items: [{ ...product, quantity: 1 }],
    };

    const state = cartReducer(
      initialState,
      changeQuantity({ id: 1, newQuantity: 3 }),
    );

    expect(state.items[0].quantity).toBe(3);
  });

  it("should not change quantity if new quantity is invalid", () => {
    const initialQuantity = 2;
    const initialState = {
      items: [{ ...product, quantity: initialQuantity }],
    };

    const state = cartReducer(
      initialState,
      changeQuantity({ id: 1, newQuantity: 0 }),
    );

    expect(state.items[0].quantity).toBe(initialQuantity);
  });

  it("should remove a product from the cart", () => {
    const initialState = {
      items: [{ ...product, quantity: 1 }],
    };

    const state = cartReducer(initialState, removeItem({ id: 1 }));

    expect(state.items).toHaveLength(0);
  });

  it("should not remove a product that does not exist", () => {
    const initialState = {
      items: [{ ...product, quantity: 1 }],
    };

    const state = cartReducer(initialState, removeItem({ id: 999 }));

    expect(state.items).toHaveLength(1);
  });
});
