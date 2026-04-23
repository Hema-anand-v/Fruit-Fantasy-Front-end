
import type { Fruit } from "../types/Fruit";

export type WishlistState = {
  wishlist: Fruit[];
};

export type WishlistAction =
  | { type: "TOGGLE_WISHLIST"; payload: Fruit }
  | { type: "CLEAR_WISHLIST" }; // ✅ new action


export const initialWishlistState: WishlistState = {
  wishlist: []
};

export function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "TOGGLE_WISHLIST": {
      const isInWishlist = state.wishlist.some((item) => item.id === action.payload.id);

      const updatedWishlist = isInWishlist
        ? state.wishlist.filter((item) => item.id !== action.payload.id)
        : [...state.wishlist, action.payload];

      return { ...state, wishlist: updatedWishlist };
    }
   
    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };
    default:
      return state;
  }
}
