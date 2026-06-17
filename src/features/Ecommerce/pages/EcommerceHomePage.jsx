import { Button, Badge, Heading, Text } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useProductCategories } from "../hooks/useProductCategories";
import ProductCard from "../components/ProductCard";

export default function EcommerceHomePage() {
  const navigate = useNavigate();
  const { products, isLoading, isError } = useProducts();
  const { categories, isLoading: categoriesLoading } = useProductCategories();

  const handleAddToCart = (productId) => {
    console.log("Add to cart:", productId);
    // Cart feature mein wire karenge baad mein
  };

  return (
    <>
      <section className="relative w-full flex items-center justify-center py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
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
          <Button variant="gradient" size="lg" className="animate-fade-in">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Heading level={2} className="mb-8 text-center">
          Shop by Category
        </Heading>
        {categoriesLoading ? (
          <Text className="text-center">Loading categories...</Text>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories?.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="cursor-pointer rounded-3xl shadow-lg overflow-hidden group transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-yellow-400 to-orange-500 p-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white drop-shadow">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}

      <section className="max-w-7xl mx-auto px-4 py-10">
        <Heading level={2} className="mb-8 text-center">
          Featured Products
        </Heading>

        {isLoading ? (
          <Text className="text-center">Loading products...</Text>
        ) : isError ? (
          <Text className="text-center text-red-500">
            Failed to load products.
          </Text>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
