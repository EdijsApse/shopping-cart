import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductsList from "./ProductsList";
import type { Product } from "../types/product";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { createTestStore } from "../tests/test-store";

const testProducts: Product[] = [
  {
    id: 1,
    category: "Laptop",
    image: "test.png",
    manufacturer: "Acer",
    name: "Aspire v5",
    price: 356,
  },
  {
    id: 2,
    category: "Laptop",
    image: "test.png",
    manufacturer: "HP",
    name: "Pavilion Home",
    price: 556,
  },
];

describe("ProductsList", () => {
  it("should render products list", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList items={testProducts} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/aspire v5/i)).toBeInTheDocument();
    expect(screen.queryByText(/pavilion home/i)).toBeInTheDocument();
  });
});
