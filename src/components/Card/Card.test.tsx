import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import Card from "./Card";

describe("Card", () => {
  it("should render", () => {
    const { container } = render(<Card />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("should render element in the div when children are passed", () => {
    render(<Card>children</Card>);
    const card = screen.getByText("children");

    expect(card).toBeInTheDocument();
  });

  it("should correctly pass classes to DOM element", () => {
    render(<Card className="bg-yellow-500">children</Card>);
    const card = screen.getByText("children");

    expect(card).toHaveClass("bg-yellow-500");
  });

  it("should correctly pass ref to DOM element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
