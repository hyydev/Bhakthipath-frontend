import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  // Generate random order ID
  const orderId = `ORD${Date.now().toString().slice(-8)}`;

  useEffect(() => {
    // Confetti or celebration animation can be added here
  }, []);

  return (
    <div className="w-full px-4 py-4">
      <Section containerSize="full" className="relative w-full flex py-6 md:py-4">
        <div className="w-full max-w-3xl mx-auto">
          <Card variant="glass" className="w-full p-8 md:p-16">
            <CardContent className="text-center space-y-8">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 
                }}
                className="flex justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500/50 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <Heading level={2} className="text-white">
                  Congratulations!
                </Heading>
                <Heading level={4} className="text-primary-400">
                  Your Order Has Been Placed Successfully
                </Heading>
                <Text className="text-gray-300 max-w-md mx-auto">
                  Thank you for your purchase. We've received your order and will process it shortly.
                </Text>
              </motion.div>

              {/* Order Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-5 h-5 text-primary-400" />
                  <Text className="text-sm text-gray-400">Order ID</Text>
                </div>
                <Text className="text-2xl font-bold text-white font-mono">
                  {orderId}
                </Text>
                <Text className="text-sm text-gray-400">
                  You will receive an order confirmation email with details of your order.
                </Text>
              </motion.div>

              {/* Delivery Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-6"
              >
                <Text className="text-primary-300 font-semibold mb-2">
                  Estimated Delivery
                </Text>
                <Text className="text-white text-lg font-bold">
                  3-5 Business Days
                </Text>
                <Text className="text-sm text-gray-400 mt-2">
                  We'll send you tracking details once your order is shipped.
                </Text>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
              >
                <Button
                  variant="primary"
                  className="sm:w-auto"
                  onClick={() => navigate('/ecommerce')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
                <Button
                  variant="outline"
                  className="sm:w-auto"
                  onClick={() => navigate('/profile')}
                >
                  <Package className="w-4 h-4 mr-2" />
                  View Orders
                </Button>
              </motion.div>

              {/* Thank You Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="pt-6 border-t border-white/10"
              >
                <Text className="text-gray-400 text-sm">
                  Thank you for shopping with BhakthiVerse! 🙏
                </Text>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}