import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Heading,
  Text,
  Input,
  Badge,
  Section,
  PaymentOptions,
} from "../../../components/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function ShoppingCart() {
  const {
    cart,
    isLoading,
    isError,
    addCart,
    updateCartItem,
    deleteCart,
    clearCart,
  } = useCart();
  const cartItems = cart?.items || [];
  const navigate = useNavigate();

  const updateQuantity = (product_id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem({ items: [{ product_id, quantity: newQuantity }] });
  };

  const removeItem = (product_id) => {
    deleteCart({ product_id });
  };

  const subtotal = parseFloat(cart?.total_price || "0");
  const delivery = subtotal > 500 ? 0 : 50;
  const discount =
    subtotal > 1000 ? parseFloat((subtotal * 0.1).toFixed(2)) : 0;
  const total = parseFloat((subtotal + delivery - discount).toFixed(2));
  return (
    <div className="w-full px-4 py-4">
      <Section
        containerSize="full"
        className="relative w-full flex py-6 md:py-4"
      >
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 items-start ">
          {/* Left Card - Cart Items */}
          <Card variant="glass" className="w-full flex flex-col p-8 md:p-12">
            <CardHeader className="border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Shopping Cart</CardTitle>
                <Text className="text-sm text-gray-400">
                  {cartItems.length} items
                </Text>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {isLoading ? (
                <Text className="text-center py-10">Loading cart...</Text>
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] py-12">
                  <svg
                    className="w-24 h-24 text-gray-400 mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"
                      fill="currentColor"
                    />
                    <circle cx="9" cy="20" r="1" fill="currentColor" />
                    <circle cx="15" cy="20" r="1" fill="currentColor" />
                  </svg>
                  <Text className="text-gray-400">Your cart is empty</Text>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border transition-all duration-300 bg-white/[0.02] border-white/10 hover:border-white/30 hover:shadow-xl"
                    >
                      <div className="p-4 flex items-center gap-4">
                        {/* Image */}
                        {/* <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain rounded-lg bg-white/5 p-2 flex-shrink-0"
                          onError={(e) =>
                            (e.target.src = "/placeholder-product.jpg")
                          }
                        /> */}

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Text className="font-semibold text-white line-clamp-2 mb-1">
                            {item.product_name}
                          </Text>
                          <div className="flex items-center gap-4">
                            <Text className="text-primary-400 font-bold">
                              ₹{item.product_price}
                            </Text>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity - 1)
                            }
                            className="w-8 h-8 p-0 text-lg"
                          >
                            −
                          </Button>

                          <div
                            className="w-12 h-8 flex items-center justify-center 
                            bg-white/10 border border-white/20 rounded-lg"
                          >
                            <Text className="font-semibold">
                              {item.quantity}
                            </Text>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity + 1)
                            }
                            className="w-8 h-8 p-0 text-lg"
                          >
                            +
                          </Button>
                        </div>

                        {/* Total Price */}
                        <div className="min-w-[80px] text-right flex-shrink-0">
                          <Text className="text-xs text-gray-400 mb-1">
                            Total
                          </Text>
                          <Text className="text-white font-bold text-lg">
                            ₹
                            {(
                              parseFloat(item.product_price) * item.quantity
                            ).toFixed(2)}
                          </Text>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product_id)}
                          className="w-8 h-8 p-0 text-red-400 hover:text-red-300 
                            hover:bg-red-500/10 flex-shrink-0"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Card - Order Summary */}
          <Card variant="glass" className="w-full p-8 md:p-12">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Text>Subtotal</Text>
                <Text className="font-semibold">₹{subtotal}</Text>
              </div>

              <div className="flex justify-between items-center">
                <Text>Delivery</Text>
                <Text className="font-semibold">
                  {delivery === 0 ? (
                    <span className="text-green-400">FREE</span>
                  ) : (
                    `₹${delivery}`
                  )}
                </Text>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center">
                  <Text>Discount (10%)</Text>
                  <Text className="font-semibold text-green-400">
                    -₹{discount}
                  </Text>
                </div>
              )}

              <hr className="border-white/10" />

              <div className="flex justify-between items-center text-lg">
                <Text className="font-semibold">Total</Text>
                <Text className="font-bold text-primary-400">₹{total}</Text>
              </div>

              {subtotal < 500 && (
                <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
                  <Text className="text-sm text-primary-300">
                    Add ₹{500 - subtotal} more for free delivery!
                  </Text>
                </div>
              )}
            </CardContent>

            <div className="mt-6">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout ({cartItems.length} items)
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
