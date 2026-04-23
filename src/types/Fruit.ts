export interface Fruit {
    readonly id: number;
    name: string;
    image: string;
    price: number;
    discount?: number;
    unit: string;
    category?: string;
    benefits?: string[];
  }
  