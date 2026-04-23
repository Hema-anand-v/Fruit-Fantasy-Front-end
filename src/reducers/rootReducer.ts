import { cartReducer, initialCartState } from "./cartReducer";
import type { CartState, CartAction } from "./cartReducer";
import { wishlistReducer, initialWishlistState } from "./wishlistReducer";
import type { WishlistState, WishlistAction } from "./wishlistReducer";

export type RootState = {
    cart: CartState;
    wishlist: WishlistState;
  };
  
  export type RootAction = CartAction | WishlistAction;
  
  export const initialRootState: RootState = {
    cart: initialCartState,
    wishlist: initialWishlistState,
  };
  
  export function rootReducer(state: RootState, action: RootAction): RootState {
    return {
      cart: cartReducer(state.cart, action as CartAction),
      wishlist: wishlistReducer(state.wishlist, action as WishlistAction),
    };
  }
