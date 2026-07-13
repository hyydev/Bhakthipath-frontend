import { useMutation,useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  placeOrder,
  initiatePayment,
  verifyPayment,
  cancelOrder,
} from "../api/checkout.api";
import { useState } from "react";
import { useCartStore } from "../../EcommerceCart/cart.store";

export const useCheckout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();                                // ← add
  const clearCartStore = useCartStore((s) => s.clearCartStore);    
  const [orderId, setOrderId] = useState(null);

  const clearCartOnSuccess = () => {
    clearCartStore();                                                  // Zustand clear
    queryClient.removeQueries({ queryKey: ["cart"] });                 // TanStack cache remove
  };

  const placeOrderMutation = useMutation({
    mutationFn: ({ cart_id, shipping_address_id }) =>
      placeOrder(cart_id, shipping_address_id),

    onSuccess: (res, variables) => {
      const order_id = res?.data?.order?.id;
      setOrderId(order_id);
      toast.success("Order created!");
      paymentMutation.mutate({
        order_id,
        payment_method: variables.payment_method,
      });
    },

    onError: () => toast.error("Failed to place order"),
  });

  const paymentMutation = useMutation({
    mutationFn: ({ order_id, payment_method }) =>
      initiatePayment(order_id, payment_method.toUpperCase()),

    onSuccess: (res) => {
      const data = res?.data;
      const method = data?.payment?.method;

      // COD
      if (method === "COD") {
        clearCartOnSuccess();  
        navigate("/order-success", { state: { order: data } });
        return;
      }

      // RAZORPAY
      if (method === "RAZORPAY") {
        try {
          const options = {
            key: data?.payment?.razorpay_key,
            amount: data?.payment?.amount,
            currency: data?.payment?.currency || "INR",
            name: "BhakthiVerse",
            description: "Order Payment",
            order_id: data?.payment?.razorpay_order_id,

            handler: async function (response) {
              try {
                const verifyRes = await verifyPayment({
                  order_id: data?.order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                });
                if (verifyRes.status === 200) {
                  clearCartOnSuccess();  
                  navigate("/order-success", {
                    state: { order: verifyRes.data }, // ← verified data se navigate
                  });
                  toast.success("Payment verified & successful!");
                }
              } catch (err) {
                toast.error(
                  "Payment verification failed. Please contact support with your order ID."
                );
                // Order backend pe FAILED mark ho jaayega webhook se
              }
            },

            modal: {
              ondismiss: async function () {
                // Order cancel karo — inventory restore hogi
                try {
                  await cancelOrder(data?.order_id);
                  toast.error(
                    "Payment cancelled. Your order has been cancelled " +
                      "and items are back in stock."
                  );
                } catch (cancelErr) {
                  // Cancel API fail hua
                  toast.error(
                    `Payment cancelled. ` +
                      `Please contact support with Order ID: ${data?.order_id} ` +
                      `to resolve your order.`
                  );
                }
              },
            },
          };

          if (!window?.Razorpay) {
            toast.error("Razorpay SDK not loaded. Please try again.");
            return;
          }

          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (e) {
          toast.error("Failed to initiate Razorpay");
        }

        return;
      }

      // Fallback
      toast.error("Unknown payment method");
    },

    onError: () => toast.error("Payment failed"),
  });

  return {
    placeOrder: placeOrderMutation.mutate,
    initiatePayment: paymentMutation.mutate,
    orderId,
    isPlacingOrder: placeOrderMutation.isPending,
    isPaymentPending: paymentMutation.isPending,
  };
};
