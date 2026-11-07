import { createAsyncThunk } from "@reduxjs/toolkit";
import { MockProducts, Categories } from "../../mock-data";

import type { Product, ProductsSearchParams } from "../../types/product";
import type { ProductReview } from "../../zod-schemas/product-review";

type RejectWithError = {
  message: string;
};

type RejectedValue<T> = {
  rejectValue: T;
};

export const loadItems = createAsyncThunk<
  Product[],
  ProductsSearchParams,
  RejectedValue<RejectWithError>
>("products/load", (searchParams, { rejectWithValue }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let products = [...MockProducts];
      const { categories, keyword } = searchParams;

      if (categories.length || keyword) {
        products = products.filter((product) => {
          let matchedCategory = true;
          let matchedKeyword = true;

          if (categories.length) {
            const productCategory = Categories.find(
              (cat) => cat.name === product.category,
            );
            matchedCategory = productCategory
              ? categories.includes(productCategory.id)
              : false;
          }

          if (keyword.length) {
            matchedKeyword = product.name
              .toLocaleLowerCase()
              .includes(keyword.toLocaleLowerCase());
          }

          return matchedCategory && matchedKeyword;
        });
      }

      if (!products.length) {
        return reject(
          rejectWithValue({
            message: "No products found",
          }),
        );
      }

      return resolve(products);
    }, 750);
  });
});

export const getItem = createAsyncThunk<
  Product | null,
  string | undefined,
  RejectedValue<RejectWithError>
>("products/view", (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) return reject();
      const product = MockProducts.find((p) => p.id === +id);

      if (!product) {
        return reject();
      }

      return resolve(product);
    }, 750);
  });
});

export const reviewProduct = createAsyncThunk<
  boolean,
  ProductReview & { id: string },
  RejectedValue<RejectWithError>
>("products/review", (review, { rejectWithValue }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (review.fullname === "tests") {
        return resolve(false);
      }

      if (review.fullname === "error") {
        return reject(
          rejectWithValue({
            message: "Error saving your review!",
          }),
        );
      }

      return resolve(true);
    }, 750);
  });
});
