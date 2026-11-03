import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../types/product";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ item: Product }>) => {
      const { item } = action.payload;
      const cartItem = state.items.find(
        (stateItem) => stateItem.id === item.id,
      );

      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
