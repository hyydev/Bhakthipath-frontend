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
      // COD
      navigate("/order-success", { state: { order: res?.data } })
      // Razorpay → baad mein
    },
    onError: () => toast.error("Payment failed")
  })

  return {
    placeOrder: placeOrderMutation.mutate,
    initiatePayment: paymentMutation.mutate,
    orderId,
    isPlacingOrder: placeOrderMutation.isPending,
    isPaymentPending: paymentMutation.isPending,
  }
}