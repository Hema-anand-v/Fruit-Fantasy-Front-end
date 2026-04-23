
import type { Fruit }  from "../types/Fruit";

export type CartItem = {
  fruit: Fruit;
  quantity: number;
};

export type CartState = {
  cart: CartItem[];
  totalPrice: number;
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Fruit }
  | { type: "REMOVE_FROM_CART"; payload: number } // payload = fruit id
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

export const initialCartState: CartState = {
  cart: [],
  totalPrice: 0,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(item => item.fruit.id === action.payload.id);
      let updatedCart;
      if (existing) {
        updatedCart = state.cart.map(item =>
          item.fruit.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { fruit: action.payload, quantity: 1 }];
      }
      const updatedPrice = updatedCart.reduce(
        (sum, item) => sum + item.fruit.price * item.quantity,
        0
      );
      return { cart: updatedCart, totalPrice: updatedPrice };
    }

    case "REMOVE_FROM_CART": {
      const existing = state.cart.find(item => item.fruit.id === action.payload);
      if (!existing) return state;
    
      let updatedCart;
      if (existing.quantity > 1) {
        // decrement quantity
        updatedCart = state.cart.map(item =>
          item.fruit.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // remove item completely
        updatedCart = state.cart.filter(item => item.fruit.id !== action.payload);
      }
    
      const updatedPrice = updatedCart.reduce(
        (sum, item) => sum + item.fruit.price * item.quantity,
        0
      );
    
      return { cart: updatedCart, totalPrice: updatedPrice };
    }

    case "UPDATE_QUANTITY": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.fruit.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    }
    
    
    case "CLEAR_CART":
      return { ...state, cart: [], totalPrice: 0 };

    default:
      return state;
  }
}
