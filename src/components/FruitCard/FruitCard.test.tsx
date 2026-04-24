import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FruitCard from "./FruitCard";
import type { Fruit } from "../../types/Fruit";

const apple: Fruit = {
  id: 1,
  name: "Apple",
  image: "apple.jpg",
  price: 100,
  unit: "kg",
};
const mango: Fruit = {
  id: 2,
  name: "Mango",
  image: "mango.jpg",
  price: 120,
  discount: 20,
  unit: "kg",
};

describe("FruitCard", () => {
  const mockOnDeleteFruit = jest.fn();
  const mockOnAddToCart = jest.fn();
  const mockOnToggleWishlist = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders alt text from name and no discount badge when discount=0", () => {
    render(
      <FruitCard
        fruit={apple}
        onDeleteFruit={mockOnDeleteFruit}
        onAddToCart={mockOnAddToCart}
        onToggleWishlist={mockOnToggleWishlist}
      />,
    );
    expect(screen.getByRole("img", { name: /apple/i })).toBeInTheDocument();
    expect(screen.queryByText(/% off/i)).not.toBeInTheDocument();
  });

  test("shows discount badge and discounted price when discount>0", () => {
    render(
      <FruitCard
        fruit={mango}
        onDeleteFruit={mockOnDeleteFruit}
        onAddToCart={mockOnAddToCart}
        onToggleWishlist={mockOnToggleWishlist}
      />,
    );
    expect(screen.getByText(/20% off/i)).toBeInTheDocument();
    expect(screen.getByText(/₹96/)).toBeInTheDocument(); // 120 → 96
  });
});
