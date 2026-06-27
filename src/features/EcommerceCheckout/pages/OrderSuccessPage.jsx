import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Text,
  Section,
  Heading,
} from "../../../components/ui";
import { CheckCircle, Package, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const orderData = location.state?.order;
  if (!orderData) {
    navigate("/ecommerce");
    return null;
  }
  const orderId = orderData?.order_id;
  const formattedOrderId = orderId ? `ORD${String(orderId).padStart(6, "0")}` : "---";

  return (
    <div className="w-full px-4 py-6">
      <Section containerSize="full" className="relative w-full flex py-4">
        <div className="w-full max-w-3xl mx-auto">
          <Card variant="glass" hover={false} className="w-full p-8 md:p-14" data-testid="order-success-card">
            <CardContent className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="flex justify-center"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center
                  ${isDark
                    ? "bg-emerald-500/20 border-4 border-emerald-500/50"
                    : "bg-emerald-50 border-4 border-emerald-300"
                  }`}>
                  <CheckCircle className={`w-12 h-12 ${isDark ? "text-emerald-300" : "text-emerald-600"}`} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <Heading level={3}>Congratulations!</Heading>
                <Heading level={5}>
                  <span className={isDark ? "text-amber-300" : "text-saffron-gradient"}>
                    Your Order Has Been Placed Successfully
                  </span>
                </Heading>
                <Text className="max-w-md mx-auto">
                  Thank you for your purchase. We've received your order and will process it shortly.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`rounded-2xl p-6 space-y-3
                  ${isDark
                    ? "bg-white/[0.04] border border-white/10"
                    : "bg-gradient-to-br from-ivory-100 to-saffron-50 border border-saffron-200/70"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Package className={`w-5 h-5 ${isDark ? "text-primary-300" : "text-saffron-700"}`} />
                  <Text size="sm" color="muted">Order ID</Text>
                </div>
                <Text size="xl" color="ink" className="font-mono font-bold tracking-wider" data-testid="order-id-display">
                  {formattedOrderId}
                </Text>
                <Text size="sm" color="muted">
                  You will receive an order confirmation email with details of your order.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`rounded-2xl p-5
                  ${isDark
                    ? "bg-primary-500/10 border border-primary-500/20"
                    : "bg-emerald-50 border border-emerald-200"
                  }`}
              >
                <Text className={`font-semibold mb-1 ${isDark ? "!text-primary-300" : "!text-emerald-700"}`}>
                  Estimated Delivery
                </Text>
                <Text size="lg" color="ink" className="font-bold">3-5 Business Days</Text>
                <Text size="sm" color="muted" className="mt-1">
                  We'll send you tracking details once your order is shipped.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
              >
                <Button variant="gradient" onClick={() => navigate("/ecommerce")} data-testid="order-success-shop-button">
                  <Home size={16} /> Continue Shopping
                </Button>
                <Button variant="outline" onClick={() => navigate("/profile")} data-testid="order-success-view-orders-button">
                  <Package size={16} /> View Orders
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className={`pt-6 border-t ${isDark ? "border-white/10" : "border-ink-100"}`}
              >
                <Text size="sm" color="muted">
                  Thank you for shopping with BhakthiVerse 🙏
                </Text>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
