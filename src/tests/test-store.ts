import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cart/slice";
import productsReducer from "../store/products/slice";

export const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
  });
