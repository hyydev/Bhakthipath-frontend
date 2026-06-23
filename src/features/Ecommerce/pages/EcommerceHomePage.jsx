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
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useProductCategories } from "../hooks/useProductCategories";
import { useCart } from "../../EcommerceCart/hooks/useCart";
import { useSmoothScroll } from "../../../app/SmoothScrollProvider";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../lib/utils";

const PRODUCTS_PER_PAGE = 8;
const HEADER_OFFSET = -80;

export default function EcommerceHomePage() {
  // search
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const debouncedSearch = useDebounce(searchQuery, 300);


  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const [page, setPage] = useState(1);
  const { products, pagination, isLoading, isError } = useProducts({
    page,
    page_size: PRODUCTS_PER_PAGE,
    search:debouncedSearch || undefined,
    
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
      <section className="relative w-full flex items-center justify-center py-16 md:py-24">
        <RevealOnScroll className="text-center max-w-3xl mx-auto">
          <Badge variant="golden" size="md" className="mb-6 animate-fade-in">
            🛍️✨ Welcome to BhakthiVerse Store
          </Badge>
          <Heading level={1} className="mb-4 animate-slide-up">
            <span
              className="
                bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 
                bg-clip-text text-transparent 
                font-heading
                text-display-md md:text-display-lg lg:text-display-xl
                font-extrabold
                tracking-tight
              "
            >
              Spiritual Shopping, Divine Living
            </span>
          </Heading>
          <Text size="xl" className="mb-8 animate-slide-up">
            Explore authentic spiritual products, sacred books, devotional
            clothing, and more—delivered with love and blessings.
          </Text>
          <Button
            variant="gradient"
            size="lg"
            className="animate-fade-in"
            onClick={() =>
              scrollTo("#featured-products", { offset: HEADER_OFFSET })
            }
          >
            Shop Now
          </Button>
        </RevealOnScroll>
      </section>

      {/* Categories Pager Section */}
      <section className="max-w-7xl mx-auto px-4 py-10 overflow-hidden">
        <RevealOnScroll>
          <Heading level={2} className="mb-8 text-center">
            Shop by Category
          </Heading>
        </RevealOnScroll>

        {categoriesLoading ? (
          <Text className="text-center">Loading categories...</Text>
        ) : (
          <RevealOnScroll delay={0.1}>
            <Pager>
              {categories?.map((cat) => (
                <PagerItem key={cat.id}>
                  <div
                    onClick={() => navigate(`/category/${cat.slug}`)}
                    className="
                      cursor-pointer rounded-3xl shadow-lg overflow-hidden group 
                      transition-transform duration-300 hover:scale-105 
                      bg-gradient-to-br from-yellow-400 to-orange-500 p-6 h-full
                    "
                  >
                    <div className="text-center flex h-full items-center justify-center min-h-[100px]">
                      <h3 className="text-xl font-bold text-white drop-shadow">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </PagerItem>
              ))}
            </Pager>
          </RevealOnScroll>
        )}
      </section>

      {/* Featured Products */}
      <section
        id="featured-products"
        className="max-w-7xl mx-auto px-4 py-10 scroll-mt-24"
      >
        <RevealOnScroll>
          <Heading level={2} className="mb-8 text-center">
            Featured Products
          </Heading>
        </RevealOnScroll>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="bg-white/40 dark:bg-[#0A1628]/40 rounded-2xl h-64 animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <Text className="text-center text-red-500">
            Failed to load products.
          </Text>
        ) : products?.length === 0 ? (
          <Text className="text-center">No products available yet.</Text>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
