import type { Fruit } from "../types/Fruit";

export default function calculateDiscountedPrice(fruit: Fruit): number {
  const discount = fruit.discount ?? 0;
  const price = fruit.price ?? 0;
  return Math.round(price * (1 - discount / 100) * 100) / 100;
}

