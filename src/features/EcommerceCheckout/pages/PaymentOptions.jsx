import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CreditCard, Banknote } from 'lucide-react';
import { Text } from '../../../components/ui/Typography';
import { useTheme } from '../../../context/ThemeContext';

const paymentMethods = [
  { id: 'COD', name: 'Cash on Delivery', description: 'Pay when you receive', icon: Banknote },
  { id: 'RAZORPAY', name: 'Razorpay', description: 'Secure online payment gateway', icon: CreditCard },
];

const PaymentMethodItem = ({ icon: Icon, name, description, isSelected, onClick, isDark }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      data-testid={`payment-method-${name.replace(/\s+/g, '-').toLowerCase()}`}
      className={`
        flex items-center gap-4 p-4 rounded-xl cursor-pointer
        transition-all duration-300
        ${isSelected
          ? (isDark
              ? 'bg-primary-500/15 border-2 border-primary-500/50 shadow-[0_0_20px_rgba(59,130,246,0.18)]'
              : 'bg-saffron-50 border-2 border-saffron-400 shadow-sacred')
          : (isDark
              ? 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20'
              : 'bg-white border border-ink-200 hover:bg-saffron-50/60 hover:border-saffron-300')
        }
      `}
    >
      <div className={`
        flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-all
        ${isSelected
          ? (isDark ? 'bg-primary-500/30 border border-primary-500/50' : 'bg-saffron-200 border border-saffron-400/70')
          : (isDark ? 'bg-white/[0.06] border border-white/10' : 'bg-ivory-100 border border-ink-200')
        }
      `}>
        <Icon
          className={`w-5 h-5 ${
            isSelected
              ? (isDark ? 'text-primary-300' : 'text-saffron-700')
              : (isDark ? 'text-gray-200' : 'text-ink-700')
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <Text color="ink" className={`font-semibold ${isSelected ? (isDark ? "!text-primary-300" : "!text-saffron-800") : ""}`}>
          {name}
        </Text>
        <Text size="sm" color="muted">{description}</Text>
      </div>

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
            ${isDark ? 'bg-primary-500' : 'bg-saffron-600'}
          `}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export const PaymentOptions = ({ selectedMethod, onMethodSelect, className = '' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState(selectedMethod || null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleMethodClick = (methodId) => {
    setSelected(methodId);
    onMethodSelect?.(methodId);
  };

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="payment-options-toggle"
        className={`
          w-full flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300
          ${isDark
            ? 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]'
            : 'bg-white border border-ink-200 hover:bg-saffron-50/40 shadow-sm'
          }
        `}
      >
        <Text color="ink" className="font-semibold">Choose Payment Method</Text>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} className={isDark ? "text-white" : "text-ink-700"} />
        </motion.div>
      </button>

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
                  isDark={isDark}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
