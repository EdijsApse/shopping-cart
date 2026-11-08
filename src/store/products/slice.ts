import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import { loadItems, getItem, reviewProduct } from "./thunks";

type ProductsState = {
  items: Product[];
  isLoadingItems: boolean;
  isLoadingDetails: boolean;
  detailsLoaded: boolean;
  itemsError: string;
  reviewError: string;
  product: null | Product;
  savingReview: boolean;
  reviewStored: boolean;
  reviewSubmited: boolean;
  activeLoadItemsRequestId: string | null;
};

const initialState: ProductsState = {
  items: [],
  product: null,
  isLoadingItems: false,
  isLoadingDetails: true,
  detailsLoaded: false,
  savingReview: false,
  reviewStored: false,
  reviewSubmited: false,
  reviewError: "",
  itemsError: "",
  activeLoadItemsRequestId: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetReviewFormState: (state) => {
      state.reviewError = "";
      state.savingReview = false;
      state.reviewStored = false;
      state.reviewSubmited = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadItems.pending, (state, { meta }) => {
      state.activeLoadItemsRequestId = meta.requestId;
      state.isLoadingItems = true;
      state.items = [];
      state.itemsError = "";
    });
    builder.addCase(loadItems.fulfilled, (state, { payload, meta }) => {
      if (state.activeLoadItemsRequestId !== meta.requestId) return;
      state.isLoadingItems = false;
      state.items = payload;
    });
    builder.addCase(loadItems.rejected, (state, { payload, meta }) => {
      if (state.activeLoadItemsRequestId !== meta.requestId) return;
      state.isLoadingItems = false;
      state.itemsError = payload?.message ?? "Something went wrong";
    });

    builder.addCase(getItem.pending, (state) => {
      state.isLoadingDetails = true;
      state.product = null;
      state.detailsLoaded = false;
    });
    builder.addCase(getItem.fulfilled, (state, { payload }) => {
      state.isLoadingDetails = false;
      state.product = payload;
      state.detailsLoaded = true;
    });
    builder.addCase(getItem.rejected, (state) => {
      state.isLoadingDetails = false;
      state.detailsLoaded = true;
    });

    builder.addCase(reviewProduct.pending, (state) => {
      state.savingReview = true;
      state.reviewStored = false;
      state.reviewSubmited = true;
      state.reviewError = "";
    });

    builder.addCase(reviewProduct.fulfilled, (state, { payload }) => {
      state.savingReview = false;
      state.reviewStored = payload;
    });

    builder.addCase(reviewProduct.rejected, (state, { payload }) => {
      state.savingReview = false;
      state.reviewStored = false;
      state.reviewError = payload?.message ?? "Something went wrong!";
    });
  },
});

export const { resetReviewFormState } = productsSlice.actions;

export default productsSlice.reducer;
