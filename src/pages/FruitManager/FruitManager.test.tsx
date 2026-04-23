import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FruitManager from "./FruitManager";
import type { Fruit } from "../../types/Fruit";

describe("FruitManager", () => {
  const sampleFruits: Fruit[] = [
    { id: 1, name: "Mango", image: "mango.jpg", price: 120, unit: "kg" },
    { id: 2, name: "Apple", image: "apple.jpg", price: 100, unit: "kg" },
  ];

  test("renders heading text", () => {
    render(<FruitManager fruits={sampleFruits} />);
    expect(
      screen.getByText(/Fantasy Picks: Farm-Fresh Organic Fruits/i)
    ).toBeInTheDocument();
  });

  test("renders fruits from props", () => {
    render(<FruitManager fruits={sampleFruits} />);
    expect(screen.getByText("Mango")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });
});
