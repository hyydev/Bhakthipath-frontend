import { create } from "zustand";

export const useCartStore = create((set) => ({

  //State

  cartId: null,
  items: [],
  total_price: "0.00",
  itemCount: 0,
  


  setCart: (cartData) => {
    const itemsCount = cartData.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    set({
      cartId: cartData.id,
      items: cartData.items,
      total_price: cartData.total_price,
      itemsCount: itemsCount,
    });
  },



  clearCart: () => {
    set({
      cartId: null,
      items: [],
      total_price: "0.00",
      itemCount: 0,
    });
  },
}));
