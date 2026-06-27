import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heading, Text, Button, Pagination, Badge } from "../../../components/ui";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { useSmoothScroll } from "../../../app/SmoothScrollProvider";
import { useProductCategories } from "../hooks/useProductCategories";
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useCart } from "../../EcommerceCart/hooks/useCart";
import ProductCard from "../components/ProductCard";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const PRODUCTS_PER_PAGE = 12;
const HEADER_OFFSET = -80;

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [page, setPage] = useState(1);

  const { categories } = useProductCategories();
  const category = categories?.find((cat) => cat.slug === slug);

  const { products, pagination, isLoading, isError } = useProductsByCategory(
    category?.id, page, PRODUCTS_PER_PAGE
  );
  const { addCart, isInCart } = useCart();

  const handleAddToCart = (productId) => {
    addCart({ items: [{ product_id: productId, quantity: 1 }] });
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    scrollTo("#category-products", { offset: HEADER_OFFSET });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <RevealOnScroll>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/ecommerce")}
          className="mb-8"
          data-testid="category-back-button"
        >
          <ArrowLeft size={14} /> Back to Store
        </Button>

        <div className="text-center mb-12">
          <Badge variant="golden" size="md" className="mb-4">
            <Sparkles size={12} className="mr-1.5" /> Curated Collection
          </Badge>
          <Heading level={2} data-testid="category-page-title">
            <span className={isDark
              ? "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent"
              : "text-saffron-gradient"
            }>
              {category?.name || "Category"}
            </span>
          </Heading>
          {category?.description && (
            <Text className="mt-3 max-w-2xl mx-auto" color="muted">{category.description}</Text>
          )}
        </div>
      </RevealOnScroll>

      <section id="category-products" className="scroll-mt-24">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl h-72 animate-pulse border
                  ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white/70 border-ink-100"}`}
              />
            ))}
          </div>
        ) : isError ? (
          <Text className="text-center text-red-500">Failed to load products.</Text>
        ) : products?.length === 0 ? (
          <Text className="text-center" color="muted">No products found in this category.</Text>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products?.map((product, index) => (
                <RevealOnScroll key={product.id} delay={index * 0.05}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onGoToCart={() => navigate("/cart")}
                    isInCart={isInCart(product.id)}
                  />
                </RevealOnScroll>
              ))}
            </div>

            <Pagination
              currentPage={pagination?.current_page ?? page}
              totalPages={pagination?.total_pages ?? 1}
              totalCount={pagination?.count ?? products?.length ?? 0}
              pageSize={pagination?.page_size ?? PRODUCTS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  );
}
