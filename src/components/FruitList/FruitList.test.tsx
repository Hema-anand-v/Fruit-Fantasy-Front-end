import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FruitList from "./FruitList";
import type { Fruit } from "../../types/Fruit";
//demo 4
const fruits: Fruit[] = [
  { id: 1, name: "Mango", image: "mango.jpg", price: 120, unit: "kg" },
  { id: 2, name: "Apple", image: "apple.jpg", price: 100, unit: "kg" },
  { id: 3, name: "Banana", image: "banana.jpg", price: 40, unit: "dozen" },
];
describe("FruitList", () => {
  // Create mock functions for all required props
  const mockOnDeleteFruit = jest.fn();
  const mockOnAddToCart = jest.fn();
  const mockOnToggleWishlist = jest.fn();
  const mockOnClearWishlist = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders one card per fruit and preserves input order when sortBy=""', () => {
    render(
      <FruitList
        fruits={fruits}
        onDeleteFruit={mockOnDeleteFruit}
        onAddToCart={mockOnAddToCart}
        onToggleWishlist={mockOnToggleWishlist}
        onClearWishlist={mockOnClearWishlist}
      />,
    );
    const imgs = screen.getAllByRole("img"); // each card has an <img alt={name}>
    expect(imgs).toHaveLength(3);
    expect(imgs.map((img) => img.getAttribute("alt"))).toEqual([
      "Mango",
      "Apple",
      "Banana",
    ]);
  });
  test('changes order when selecting "Price" in Sort by', async () => {
    // 1) Put FruitList on the screen with our 3 fruits (unsorted).
    render(
      <FruitList
        fruits={fruits}
        onDeleteFruit={mockOnDeleteFruit}
        onAddToCart={mockOnAddToCart}
        onToggleWishlist={mockOnToggleWishlist}
        onClearWishlist={mockOnClearWishlist}
      />,
    );
    // 2) Open the "Sort by" dropdown (this is a Material UI Select).
    //    We find it by its label text.
    await userEvent.click(screen.getByLabelText(/sort by/i));

    // 3) The dropdown list (menu) is now visible. It has role="listbox".
    const listbox = await screen.findByRole("listbox");
    // 4) Click the "Price" option inside the listbox to sort by price.
    await userEvent.click(
      within(listbox).getByRole("option", { name: /price/i }),
    );

    // 5) After choosing "Price", the list should reorder by price (low → high):
    //    Banana (₹40), Apple (₹100), Mango (₹120).
    const afterImgs = screen.getAllByRole("img");
    const afterOrder = afterImgs.map((img) => img.getAttribute("alt"));
    expect(afterOrder).toEqual(["Banana", "Apple", "Mango"]);
  });
});
