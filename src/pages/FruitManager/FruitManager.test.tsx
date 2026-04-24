import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FruitManager from "./FruitManager";
import type { Fruit } from "../../types/Fruit";

describe("FruitManager", () => {
  // Create mock functions for all required props
  const mockOnDeleteFruit = jest.fn();
  const mockOnAddToCart = jest.fn();
  const mockOnToggleWishlist = jest.fn();
  const mockOnClearWishlist = jest.fn();
  const mockOnAddFruit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  const sampleFruits: Fruit[] = [
    { id: 1, name: "Mango", image: "mango.jpg", price: 120, unit: "kg" },
    { id: 2, name: "Apple", image: "apple.jpg", price: 100, unit: "kg" },
  ];

  test("renders heading text", () => {
    render(
      <FruitManager
        fruits={sampleFruits}
        onDeleteFruit={mockOnDeleteFruit}
        onAddToCart={mockOnAddToCart}
        onToggleWishlist={mockOnToggleWishlist}
        onClearWishlist={mockOnClearWishlist}
        onAddFruit={mockOnAddFruit}
        role="admin"
      />,
    );
    expect(
      screen.getByText(/Fantasy Picks: Farm-Fresh Organic Fruits/i),
    ).toBeInTheDocument();
  });

  test("renders fruits from props", () => {
    render(
      <FruitManager
        fruits={sampleFruits}
        onDeleteFruit={mockOnDeleteFruit}
        onAddToCart={mockOnAddToCart}
        onToggleWishlist={mockOnToggleWishlist}
        onClearWishlist={mockOnClearWishlist}
        onAddFruit={mockOnAddFruit}
        role="admin"
      />,
    );
    expect(screen.getByText("Mango")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });
});
