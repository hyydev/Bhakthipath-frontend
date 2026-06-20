import api from "../../../services/axios";

export const fetchCart = () => api.get("/order/cart-detail/");
export const addtoCart = (data) => api.post("/order/add-to-cart/", data);
export const updateCart = (data) => api.patch("/order/update-cart/", data);
export const deleteCart = (product_id) =>api.delete(`/order/delete-cart/${product_id}`);
export const clearCart =()=> api.delete('/order/clear-cart/');

export const checkout = (cart_id, shipping_address_id)=>api.post('/order/checkout/',{cart_id, shipping_address_id})

