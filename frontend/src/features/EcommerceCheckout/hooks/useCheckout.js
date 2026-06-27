import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { placeOrder, initiatePayment } from "../api/checkout.api";
import { useState } from "react";
export const useCheckout = () => {
  const navigate = useNavigate()
  const [orderId, setOrderId] = useState(null)

  const placeOrderMutation = useMutation({
    mutationFn: ({ cart_id, shipping_address_id }) =>
      placeOrder(cart_id, shipping_address_id),
    onSuccess: (res) => {
      const order_id = res?.data?.order?.id
      setOrderId(order_id)
      toast.success("Order created!")
      // ab payment initiate hogi — CheckoutPage handle karega
    },
    onError: () => toast.error("Failed to place order")
  })

  const paymentMutation = useMutation({
    mutationFn: ({ order_id, payment_method }) =>
      initiatePayment(order_id, payment_method.toUpperCase()),

    onSuccess: (res) => {
      const data = res?.data;
      const method = data?.payment?.method;

      // COD
      if (method === "COD") {
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
            handler: function (response) {
              // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
              navigate("/order-success", { state: { order: data } });
              toast.success("Payment successful!");
            },
            modal: {
              ondismiss: function () {
                toast.error("Payment cancelled");
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
  })

  return {
    placeOrder: placeOrderMutation.mutate,
    initiatePayment: paymentMutation.mutate,
    orderId,
    isPlacingOrder: placeOrderMutation.isPending,
    isPaymentPending: paymentMutation.isPending,
  }
}