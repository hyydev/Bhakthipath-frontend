import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Text,
  Heading,
  Section,
} from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useTheme } from "../../../context/ThemeContext";
import { ShoppingCart as CartIcon, Trash2, ArrowRight, Tag } from "lucide-react";

export default function ShoppingCart() {
  const {
    cart,
    isLoading,
    updateCartItem,
    deleteCart,
  } = useCart();
  const cartItems = cart?.items || [];
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const updateQuantity = (product_id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem({ items: [{ product_id, quantity: newQuantity }] });
  };

  const removeItem = (product_id) => deleteCart({ product_id });

  const subtotal = parseFloat(cart?.total_price || "0");
  const delivery = subtotal > 500 ? 0 : 50;
  const discount = subtotal > 1000 ? parseFloat((subtotal * 0.1).toFixed(2)) : 0;
  const total = parseFloat((subtotal + delivery - discount).toFixed(2));

  const itemRowClass = isDark
    ? "rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]"
    : "rounded-xl border border-ink-100 bg-white/85 hover:border-saffron-300 hover:shadow-sacred";

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto mb-6">
        <p className="text-saffron-700 dark:text-primary-400 font-semibold uppercase tracking-[0.18em] text-xs mb-1">
          Your Selection
        </p>
        <Heading level={3} data-testid="cart-page-title">Shopping Cart</Heading>
      </div>

      <Section containerSize="full" className="relative w-full flex py-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 items-start">
          {/* Items */}
          <Card variant="glass" hover={false} className="w-full p-6 md:p-8" data-testid="cart-items-card">
            <CardHeader className={`pb-4 border-b ${isDark ? "border-white/10" : "border-ink-100"}`}>
              <div className="flex items-center justify-between">
                <CardTitle>Items in Cart</CardTitle>
                <Text size="sm" color="muted">{cartItems.length} items</Text>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {isLoading ? (
                <Text className="text-center py-10">Loading cart...</Text>
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] py-12 text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4
                    ${isDark
                      ? "bg-white/[0.05] border border-white/10 text-gray-400"
                      : "bg-ivory-100 border border-ink-100 text-ink-400"
                    }`}>
                    <CartIcon size={32} />
                  </div>
                  <Text color="muted" className="mb-4">Your cart is empty</Text>
                  <Button variant="gradient" size="sm" onClick={() => navigate("/ecommerce")} data-testid="cart-empty-shop-button">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      data-testid={`cart-item-${item.product_id}`}
                      className={`${itemRowClass} transition-all duration-300`}
                    >
                      <div className="p-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <Text color="ink" className="font-semibold line-clamp-2 mb-1">{item.product_name}</Text>
                          <Text className={`font-bold ${isDark ? "text-amber-300" : "text-saffron-gradient"}`}>
                            ₹{item.product_price}
                          </Text>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            data-testid={`cart-decrement-${item.product_id}`}
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-semibold transition-all
                              ${isDark
                                ? "bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12]"
                                : "bg-white border border-ink-200 text-ink-800 hover:bg-saffron-50 hover:border-saffron-300 shadow-sm"
                              }`}
                          >−</button>
                          <div className={`w-10 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
                            ${isDark
                              ? "bg-white/[0.08] border border-white/10 text-white"
                              : "bg-ivory-100 border border-ink-100 text-ink-900"
                            }`}>
                            {item.quantity}
                          </div>
                          <button
                            type="button"
                            data-testid={`cart-increment-${item.product_id}`}
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-semibold transition-all
                              ${isDark
                                ? "bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12]"
                                : "bg-white border border-ink-200 text-ink-800 hover:bg-saffron-50 hover:border-saffron-300 shadow-sm"
                              }`}
                          >+</button>
                        </div>

                        <div className="min-w-[88px] text-right flex-shrink-0">
                          <Text size="xs" color="muted" className="mb-0.5">Total</Text>
                          <Text color="ink" className="font-bold">
                            ₹{(parseFloat(item.product_price) * item.quantity).toFixed(2)}
                          </Text>
                        </div>

                        <button
                          type="button"
                          data-testid={`cart-remove-${item.product_id}`}
                          onClick={() => removeItem(item.product_id)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                            ${isDark
                              ? "text-red-300 hover:text-red-200 hover:bg-red-500/10"
                              : "text-red-500 hover:text-red-700 hover:bg-red-50"
                            }`}
                          aria-label="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card variant="glass" hover={false} className="w-full p-6 md:p-8 md:sticky md:top-32" data-testid="cart-summary-card">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Text>Subtotal</Text>
                <Text color="ink" className="font-semibold">₹{subtotal}</Text>
              </div>

              <div className="flex justify-between items-center">
                <Text>Delivery</Text>
                <Text color="ink" className="font-semibold">
                  {delivery === 0 ? (
                    <span className="text-emerald-600 dark:text-green-400">FREE</span>
                  ) : `₹${delivery}`}
                </Text>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center">
                  <Text className="flex items-center gap-1.5"><Tag size={14} /> Discount (10%)</Text>
                  <Text className="font-semibold text-emerald-600 dark:text-green-400">−₹{discount}</Text>
                </div>
              )}

              <hr className={isDark ? "border-white/10" : "border-ink-100"} />

              <div className="flex justify-between items-center">
                <Text size="lg" color="ink" className="font-semibold">Total</Text>
                <Text size="xl" className={`font-bold ${isDark ? "text-primary-300" : "text-saffron-gradient"}`}>
                  ₹{total}
                </Text>
              </div>

              {subtotal > 0 && subtotal < 500 && (
                <div className={`rounded-xl p-3 border
                  ${isDark
                    ? "bg-primary-500/10 border-primary-500/20 text-primary-300"
                    : "bg-saffron-50 border-saffron-200 text-saffron-800"
                  }`}>
                  <Text size="sm" className="!text-current">
                    Add ₹{500 - subtotal} more for <span className="font-semibold">free delivery</span>!
                  </Text>
                </div>
              )}
            </CardContent>

            <div className="mt-6">
              <Button
                variant="gradient"
                className="w-full"
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
                data-testid="cart-checkout-button"
              >
                Proceed to Checkout ({cartItems.length} items) <ArrowRight size={16} />
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
