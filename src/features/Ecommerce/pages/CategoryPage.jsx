import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Badge,
  Heading,
  Text,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui";

const categories = [
  {
    slug: "puja-items",
    name: "Puja Items",
    img: "/images/puja.jpg",
    color: "from-yellow-400 to-orange-500",
  },
  {
    slug: "books",
    name: "Books",
    img: "/images/books.jpg",
    color: "from-blue-400 to-indigo-500",
  },
  {
    slug: "clothing",
    name: "Clothing",
    img: "/images/clothing.jpg",
    color: "from-pink-400 to-red-500",
  },
  {
    slug: "accessories",
    name: "Accessories",
    img: "/images/accessories.jpg",
    color: "from-green-400 to-teal-500",
  },
];

// Static products mapped to categories (UI-only, you can replace later)
const productsByCategory = {
  "puja-items": [
    {
      id: "puja-1",
      name: "Tulsi Mala",
      price: 199,
      img: "/images/tulsi-mala.jpg",
      badge: "Bestseller",
    },
    {
      id: "puja-2",
      name: "Premium Puja Bell",
      price: 399,
      img: "/images/premium_brass_puja_bell.jpg",
      badge: "Popular",
    },
    {
      id: "puja-3",
      name: "Chandan Sticks (Pack)",
      price: 149,
      img: "/images/4_Pc_Original_Gopi_Chandan_Sticks_Light_Yellow_Pooja_Tika_Tilak_1_5.jpg",
      badge: "New",
    },
  ],
  books: [
    {
      id: "book-1",
      name: "Bhagavad Gita",
      price: 299,
      img: "/images/gita.jpg",
      badge: "Classic",
    },
    {
      id: "book-2",
      name: "Srimad Bhagavatam (Set)",
      price: 799,
      img: "/images/books.jpg",
      badge: "Recommended",
    },
  ],
  clothing: [
    {
      id: "cloth-1",
      name: "Kurta Pajama",
      price: 799,
      img: "/images/kurta.jpg",
      badge: "New",
    },
  ],
  accessories: [
    {
      id: "acc-1",
      name: "Japa Bag",
      price: 149,
      img: "/images/japa-bag.jpg",
      badge: "Popular",
    },
    {
      id: "acc-2",
      name: "Tulsi Beads (Small)",
      price: 199,
      img: "/images/tulsi-mala.jpg",
      badge: "Bestseller",
    },
  ],
};

function toCurrency(n) {
  return `₹${n}`;
}

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const category = useMemo(
    () => categories.find((c) => c.slug === slug),
    [slug]
  );

  const products = useMemo(() => {
    const key = slug || "";
    return productsByCategory[key] || [];
  }, [slug]);

  return (
    <div className="w-full px-4 py-4">
      {/* Header / Breadcrumb */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/ecommerce")}
          >
            ← Back
          </Button>
          {category ? (
            <Badge variant="golden" size="md" className="py-2">
              {category.name}
            </Badge>
          ) : (
            <Badge variant="golden" size="md" className="py-2">
              Category
            </Badge>
          )}
        </div>

        {/* Category Banner */}
        {category && (
          <div
            className={
              "rounded-3xl overflow-hidden border border-white/10 shadow-xl " +
              `bg-gradient-to-br ${category.color} px-6 py-10`
            }
          >
            <div className="flex items-center gap-6 flex-wrap">
              <div className="min-w-[220px] flex-1">
                <Heading level={2} className="text-white">
                  {category.name}
                </Heading>
                <Text className="text-white/90 mt-2">
                  Explore our curated selection.
                </Text>
              </div>
              <div className="w-56 h-32 rounded-2xl overflow-hidden bg-white/10">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto mt-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Heading level={2}>Products</Heading>
          <Text className="text-gray-400">
            {products.length} item{products.length === 1 ? "" : "s"}
          </Text>
        </div>

        {products.length === 0 ? (
          <Card variant="glass" className="p-10">
            <CardHeader>
              <CardTitle>No products found</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-gray-300">
                This category page is available, but currently there are no static
                products mapped.
              </Text>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <Card
                key={prod.id}
                variant="glass"
                className="p-4 hover:border-white/20 transition"
              >
                <div className="flex flex-col items-center">
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-32 h-32 object-contain rounded-xl bg-white/5 p-2"
                      onError={(e) => (e.target.src = "/placeholder-product.jpg")}
                    />
                  </div>

                  <div className="mt-3 w-full">
                    <Badge variant="primary" size="sm" className="mb-2">
                      {prod.badge}
                    </Badge>
                    <Text className="text-white font-semibold line-clamp-2">
                      {prod.name}
                    </Text>
                    <Text className="mt-2 block text-primary-400 font-bold">
                      {toCurrency(prod.price)}
                    </Text>

                    <Button
                      variant="gradient"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => {
                        // UI-only for now
                        // Add-to-cart will be connected later
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

