import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

type ProductsState = {
  items: Product[];
  product: null | Product;
};

const initialState: ProductsState = {
  items: [],
  product: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadItems: (state, action: PayloadAction<{ items: Product[] }>) => {
      state.items = action.payload.items;
    },
    getItem: (state, action: PayloadAction<{ product: Product }>) => {
      state.product = action.payload.product;
    },
  },
});

export const { loadItems, getItem } = productsSlice.actions;

export default productsSlice.reducer;
