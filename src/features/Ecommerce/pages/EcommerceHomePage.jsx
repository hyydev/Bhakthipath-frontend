import { useState } from "react";
import {
  Button,
  Badge,
  Heading,
  Text,
  Pager,
  PagerItem,
  Pagination,
} from "../../../components/ui";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useProductCategories } from "../hooks/useProductCategories";
import { useCart } from "../../EcommerceCart/hooks/useCart";
import { useSmoothScroll } from "../../../app/SmoothScrollProvider";
import ProductCard from "../components/ProductCard";
import { useDebounce } from "../../../lib/utils";
import { Sparkles } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const PRODUCTS_PER_PAGE = 8;
const HEADER_OFFSET = -80;

export default function EcommerceHomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const debouncedSearch = useDebounce(searchQuery, 300);

  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [page, setPage] = useState(1);
  const { products, pagination, isLoading, isError } = useProducts({
    page,
    page_size: PRODUCTS_PER_PAGE,
    search: debouncedSearch || undefined,
  });
  const { categories, isLoading: categoriesLoading } = useProductCategories();
  const { addCart, isInCart } = useCart();

  const handleAddToCart = (productId) => {
    addCart({ items: [{ product_id: productId, quantity: 1 }] });
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    scrollTo("#featured-products", { offset: HEADER_OFFSET });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center py-20 md:py-28">
        <RevealOnScroll className="text-center max-w-3xl mx-auto px-4">
          <Badge variant="golden" size="md" className="mb-6 animate-fade-in">
            <Sparkles size={14} className="mr-1.5" />
            Welcome to BhakthiVerse Store
          </Badge>
          <Heading level={1} className="mb-6 animate-slide-up">
            <span
              className={
                isDark
                  ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-display tracking-tight"
                  : "text-saffron-gradient font-display tracking-tight"
              }
            >
              Spiritual Shopping,
              <br />
              Divine Living
            </span>
          </Heading>
          <Text size="xl" className="mb-10 animate-slide-up text-ink-700 dark:text-gray-300">
            Explore authentic spiritual products, sacred books, devotional
            clothing, and more—delivered with love and blessings.
          </Text>
          <Button
            variant="gradient"
            size="lg"
            data-testid="shop-now-button"
            className="animate-fade-in"
            onClick={() => scrollTo("#featured-products", { offset: HEADER_OFFSET })}
          >
            Shop Now
            <Sparkles size={18} />
          </Button>
        </RevealOnScroll>
      </section>

      {/* Categories Pager Section */}
      <section className="max-w-7xl mx-auto px-4 py-10 overflow-hidden">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-saffron-700 dark:text-primary-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
                Curated Collections
              </p>
              <Heading level={3}>Shop by Category</Heading>
            </div>
          </div>
        </RevealOnScroll>

        {categoriesLoading ? (
          <Text className="text-center">Loading categories...</Text>
        ) : (
          <RevealOnScroll delay={0.1}>
            <Pager>
              {categories?.map((cat, i) => (
                <PagerItem key={cat.id}>
                  <button
                    type="button"
                    data-testid={`category-card-${cat.slug}`}
                    onClick={() => navigate(`/category/${cat.slug}`)}
                    className={`
                      w-full cursor-pointer rounded-2xl overflow-hidden group relative
                      transition-all duration-500 hover:-translate-y-1
                      h-full p-6 text-left
                      ${isDark
                        ? "bg-gradient-to-br from-primary-500/15 via-purple-500/10 to-cyan-500/10 border border-primary-400/25 hover:border-primary-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
                        : "bg-gradient-to-br from-saffron-50 via-ivory-100 to-gold-100 border border-saffron-200/70 hover:border-saffron-400 shadow-sacred hover:shadow-sacred-lg"
                      }
                    `}
                  >
                    {/* Decorative corner ornament */}
                    <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full transition-all duration-500 group-hover:scale-125
                      ${isDark
                        ? "bg-primary-500/15 blur-2xl"
                        : "bg-saffron-300/30 blur-2xl"
                      }`}
                    />
                    <div className="relative flex items-center justify-between min-h-[110px]">
                      <h3 className={`text-xl font-display font-bold leading-tight ${isDark ? "text-white" : "text-ink-900"}`}>
                        {cat.name}
                      </h3>
                      <span
                        className={`shrink-0 ml-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-1
                          ${isDark
                            ? "bg-white/10 text-primary-300 border border-primary-400/30"
                            : "bg-white text-saffron-700 border border-saffron-300 shadow-sacred"
                          }
                        `}
                      >
                        →
                      </span>
                    </div>
                  </button>
                </PagerItem>
              ))}
            </Pager>
          </RevealOnScroll>
        )}
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 py-10 scroll-mt-24">
        <RevealOnScroll>
          <div className="text-center mb-10">
            <p className="text-saffron-700 dark:text-primary-400 font-semibold uppercase tracking-[0.18em] text-xs mb-2">
              Trending Now
            </p>
            <Heading level={3}>Featured Products</Heading>
          </div>
        </RevealOnScroll>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="bg-white/70 dark:bg-[#0A1628]/40 border border-ink-100 dark:border-white/10 rounded-2xl h-72 animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <Text className="text-center text-red-500">Failed to load products.</Text>
        ) : products?.length === 0 ? (
          <Text className="text-center">No products available yet.</Text>
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
    </>
  );
}
