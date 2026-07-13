import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Text,
  Badge,
  Heading,
  Section,
  PaymentOptions,
} from "../../../components/ui";
import {
  MapPin,
  Phone,
  User,
  Package,
  Mail,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../../../context/ThemeContext";

import { useProfile } from "../../auth/hooks/useProfile";
import { useAuthStore } from "../../auth/auth.store";
import { useCheckout } from "../hooks/useCheckout";
import { useCart } from "../../EcommerceCart/hooks/useCart";
import { useAddresses } from "../../auth/hooks/useAddresses";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { addresses } = useAddresses();
  const { placeOrder, isPlacingOrder } =
    useCheckout();
  const userId = useAuthStore((s) => s.userId);
  const { profile } = useProfile(userId);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const defaultAddress =
    addresses?.find((addr) => addr.is_default) || addresses?.[0];

  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
  // Already loaded hai toh skip karo
  if (window.Razorpay) return;
  if (document.querySelector('script[src*="razorpay"]')) return;

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  script.onerror = () => {
    console.error("Razorpay SDK failed to load");
  };

  document.body.appendChild(script);

  // Cleanup nahi karo — script reuse hogi next mount pe
  // return () => {} ← empty cleanup
}, []);

  

  const subtotal = parseFloat(cart?.total_price || "0");
  const delivery = subtotal > 500 ? 0 : 50;
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
  const total = parseFloat((subtotal + delivery - discount).toFixed(2));

  const handlePlaceOrder = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (!defaultAddress) {
      toast.error("Please add a delivery address");
      return;
    }
    placeOrder({
      cart_id: cart?.id,
      shipping_address_id: defaultAddress?.id,
      payment_method: selectedPaymentMethod,
    });
  };

  const iconBoxClass = isDark
    ? "w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center text-primary-300"
    : "w-10 h-10 rounded-xl bg-saffron-100 border border-saffron-300/70 flex items-center justify-center text-saffron-700";

  const orderItemClass = isDark
    ? "bg-white/[0.04] border border-white/10"
    : "bg-ivory-50 border border-ink-100";

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto mb-6">
        <p className="text-saffron-700 dark:text-primary-400 font-semibold uppercase tracking-[0.18em] text-xs mb-1">
          Final Step
        </p>
        <Heading level={3} data-testid="checkout-page-title">
          Checkout
        </Heading>
      </div>

      <Section containerSize="full" className="relative w-full flex py-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 items-start">
          {/* Left */}
          <div className="space-y-6">
            {/* Address */}
            <Card
              variant="glass"
              hover={false}
              className="w-full p-6 md:p-8"
              data-testid="checkout-address-card"
            >
              <CardHeader
                className={`pb-4 border-b ${
                  isDark ? "border-white/10" : "border-ink-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={iconBoxClass}>
                      <MapPin size={20} />
                    </div>
                    <CardTitle>Delivery Address</CardTitle>
                  </div>
                  <Badge variant="golden" size="sm">
                    Default
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Field
                    icon={<User size={16} />}
                    label="Full Name"
                    value={profile?.user?.full_name || "-"}
                    isDark={isDark}
                  />
                  <Field
                    icon={<Mail size={16} />}
                    label="Email"
                    value={profile?.user?.email || "-"}
                    isDark={isDark}
                  />
                  <Field
                    icon={<Phone size={16} />}
                    label="Phone Number"
                    value={profile?.user?.mobile_number || "-"}
                    isDark={isDark}
                  />
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className={`mt-1 shrink-0 ${
                        isDark ? "text-gray-400" : "text-ink-400"
                      }`}
                    />
                    <div>
                      <Text size="xs" color="muted" className="mb-1">
                        Delivery Address
                      </Text>
                      <Text color="ink" className="font-semibold">
                        {defaultAddress?.address_line_1 || "—"}
                      </Text>
                      {defaultAddress?.address_line_2 && (
                        <Text size="sm" color="muted">
                          {defaultAddress.address_line_2}
                        </Text>
                      )}
                      {defaultAddress && (
                        <Text size="sm" color="muted">
                          {defaultAddress.city}, {defaultAddress.state} −{" "}
                          {defaultAddress.postal_code}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card
              variant="glass"
              hover={false}
              className="w-full p-6 md:p-8"
              data-testid="checkout-payment-card"
            >
              <CardHeader
                className={`pb-4 border-b ${
                  isDark ? "border-white/10" : "border-ink-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={iconBoxClass}>
                    <CreditCard size={20} />
                  </div>
                  <CardTitle>Payment Method</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <PaymentOptions
                  selectedMethod={selectedPaymentMethod}
                  onMethodSelect={setSelectedPaymentMethod}
                />
                {!selectedPaymentMethod && (
                  <div
                    className={`mt-4 p-3 rounded-xl border
                    ${
                      isDark
                        ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
                        : "bg-amber-50 border-amber-200 text-amber-800"
                    }`}
                  >
                    <Text size="sm" className="!text-current">
                      Please select a payment method to continue
                    </Text>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right - Summary */}
          <Card
            variant="glass"
            hover={false}
            className="w-full p-6 md:p-8 lg:sticky lg:top-32"
            data-testid="checkout-summary-card"
          >
            <CardHeader
              className={`pb-4 border-b ${
                isDark ? "border-white/10" : "border-ink-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={iconBoxClass}>
                  <Package size={20} />
                </div>
                <CardTitle>Order Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-2">
                {cart?.items?.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start justify-between gap-4 p-3 rounded-xl ${orderItemClass}`}
                  >
                    <div className="flex-1 min-w-0">
                      <Text
                        size="sm"
                        color="ink"
                        className="font-medium line-clamp-2"
                      >
                        {item.product_name}
                      </Text>
                      <Text size="xs" color="muted" className="mt-0.5">
                        Qty: {item.quantity}
                      </Text>
                    </div>
                    <Text
                      size="sm"
                      className={`font-semibold ${
                        isDark ? "text-amber-300" : "text-saffron-gradient"
                      }`}
                    >
                      ₹{parseFloat(item.product_price) * item.quantity}
                    </Text>
                  </div>
                ))}
              </div>

              <hr className={isDark ? "border-white/10" : "border-ink-100"} />

              <div className="space-y-2">
                <Row label="Subtotal" value={`₹${subtotal}`} />
                <Row
                  label="Delivery"
                  value={
                    delivery === 0 ? (
                      <span className="text-emerald-600 dark:text-green-400">
                        FREE
                      </span>
                    ) : (
                      `₹${delivery}`
                    )
                  }
                />
                {discount > 0 && (
                  <Row
                    label="Discount (10%)"
                    value={
                      <span className="text-emerald-600 dark:text-green-400">
                        −₹{discount}
                      </span>
                    }
                  />
                )}
              </div>

              <hr className={isDark ? "border-white/10" : "border-ink-100"} />

              <div className="flex justify-between items-center">
                <Text size="lg" color="ink" className="font-semibold">
                  Total
                </Text>
                <Text
                  size="xl"
                  className={`font-bold ${
                    isDark ? "text-primary-300" : "text-saffron-gradient"
                  }`}
                >
                  ₹{total}
                </Text>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={!selectedPaymentMethod || isPlacingOrder}
                  data-testid="checkout-place-order-button"
                >
                  {isPlacingOrder
                    ? "Placing Order..."
                    : `Place Order − ₹${total.toFixed(2)}`}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/cart")}
                  data-testid="checkout-back-button"
                >
                  <ArrowLeft size={14} /> Back to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

function Field({ icon, label, value, isDark }) {
  return (
    <div className="flex items-start gap-3">
      <span className={isDark ? "text-gray-400 mt-1" : "text-ink-400 mt-1"}>
        {icon}
      </span>
      <div>
        <Text size="xs" color="muted" className="mb-1">
          {label}
        </Text>
        <Text color="ink" className="font-semibold">
          {value}
        </Text>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <Text size="sm">{label}</Text>
      <Text size="sm" color="ink" className="font-semibold">
        {value}
      </Text>
    </div>
  );
}
