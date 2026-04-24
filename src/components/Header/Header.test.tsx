import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import type { CartItem } from "../../reducers/cartReducer";

describe("Header", () => {
  // Create mock functions for all required props
  const mockOnRemoveFromCart = jest.fn();
  const mockOnClearCart = jest.fn();
  const mockOnUpdateQuantity = jest.fn();
  const sampleCart: CartItem[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders brand title as a heading", () => {
    render(
      <Header
        onRemoveFromCart={mockOnRemoveFromCart}
        onClearCart={mockOnClearCart}
        onUpdateQuantity={mockOnUpdateQuantity}
        cart={sampleCart}
      />,
    );
    expect(
      screen.getByRole("heading", { name: /fruitfantasy/i }),
    ).toBeInTheDocument();
  });

  test("renders children content inside the header", () => {
    render(
      <Header
        onRemoveFromCart={mockOnRemoveFromCart}
        onClearCart={mockOnClearCart}
        onUpdateQuantity={mockOnUpdateQuantity}
        cart={sampleCart}
      >
        <button>Test Child</button>
      </Header>,
    );
    expect(
      screen.getByRole("button", { name: /test child/i }),
    ).toBeInTheDocument();
  });
});
