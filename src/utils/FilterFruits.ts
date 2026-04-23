import type { Fruit } from "../types/Fruit";

export default function FilterFruits(fruits:Fruit[], searchText: string) {
    if (!searchText) return fruits;
    else {
        const results = fruits.filter((fruit) =>
        fruit.name?.toLowerCase().includes(searchText.toLowerCase())
      );
      return results;
    }
  }