import { Badge, Text, Button } from "../../../components/ui"
import { getImageUrl } from "../../../lib/utils"
import { Link } from "react-router-dom"

export default function ProductCard({ product, onAddToCart, onGoToCart, isInCart = false }) {
  const primaryImage = product.images?.find((img) => img.is_primary)
  const inStock = product.price_info.in_stock
  const buttonLabel = !inStock ? "Unavailable" : isInCart ? "Go to Cart" : "Add to Cart"

  const handleCartClick = () => {
    if (isInCart) {
      onGoToCart?.()
      return
    }

    onAddToCart(product.id)
  }

  return (
    <div className="bg-white/80 dark:bg-[#0A1628]/80 rounded-2xl shadow-lg p-4 flex flex-col items-center animate-fade-in">
      <Link to={`/product/${product.id}`} className="w-full flex justify-center">
        <img
          src={getImageUrl(primaryImage?.image)}
          alt={product.basic_info.title}
          className="w-32 h-32 object-contain mb-4 rounded-xl"
        />
      </Link>
      {!inStock && (
        <Badge variant="danger" size="sm" className="mb-2">
          Out of Stock
        </Badge>
      )}
      <Link
        to={`/product/${product.id}`}
        className="text-lg font-semibold mb-1 text-center text-[#3A0519] dark:text-[#93C5FD] hover:text-primary-500 dark:hover:text-amber-300 transition"
      >
        {product.basic_info.title}
      </Link>
      <Text size="lg" className="font-bold text-[#6A092F] dark:text-amber-300">
        ₹{product.price_info.price}
      </Text>
      <Button
        variant="gradient"
        size="sm"
        className="mt-3 w-full"
        disabled={!inStock}
        onClick={handleCartClick}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}
