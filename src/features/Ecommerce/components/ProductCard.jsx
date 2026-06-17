import { Badge, Text, Button } from "../../../components/ui"
import { getImageUrl } from "../../../lib/utils"

export default function ProductCard({ product, onAddToCart }) {
  const primaryImage = product.images?.find((img) => img.is_primary)
  const inStock = product.price_info.in_stock

  return (
    <div className="bg-white/80 dark:bg-[#0A1628]/80 rounded-2xl shadow-lg p-4 flex flex-col items-center animate-fade-in">
      <img
        src={getImageUrl(primaryImage?.image)}
        alt={product.basic_info.title}
        className="w-32 h-32 object-contain mb-4 rounded-xl"
      />
      {!inStock && (
        <Badge variant="danger" size="sm" className="mb-2">
          Out of Stock
        </Badge>
      )}
      <h4 className="text-lg font-semibold mb-1 text-[#3A0519] dark:text-[#93C5FD]">
        {product.basic_info.title}
      </h4>
      <Text size="lg" className="font-bold text-[#6A092F] dark:text-amber-300">
        ₹{product.price_info.price}
      </Text>
      <Button
        variant="gradient"
        size="sm"
        className="mt-3 w-full"
        disabled={!inStock}
        onClick={() => onAddToCart(product.id)}
      >
        {inStock ? "Add to Cart" : "Unavailable"}
      </Button>
    </div>
  )
}