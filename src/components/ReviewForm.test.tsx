import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ReviewForm from "./ReviewForm";
import { createTestStore } from "../tests/test-store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

describe("ReviewForm", () => {
  const renderComponent = (store = createTestStore()) => {
    const { container } = render(
      <Provider store={store}>
        <ReviewForm productId="1" />
      </Provider>,
    );

    return {
      store,
      container,
    };
  };

  it("should render review form", () => {
    renderComponent();

    expect(screen.getByText(/review product/i)).toBeInTheDocument();
  });

  it("review form should have input's with default values", () => {
    const { container } = renderComponent();

    const name = container.querySelector("input[name='fullname']");
    const description = container.querySelector("textarea[name='description']");
    const rating = container.querySelector("input[name='rating']");

    expect(name).toHaveValue("");
    expect(description).toHaveValue("");
    expect(rating).toHaveValue("1");
  });

  it("should update input values on user interaction", async () => {
    const user = userEvent.setup();

    const { container } = renderComponent();

    const name = container.querySelector(
      "input[name='fullname']",
    ) as HTMLInputElement;
    const description = container.querySelector(
      "textarea[name='description']",
    ) as HTMLTextAreaElement;
    const rating = container.querySelector("input[name='rating']");

    const thirdRatingButton = screen.getByRole("button", {
      name: /give 3 rating for this product/i,
    });

    await user.type(name, "Test Test");
    await user.type(description, "Example description");
    await user.click(thirdRatingButton);

    expect(name).toHaveValue("Test Test");
    expect(description).toHaveValue("Example description");
    expect(rating).toHaveValue("3");
  });

  it("should render error for invalid fullname", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.queryByText(/fullname is required/i)).toBeInTheDocument();
  });

  it("should render success message for successfuly submited review", async () => {
    // Using userEvent.setup with advanceTimers hangs await user.type(input);
    vi.useFakeTimers();

    const { container, store } = renderComponent();

    const name = container.querySelector(
      "input[name='fullname']",
    ) as HTMLInputElement;

    const thirdRatingButton = screen.getByRole("button", {
      name: /give 3 rating for this product/i,
    });

    fireEvent.change(name, {
      target: { value: "Test Test" },
    });

    fireEvent.click(thirdRatingButton);
    fireEvent.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

    await vi.advanceTimersByTimeAsync(750);

    expect(store.getState().products.reviewSubmited).toBe(true);
    expect(store.getState().products.reviewError).toBe("");
    expect(store.getState().products.reviewStored).toBe(true);

    expect(
      screen.queryByText(/thank you for your review/i),
    ).toBeInTheDocument();

    vi.useRealTimers();
  });
});
