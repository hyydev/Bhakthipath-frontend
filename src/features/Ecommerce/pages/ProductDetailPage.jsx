import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { product, isLoading, isError } = useProductDetail(id);

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

  const handleQuantityChange = (nextQuantity) => {
    setQuantity(Math.max(1, nextQuantity));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8">
          <div className="h-[420px] rounded-2xl bg-white/40 dark:bg-[#0A1628]/40 animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 rounded-lg bg-white/40 dark:bg-[#0A1628]/40 animate-pulse" />
            <div className="h-6 w-1/3 rounded-lg bg-white/40 dark:bg-[#0A1628]/40 animate-pulse" />
            <div className="h-28 rounded-lg bg-white/40 dark:bg-[#0A1628]/40 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heading level={3} className="mb-4">
          Product not found
        </Heading>
        <Text className="mb-8">
          We could not load this product right now.
        </Text>
        <Button variant="outline" onClick={() => navigate("/ecommerce")}>
          Back to Store
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
          className="mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </RevealOnScroll>

      <section className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 items-start">
        <RevealOnScroll>
          <Card variant="glass" hover={false} className="p-4 md:p-6">
            <div className="aspect-square rounded-2xl bg-white/70 dark:bg-[#0A1628]/70 border border-white/10 light:border-dark-900/10 flex items-center justify-center overflow-hidden">
              {selectedImage?.image ? (
                <img
                  src={getImageUrl(selectedImage.image)}
                  alt={title}
                  className="w-full h-full object-contain p-6"
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
                      className={`aspect-square rounded-xl border bg-white/60 dark:bg-[#0A1628]/60 overflow-hidden transition ${
                        isSelected
                          ? "border-primary-400 ring-2 ring-primary-400/40"
                          : "border-white/10 light:border-dark-900/10 hover:border-white/30"
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
          <Card variant="glass" hover={false} className="p-6 md:p-8">
            <CardContent className="space-y-6">
              <div>
                <Badge
                  variant={inStock ? "success" : "danger"}
                  size="sm"
                  className="mb-4"
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                <Heading level={2} className="mb-3">
                  {title}
                </Heading>
                {price && (
                  <Text
                    size="xl"
                    className="font-bold text-[#6A092F] dark:text-amber-300"
                  >
                    ₹{price}
                  </Text>
                )}
              </div>

              <div className="border-t border-white/10 light:border-dark-900/10 pt-6">
                <Text className="leading-relaxed">{description}</Text>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 p-0 inline-flex items-center justify-center"
                  >
                    <Minus size={16} />
                  </Button>
                  <div className="w-14 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                    <Text className="font-semibold text-white">{quantity}</Text>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 p-0 inline-flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                <Button
                  variant="gradient"
                  disabled={!inStock}
                  onClick={() => console.log("Add to cart:", id, quantity)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  {inStock ? "Add to Cart" : "Unavailable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </RevealOnScroll>
      </section>
    </div>
  );
}
