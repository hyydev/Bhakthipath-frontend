import api from "../../../services/axios";

export const placeOrder = (cart_id, shipping_address_id) =>
  api.post("/order/checkout/", { cart_id, shipping_address_id });

export const initiatePayment = (order_id, payment_method) =>
  api.post("/payments/initiate/", { order_id, payment_method });


