import { useParams, useNavigate } from "react-router-dom"
import { Heading, Text, Button } from "../../../components/ui"
import { useProductCategories } from "../hooks/useProductCategories"
import { useProductsByCategory } from "../hooks/useProductsByCategory"

import ProductCard from "../components/ProductCard"

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { categories } = useProductCategories()
  const category = categories?.find((cat) => cat.slug === slug)

  const { products, isLoading, isError } = useProductsByCategory(category?.id)

  const handleAddToCart = (productId) => {
    console.log("Add to cart:", productId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Button variant="outline" size="sm" onClick={() => navigate("/ecommerce")} className="mb-6">
        ← Back
      </Button>

      <Heading level={2} className="mb-8 text-center">
        {category?.name || "Category"}
      </Heading>

      {isLoading ? (
        <Text className="text-center">Loading products...</Text>
      ) : isError ? (
        <Text className="text-center text-red-500">Failed to load products.</Text>
      ) : products?.length === 0 ? (
        <Text className="text-center">No products found in this category.</Text>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  )
}