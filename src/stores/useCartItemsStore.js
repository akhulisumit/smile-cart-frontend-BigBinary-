import { without } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: [],
      toggleCartItem: slug =>
        set(state => {
          const { cartItems } = state;

          return {
            cartItems: cartItems.includes(slug)
              ? without([slug], cartItems)
              : [slug, ...cartItems],
          };
        }),
    }),
    { name: "cart-items-store" }
  )
);

export default useCartItemsStore;
