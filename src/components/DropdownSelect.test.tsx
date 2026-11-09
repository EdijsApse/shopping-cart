import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DrodpownSelect from "./DropdownSelect";
import userEvent from "@testing-library/user-event";

const testItems = [
  {
    value: 1,
    display: "Value 1",
  },
  {
    value: 2,
    display: "Value 2",
  },
  {
    value: 3,
    display: "Value 3",
  },
];

describe("DropdownSelect", () => {
  it("should render dropdown list", () => {
    const onSelectCallback = vi.fn();
    render(<DrodpownSelect items={testItems} onSelect={onSelectCallback} />);

    expect(screen.getByText(/select option/i)).toBeInTheDocument();
  });

  it("should change list visibility on button click", async () => {
    const onSelectCallback = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <DrodpownSelect items={testItems} onSelect={onSelectCallback} />,
    );

    const button = screen.getByRole("button", {
      name: /change visibility/i,
    });

    expect(container.querySelector(".hidden")).toBeInTheDocument();

    await user.click(button);

    expect(container.querySelector(".hidden")).not.toBeInTheDocument();
  });

  it("should trigger callback with selected value", async () => {
    const onSelectCallback = vi.fn();
    const user = userEvent.setup();
    render(<DrodpownSelect items={testItems} onSelect={onSelectCallback} />);

    const valueButton = screen.getByRole("button", {
      name: /value 2/i,
    });

    await user.click(valueButton);

    expect(onSelectCallback).toHaveBeenCalledExactlyOnceWith(2);
  });

  it("should render dropdown list with selected values", async () => {
    const onSelectCallback = vi.fn();
    const { container } = render(
      <DrodpownSelect
        items={testItems}
        onSelect={onSelectCallback}
        selectedValues={[2, 3]}
      />,
    );

    const firstValueButton = screen.getByRole("button", {
      name: /value 1/i,
    });
    const secondValueButton = screen.getByRole("button", {
      name: /value 2/i,
    });
    const thirdValueButton = screen.getByRole("button", {
      name: /value 3/i,
    });

    expect(firstValueButton.querySelector(".fa-check")).not.toBeInTheDocument();
    expect(secondValueButton.querySelector(".fa-check")).toBeInTheDocument();
    expect(thirdValueButton.querySelector(".fa-check")).toBeInTheDocument();

    expect(container.querySelector("input")).toHaveValue(
      JSON.stringify([2, 3]),
    );
  });
});
