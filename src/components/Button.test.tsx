import { describe, it, expect, vi } from "vitest";
import Button from "./Button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("should render Button", () => {
    render(<Button>Test button</Button>);

    expect(
      screen.getByRole("button", {
        name: /test button/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render submit Button", () => {
    render(<Button type="submit">Submit button</Button>);

    const button = screen.getByRole("button", {
      name: /submit button/i,
    });

    expect(button).toHaveAttribute("type", "submit");
  });

  it("should call onClick callback when clicked", async () => {
    const onClickCallback = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClickCallback}>On click test</Button>);

    const button = screen.getByRole("button", {
      name: /On click test/i,
    });

    await user.click(button);

    expect(onClickCallback).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick callback when button is disabled", async () => {
    const onClickCallback = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={onClickCallback} disabled>
        Disabled button
      </Button>,
    );

    const button = screen.getByRole("button", {
      name: /Disabled button/i,
    });

    await user.click(button);

    expect(onClickCallback).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("disabled", "");
  });
});
