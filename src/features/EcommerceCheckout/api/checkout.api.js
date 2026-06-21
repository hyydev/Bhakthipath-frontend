import api from "../../../services/axios";




export const checkout = (cart_id, shipping_address_id) =>
  api.post("/order/checkout/", { cart_id, shipping_address_id });

