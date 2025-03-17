import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chip from "./Chip";

describe("Chip", () => {
  it("should render outlined button with text", () => {
    const handleChipClick = vi.fn();
    render(<Chip label="chip" selectionType="single" onChipClick={handleChipClick} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("chip");
    expect(button).toHaveClass("bg-transparent");
  });

  it("should call callback function when clicked", async () => {
    const handleChipClick = vi.fn();
    const user = userEvent.setup();
    render(<Chip label="chip" selectionType="single" onChipClick={handleChipClick} />);
    const button = screen.getByRole("button");

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(handleChipClick).toHaveBeenCalledOnce();
  });

  it("should render close icon when deleting allowed", () => {
    const handleChipClick = vi.fn();
    render(<Chip label="chip" selectionType="single" onChipClick={handleChipClick} allowDelete />);
    const icon = screen.getByTestId("close-icon");

    expect(icon).toBeInTheDocument();
  });

  it("should not be clickable when deleting is not allowed and selecting mode is none", () => {
    const handleChipClick = vi.fn();
    render(<Chip label="chip" selectionType="none" onChipClick={handleChipClick} />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("pointer-events-none");
  });

  it("should correctly pass classes to element under", () => {
    const handleChipClick = vi.fn();
    render(
      <Chip
        label="chip"
        selectionType="none"
        onChipClick={handleChipClick}
        className="bg-yellow-500"
      />,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-yellow-500");
  });
});
