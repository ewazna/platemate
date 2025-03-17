import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import Button from "./Button";

describe("Button", () => {
  it("should show button when component is rendered", () => {
    render(<Button />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render text on the button when children are passed", () => {
    render(<Button>children</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("children");
  });

  it("should call callback function when is clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>children</Button>);
    const button = screen.getByRole("button");

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should be in the loading mode when loading props is passed", () => {
    render(<Button loading />);
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("loading-icon");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("pointer-events-none");
    expect(icon).toBeInTheDocument();
  });

  it("should not be in the loading mode when loading prop is not passed", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    const icon = screen.queryByTestId("loading-icon");

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("pointer-events-none");
    expect(icon).toBeFalsy();
  });

  it("should be disabled when disabled props is passed", () => {
    render(<Button disabled />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("pointer-events-none");
    expect(button).toBeDisabled();
  });

  it("should not be disabled when disabled prop is not passed", () => {
    render(<Button />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("should not throw error when only one type is provided", () => {
    expect(() => render(<Button />)).not.toThrow();
    expect(() => render(<Button primary />)).not.toThrow();
    expect(() => render(<Button secondary />)).not.toThrow();
    expect(() => render(<Button basic />)).not.toThrow();
    expect(() => render(<Button error />)).not.toThrow();
  });

  it("should throw error when more than one type is provided", () => {
    const errorMessage = /only one/i;
    expect(() => render(<Button primary secondary />)).toThrow(errorMessage);
    expect(() => render(<Button primary basic />)).toThrow(errorMessage);
    expect(() => render(<Button primary error />)).toThrow(errorMessage);
    expect(() => render(<Button secondary basic />)).toThrow(errorMessage);
    expect(() => render(<Button secondary error />)).toThrow(errorMessage);
    expect(() => render(<Button basic error />)).toThrow(errorMessage);
  });

  it("should not throw error when only one style variation is provided", () => {
    expect(() => render(<Button />)).not.toThrow();
    expect(() => render(<Button raised />)).not.toThrow();
    expect(() => render(<Button underlined />)).not.toThrow();
  });

  it("should throw error when more than one style variation is provided", () => {
    const errorMessage = /only one/i;
    expect(() => render(<Button raised underlined />)).toThrow(errorMessage);
    expect(() => render(<Button raised outlined />)).toThrow(errorMessage);
    expect(() => render(<Button outlined underlined />)).toThrow(errorMessage);
  });

  it("should correctly pass ref to DOM element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("should correctly pass classes to DOM element", () => {
    render(<Button className="bg-yellow-500" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-yellow-500");
  });
});
