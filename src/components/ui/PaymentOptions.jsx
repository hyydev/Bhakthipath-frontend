import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  Banknote 
} from 'lucide-react';
import { Card, CardContent } from './Card';
import { Text } from './Typography';

// Payment method data
const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, Rupay',
    icon: CreditCard,
  },
  {
    id: 'upi',
    name: 'UPI',
    description: 'Google Pay, PhonePe, Paytm',
    icon: Smartphone,
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    description: 'All major banks',
    icon: Building2,
  },
  {
    id: 'wallet',
    name: 'Digital Wallets',
    description: 'Paytm, PhonePe, Amazon Pay',
    icon: Wallet,
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: Banknote,
  },
];

// Individual Payment Method Item Component
const PaymentMethodItem = ({ icon: Icon, name, description, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center gap-4 p-4 rounded-xl cursor-pointer
        transition-all duration-300
        ${isSelected 
          ? 'bg-primary-500/20 border-2 border-primary-500/50' 
          : 'bg-white/5 dark:bg-white/5 light:bg-dark-900/5 border border-white/10 dark:border-white/10 light:border-dark-900/10 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-dark-900/10 hover:border-white/20 dark:hover:border-white/20 light:hover:border-dark-900/20'
        }
      `}
    >
      {/* Icon */}
      <div className={`
        flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
        ${isSelected 
          ? 'bg-primary-500/30 border border-primary-500/50' 
          : 'bg-white/10 dark:bg-white/10 light:bg-dark-900/10 border border-white/20 dark:border-white/20 light:border-dark-900/20'
        }
      `}>
        <Icon 
          className={`w-6 h-6 ${isSelected ? 'text-primary-300' : 'text-white dark:text-white light:text-dark-900'}`}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <Text className={`font-semibold ${isSelected ? 'text-primary-300' : 'text-white dark:text-white light:text-dark-900'}`}>
          {name}
        </Text>
        <Text className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
          {description}
        </Text>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Payment Options Component
export const PaymentOptions = ({ 
  selectedMethod, 
  onMethodSelect, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedMethod || null);

  const handleMethodClick = (methodId) => {
    setSelected(methodId);
    if (onMethodSelect) {
      onMethodSelect(methodId);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header - Clickable trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between p-4 rounded-xl cursor-pointer
          bg-white/5 dark:bg-white/5 light:bg-dark-900/5 
          border border-white/10 dark:border-white/10 light:border-dark-900/10
          hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-dark-900/10
          hover:border-white/20 dark:hover:border-white/20 light:hover:border-dark-900/20
          transition-all duration-300
        "
      >
        <Text className="font-semibold text-white dark:text-white light:text-dark-900">
          Payment Options
        </Text>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="w-5 h-5 text-white dark:text-white light:text-dark-900" />
        </motion.div>
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-3">
              {paymentMethods.map((method) => (
                <PaymentMethodItem
                  key={method.id}
                  icon={method.icon}
                  name={method.name}
                  description={method.description}
                  isSelected={selected === method.id}
                  onClick={() => handleMethodClick(method.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};