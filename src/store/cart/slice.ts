import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import type { CartItem } from "../../types/cart";

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
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; newQuantity: number }>,
    ) => {
      const { id, newQuantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && newQuantity >= 1) {
        item.quantity = newQuantity;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const { addItem, changeQuantity, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
