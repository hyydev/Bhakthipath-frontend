import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Sparkles } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Heading,
  Text,
} from "../../../components/ui";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { getImageUrl } from "../../../lib/utils";
import { useProductDetail } from "../hooks/useProductDetail";
import { useCart } from "../../EcommerceCart/hooks/useCart";
import { useTheme } from "../../../context/ThemeContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { product, isLoading, isError } = useProductDetail(id);
  const { addCart, isInCart } = useCart();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const images = useMemo(() => product?.images || [], [product]);
  const primaryImage =
    images.find((image) => image.is_primary) || images[0] || null;
  const [selectedImageId, setSelectedImageId] = useState(null);

  const selectedImage =
    images.find((image) => image.id === selectedImageId) || primaryImage;
  const title = product?.basic_info?.title || "Product";
  const description =
    product?.basic_info?.description ||
    product?.description ||
    "Product details will be available soon.";
  const price = product?.price_info?.price;
  const inStock = Boolean(product?.price_info?.in_stock);
  const category = product?.basic_info?.category;
  const productInCart = isInCart(id);

  const handleQuantityChange = (n) => setQuantity(Math.max(1, n));

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8">
          <div
            className={`h-[440px] rounded-2xl animate-pulse ${
              isDark ? "bg-white/[0.04]" : "bg-ivory-100"
            }`}
          />
          <div className="space-y-4">
            <div
              className={`h-10 w-2/3 rounded-lg animate-pulse ${
                isDark ? "bg-white/[0.04]" : "bg-ivory-100"
              }`}
            />
            <div
              className={`h-6 w-1/3 rounded-lg animate-pulse ${
                isDark ? "bg-white/[0.04]" : "bg-ivory-100"
              }`}
            />
            <div
              className={`h-28 rounded-lg animate-pulse ${
                isDark ? "bg-white/[0.04]" : "bg-ivory-100"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heading level={4} className="mb-4">
          Product not found
        </Heading>
        <Text className="mb-8">We could not load this product right now.</Text>
        <Button variant="outline" onClick={() => navigate("/ecommerce")}>
          <ArrowLeft size={14} /> Back to Store
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <RevealOnScroll>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
          data-testid="product-detail-back-button"
        >
          <ArrowLeft size={14} /> Back
        </Button>
      </RevealOnScroll>

      <section className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 items-start">
        <RevealOnScroll>
          <Card
            variant="glass"
            hover={false}
            className="p-4 md:p-6"
            data-testid="product-image-card"
          >
            <div
              className={`aspect-square rounded-2xl border flex items-center justify-center overflow-hidden
              ${
                isDark
                  ? "bg-gradient-to-br from-primary-500/[0.08] via-transparent to-purple-500/[0.06] border-white/10"
                  : "bg-gradient-to-br from-ivory-100 via-saffron-50 to-gold-50 border-saffron-200/60"
              }`}
            >
              {selectedImage?.image ? (
                <img
                  src={getImageUrl(selectedImage.image)}
                  alt={title}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <Text className="text-center">No image available</Text>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                {images.map((image) => {
                  const isSelected = selectedImage?.id === image.id;
                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImageId(image.id)}
                      data-testid={`thumbnail-${image.id}`}
                      className={`aspect-square rounded-xl overflow-hidden transition-all duration-300
                        ${
                          isSelected
                            ? isDark
                              ? "border-2 border-primary-400 ring-2 ring-primary-400/30"
                              : "border-2 border-saffron-500 ring-2 ring-saffron-300/50 shadow-sacred"
                            : isDark
                            ? "border border-white/10 hover:border-white/30 bg-white/[0.04]"
                            : "border border-ink-200 hover:border-saffron-300 bg-white"
                        }`}
                    >
                      <img
                        src={getImageUrl(image.image)}
                        alt={title}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <Card
            variant="glass"
            hover={false}
            className="p-6 md:p-8"
            data-testid="product-info-card"
          >
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={inStock ? "success" : "danger"} size="sm">
                    {inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                  <Badge variant="golden" size="sm">
                    <Sparkles size={10} className="mr-1" /> Premium
                  </Badge>
                  {category?.name && (
                    <Link to={`/category/${category.slug}`}>
                      <Badge
                        variant="outline"
                        size="sm"
                        className="cursor-pointer hover:opacity-80"
                      >
                        {category.name}
                      </Badge>
                    </Link>
                  )}
                </div>

                <Heading level={3} className="mb-4" data-testid="product-title">
                  {title}
                </Heading>

                {price && (
                  <div className="flex items-baseline gap-3">
                    <Text
                      size="xl"
                      className={`font-display font-bold ${
                        isDark ? "text-amber-300" : "text-saffron-gradient"
                      }`}
                    >
                      ₹{price}
                    </Text>
                    <Text size="sm" color="muted">
                      Inclusive of all taxes
                    </Text>
                  </div>
                )}
              </div>

              <div
                className={`pt-6 border-t ${
                  isDark ? "border-white/10" : "border-ink-100"
                }`}
              >
                <Text className="leading-relaxed">{description}</Text>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    data-testid="quantity-decrement"
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                      ${
                        isDark
                          ? "bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12]"
                          : "bg-white border border-ink-200 text-ink-800 hover:bg-saffron-50 hover:border-saffron-300 shadow-sm"
                      }`}
                  >
                    <Minus size={16} />
                  </button>
                  <div
                    className={`w-14 h-10 rounded-lg flex items-center justify-center text-sm font-semibold
                    ${
                      isDark
                        ? "bg-white/[0.08] border border-white/10 text-white"
                        : "bg-ivory-100 border border-ink-100 text-ink-900"
                    }`}
                  >
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    data-testid="quantity-increment"
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                      ${
                        isDark
                          ? "bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12]"
                          : "bg-white border border-ink-200 text-ink-800 hover:bg-saffron-50 hover:border-saffron-300 shadow-sm"
                      }`}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  variant="gradient"
                  disabled={!inStock}
                  data-testid="product-detail-cart-button"
                  onClick={() => {
                    if (productInCart) {
                      navigate("/cart");
                      return;
                    }
                    addCart({ items: [{ product_id: Number(id), quantity }] });
                  }}
                  className="w-full sm:w-auto"
                >
                  <ShoppingCart size={16} />
                  {!inStock
                    ? "Unavailable"
                    : productInCart
                    ? "Go to Cart"
                    : "Add to Cart"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </RevealOnScroll>
      </section>
    </div>
  );
}
