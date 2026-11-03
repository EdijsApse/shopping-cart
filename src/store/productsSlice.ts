import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

type ProductsState = {
  items: Product[];
};

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadItems: (state, action: PayloadAction<ProductsState>) => {
      state.items = action.payload.items;
    },
  },
});

export const { loadItems } = productsSlice.actions;

export default productsSlice.reducer;
