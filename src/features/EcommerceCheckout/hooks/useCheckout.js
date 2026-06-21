import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkout } from "../api/checkout.api";

export const useCheckout = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ cart_id, shipping_address_id }) =>
      checkout(cart_id, shipping_address_id),
    onSuccess: (res) => {
      const orderDetails = res?.data?.order;
      toast.success("order placed successfully");
      navigate("/order-success", { state: { order: orderDetails } });
    },
    onError:()=> toast.error("Failed to place Order")
  });
  return {
    placeOrder: mutate,
    isPending,
  };
};
