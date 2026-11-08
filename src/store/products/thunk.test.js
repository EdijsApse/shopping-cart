import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slice";
import { getItem, loadItems, reviewProduct } from "./thunks";

describe("loadItems thunk", () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        products: productsReducer,
      },
    });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should load products successfully", async () => {
    const store = createTestStore();

    const promise = store.dispatch(
      loadItems({
        categories: [],
        keyword: "",
      }),
    );

    await vi.advanceTimersByTimeAsync(750);

    const result = await promise;
    const state = store.getState().products;

    expect(loadItems.fulfilled.match(result)).toBe(true);
    expect(state.isLoadingItems).toBe(false);
    expect(state.items.length).toBeGreaterThan(0);
    expect(state.itemsError).toBe("");
  });

  it("should ignore outdated request results", async () => {
    const store = createTestStore();

    const firstRequest = store.dispatch(
      loadItems({
        categories: [],
        keyword: "",
      }),
    );

    const firstRequestId = store.getState().products.activeLoadItemsRequestId;

    expect(store.getState().products.isLoadingItems).toBe(true);
    expect(firstRequestId).not.toBeNull();

    await vi.advanceTimersByTimeAsync(100);

    const secondRequest = store.dispatch(
      loadItems({
        categories: [],
        keyword: "product-that-does-not-exist",
      }),
    );

    const secondRequestId = store.getState().products.activeLoadItemsRequestId;

    expect(secondRequestId).not.toBeNull();
    expect(secondRequestId).not.toBe(firstRequestId);

    await vi.advanceTimersByTimeAsync(650);

    const firstResult = await firstRequest;

    expect(loadItems.fulfilled.match(firstResult)).toBe(true);

    let state = store.getState().products;

    expect(state.isLoadingItems).toBe(true);
    expect(state.items).toEqual([]);
    expect(state.itemsError).toBe("");
    expect(state.activeLoadItemsRequestId).toBe(secondRequestId);

    await vi.advanceTimersByTimeAsync(100);

    const secondResult = await secondRequest;

    expect(loadItems.rejected.match(secondResult)).toBe(true);

    state = store.getState().products;

    expect(state.isLoadingItems).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.itemsError).toBe("No products found");
    expect(state.activeLoadItemsRequestId).toBeNull();
  });

  it("should reject when no products are found", async () => {
    const store = createTestStore();

    const promise = store.dispatch(
      loadItems({
        categories: [],
        keyword: "product-that-does-not-exist",
      }),
    );

    await vi.advanceTimersByTimeAsync(750);

    const result = await promise;
    const state = store.getState().products;

    expect(loadItems.rejected.match(result)).toBe(true);
    expect(state.isLoadingItems).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.itemsError).toBe("No products found");
  });

  it("should get single product", async () => {
    const store = createTestStore();

    const promise = store.dispatch(getItem("1"));

    await vi.advanceTimersByTimeAsync(750);

    const result = await promise;
    const state = store.getState().products;

    expect(getItem.fulfilled.match(result)).toBe(true);
    expect(state.detailsLoaded).toBe(true);
    expect(state.product).not.toBeNull();
  });

  it("should reject when detail products is not found", async () => {
    const store = createTestStore();
    const promise = store.dispatch(getItem("-1"));

    await vi.advanceTimersByTimeAsync(750);

    const result = await promise;
    const state = store.getState().products;

    expect(getItem.rejected.match(result)).toBe(true);
    expect(state.product).toBeNull();
    expect(state.detailsLoaded).toBe(true);
  });

  it("should add review for the product", async () => {
    const store = createTestStore();
    const promise = store.dispatch(
      reviewProduct({
        id: 1,
        fullname: "Name Surname",
        rating: 2,
        description: "Test description",
      }),
    );

    await vi.advanceTimersByTimeAsync(750);

    const result = await promise;
    const state = store.getState().products;

    expect(reviewProduct.fulfilled.match(result)).toBe(true);
    expect(state.reviewStored).toBe(true);
    expect(state.reviewError).toBe("");
    expect(state.reviewSubmited).toBe(true);
    expect(state.savingReview).toBe(false);
  });

  it("should not store review when result is false", async () => {
    const store = createTestStore();
    const promise = store.dispatch(
      reviewProduct({
        id: 1,
        fullname: "tests",
        rating: 2,
        description: "Test description",
      }),
    );

    await vi.advanceTimersByTimeAsync(750);

    const result = await promise;
    const state = store.getState().products;

    expect(reviewProduct.fulfilled.match(result)).toBe(true);
    expect(state.reviewStored).toBe(false);
    expect(state.reviewSubmited).toBe(true);
    expect(state.savingReview).toBe(false);
  });

  it("should not add review when rejected with error", async () => {
    const store = createTestStore();
    const promise = store.dispatch(
      reviewProduct({
        id: 1,
        fullname: "error",
        rating: 2,
        description: "Test description",
      }),
    );

    await vi.advanceTimersByTimeAsync(750);

    const result = await promise;
    const state = store.getState().products;

    expect(reviewProduct.rejected.match(result)).toBe(true);
    expect(state.reviewStored).toBe(false);
    expect(state.reviewError).toBe("Error saving your review!");
    expect(state.reviewSubmited).toBe(true);
    expect(state.savingReview).toBe(false);
  });
});
