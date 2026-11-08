import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/slice";
import cartSlice from "./cart/slice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
