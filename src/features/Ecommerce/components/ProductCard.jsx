import { Badge, Button } from "../../../components/ui";
import { getImageUrl } from "../../../lib/utils";
import { Link } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function ProductCard({
  product,
  onAddToCart,
  onGoToCart,
  isInCart = false,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const primaryImage = product.images?.find((img) => img.is_primary);
  const inStock = product.price_info.in_stock;

  const buttonLabel = !inStock
    ? "Unavailable"
    : isInCart
    ? "Go to Cart"
    : "Add to Cart";

  const handleCartClick = () => {
    if (isInCart) {
      onGoToCart?.();
      return;
    }
    onAddToCart(product.id);
  };

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className={`
        group relative rounded-2xl overflow-hidden flex flex-col h-full
        transition-all duration-500 hover:-translate-y-1
        ${
          isDark
            ? "bg-white/[0.04] border border-white/10 hover:border-primary-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.18)] backdrop-blur-xl"
            : "bg-white/90 border border-ink-100 hover:border-saffron-300 shadow-sacred hover:shadow-sacred-lg backdrop-blur-xl"
        }
      `}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div
          className={`relative w-full aspect-square flex items-center justify-center overflow-hidden
          ${
            isDark
              ? "bg-gradient-to-br from-primary-500/[0.08] via-transparent to-purple-500/[0.06]"
              : "bg-gradient-to-br from-ivory-100 via-saffron-50 to-gold-50"
          }`}
        >
          {primaryImage?.image ? (
            <img
              src={getImageUrl(primaryImage.image)}
              alt={product.basic_info.title}
              className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={`text-center text-sm ${
                isDark ? "text-gray-400" : "text-ink-400"
              }`}
            >
              No image
            </div>
          )}

          {/* Stock badge floating */}
          {!inStock && (
            <Badge variant="danger" size="sm" className="absolute top-3 left-3">
              Out of Stock
            </Badge>
          )}
          {isInCart && inStock && (
            <Badge
              variant="success"
              size="sm"
              className="absolute top-3 left-3"
            >
              <Check size={12} className="mr-1" /> In Cart
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/product/${product.id}`}
          data-testid={`product-link-${product.id}`}
          className={`text-base font-display font-semibold leading-snug mb-2 line-clamp-2 transition-colors
            ${
              isDark
                ? "text-white hover:text-primary-300"
                : "text-ink-900 hover:text-saffron-700"
            }
          `}
        >
          {product.basic_info.title}
        </Link>

        <div className="flex items-baseline justify-between mt-auto pt-2">
          <span
            className={`text-xl font-display font-bold
            ${isDark ? "text-amber-300" : "text-saffron-gradient"}
          `}
          >
            ₹{product.price_info.price}
          </span>
        </div>

        <Button
          variant={isInCart ? "outline" : "gradient"}
          size="sm"
          className="mt-3 w-full"
          disabled={!inStock}
          data-testid={`add-to-cart-button-${product.id}`}
          onClick={handleCartClick}
        >
          <ShoppingCart size={14} />
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
