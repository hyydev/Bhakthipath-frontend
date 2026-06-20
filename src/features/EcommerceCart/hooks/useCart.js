import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useCartStore } from "../cart.store";

import {
  fetchCart,
  addtoCart,
  updateCart,
  deleteCart,
  clearCart,
} from "../api/cart.api";

export const useCart = () => {
  const queryClient = useQueryClient();
  const setCart = useCartStore((s) => s.setCart);
  const clearCartStore = useCartStore((s) => s.clearCartStore);
  const storeItems = useCartStore((s) => s.items);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 0,
  });

  useEffect(() => {
    if (data?.data?.cart) {
      setCart(data.data.cart);
    }
  }, [data]);

  const addCartMutation = useMutation({
    mutationFn: addtoCart,
    onSuccess: (response) => {
      if (response?.data?.cart) {
        setCart(response.data.cart);
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product add to cart");
    },
    onError: () => toast.error("failed to add cart"),
  });

  const updateCartItemMutation = useMutation({
    mutationFn: (data) => updateCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("failed to update cart"),
  });

  const deleteCartMutation = useMutation({
    mutationFn: ({ product_id }) => deleteCart(product_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("cart not deleted"),
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      clearCartStore();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("cart is clear ");
    },
    onError: () => toast.error("cart  is not clear"),
  });
  const cart = data?.data?.cart;
  const cartItemsById = new Map();
  [...(cart?.items || []), ...(storeItems || [])].forEach((item) => {
    cartItemsById.set(Number(item.product_id), item);
  });
  const cartItems = Array.from(cartItemsById.values());
  const isInCart = (productId) =>
    cartItems.some((item) => Number(item.product_id) === Number(productId));

  return {
    cart,
    cartItems,
    isLoading,
    isError,
    isInCart,
    isAddingCart: addCartMutation.isPending,

    addCart: addCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    deleteCart: deleteCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
  };
};
