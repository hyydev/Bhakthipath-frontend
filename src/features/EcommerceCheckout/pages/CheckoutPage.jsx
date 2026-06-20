import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Text,
  Badge,
  Section,
  PaymentOptions,
} from "../../../components/ui";
import { MapPin, Phone, User, Package, Mail, CreditCard } from "lucide-react";

// Mock order data (in real app, this would come from cart state/context)
const mockOrderItems = [
  {
    id: 1,
    name: "2 Round Long Beads Line Kanthi Mala Original Tulsi",
    price: 299,
    quantity: 2,
  },
  {
    id: 2,
    name: "4 Pc Original Gopi Chandan Sticks Light Yellow Pooja Tika Tilak",
    price: 149,
    quantity: 1,
  },
];

// Mock user address (in real app, this would come from user profile/context)
const defaultAddress = {
  fullName: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+91 98765 43210",
  addressLine1: "123, Shanti Nagar",
  addressLine2: "Near Ram Mandir, MG Road",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400001",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const subtotal = mockOrderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = subtotal > 500 ? 0 : 50;
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
  const total = subtotal + delivery - discount;

  const handlePlaceOrder = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // In real app, this would call an API
    console.log('Order placed:', { 
      address: defaultAddress, 
      selectedPaymentMethod, 
      items: mockOrderItems,
      total 
    });
    
    // Navigate to order success page
    navigate('/order-success');
  };

  return (
    <div className="w-full px-4 py-4">
      <Section containerSize="full" className="relative w-full flex py-6 md:py-4">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 items-start">
          {/* Left Side - Order Details */}
          <div className="space-y-6">
            {/* Delivery Address Card */}
            <Card variant="glass" className="w-full p-8 md:p-12">
              <CardHeader className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary-400" />
                    </div>
                    <CardTitle>Delivery Address</CardTitle>
                  </div>
                  <Badge variant="primary" size="sm">Default</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text className="text-xs text-gray-400 mb-1">Full Name</Text>
                      <Text className="font-semibold text-white">{defaultAddress.fullName}</Text>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text className="text-xs text-gray-400 mb-1">Email</Text>
                      <Text className="font-semibold text-white">{defaultAddress.email}</Text>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text className="text-xs text-gray-400 mb-1">Phone Number</Text>
                      <Text className="font-semibold text-white">{defaultAddress.phone}</Text>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text className="text-xs text-gray-400 mb-1">Delivery Address</Text>
                      <Text className="font-semibold text-white">
                        {defaultAddress.addressLine1}
                      </Text>
                      <Text className="text-sm text-gray-300 mt-1">
                        {defaultAddress.addressLine2}
                      </Text>
                      <Text className="text-sm text-gray-300 mt-1">
                        {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}
                      </Text>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card variant="glass" className="w-full p-8 md:p-12">
              <CardHeader className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary-400" />
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
                  <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Text className="text-sm text-yellow-300">
                      Please select a payment method to continue
                    </Text>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Order Summary */}
          <Card variant="glass" className="w-full p-8 md:p-12 lg:sticky lg:top-6">
            <CardHeader className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary-400" />
                </div>
                <CardTitle>Order Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Order Items */}
              <div className="space-y-3">
                {mockOrderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex-1 min-w-0">
                      <Text className="text-sm font-medium text-white line-clamp-2">
                        {item.name}
                      </Text>
                      <Text className="text-xs text-gray-400 mt-1">
                        Qty: {item.quantity}
                      </Text>
                    </div>
                    <Text className="text-sm font-semibold text-primary-400">
                      ₹{item.price * item.quantity}
                    </Text>
                  </div>
                ))}
              </div>

              <hr className="border-white/10" />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Text className="text-sm">Subtotal</Text>
                  <Text className="font-semibold">₹{subtotal}</Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text className="text-sm">Delivery</Text>
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
                    <Text className="text-sm">Discount (10%)</Text>
                    <Text className="font-semibold text-green-400">
                      -₹{discount}
                    </Text>
                  </div>
                )}
              </div>

              <hr className="border-white/10" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <Text className="text-lg font-semibold">Total</Text>
                <Text className="text-xl font-bold text-primary-400">₹{total}</Text>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={!selectedPaymentMethod}
                >
                  Place Order - ₹{total}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}