import { Button, Badge, Heading, Text } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Puja Items",
    img: "/images/puja.jpg",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Books",
    img: "/images/books.jpg",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Clothing",
    img: "/images/clothing.jpg",
    color: "from-pink-400 to-red-500",
  },
  {
    name: "Accessories",
    img: "/images/accessories.jpg",
    color: "from-green-400 to-teal-500",
  },
];

const products = [
  {
    name: "Tulsi Mala",
    price: "₹199",
    img: "/images/tulsi-mala.jpg",
    badge: "Bestseller",
  },
  {
    name: "Bhagavad Gita",
    price: "₹299",
    img: "/images/gita.jpg",
    badge: "Classic",
  },
  {
    name: "Kurta Pajama",
    price: "₹799",
    img: "/images/kurta.jpg",
    badge: "New",
  },
  {
    name: "Japa Bag",
    price: "₹149",
    img: "/images/japa-bag.jpg",
    badge: "Popular",
  },
];

export default function EcommerceHomePage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative w-full flex items-center justify-center py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="primary" size="md" className="mb-6 animate-fade-in">
            🛍️ Welcome to BhakthiVerse Store
          </Badge>
          <Heading level={1} className="mb-4 animate-slide-up">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-heading">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() =>
                navigate(
                  `/category/${cat.name.toLowerCase().replace(/\s/g, "-")}`
                )
              }
              className={`
                cursor-pointer rounded-3xl shadow-lg overflow-hidden group transition-transform duration-300 hover:scale-105
                bg-gradient-to-br ${cat.color}
              `}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-40 object-cover group-hover:opacity-80 transition"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-white drop-shadow">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Heading level={2} className="mb-8 text-center">
          Featured Products
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((prod) => (
            <div
              key={prod.name}
              className="bg-white/80 dark:bg-[#0A1628]/80 rounded-2xl shadow-lg p-4 flex flex-col items-center animate-fade-in"
            >
              <img
                src={prod.img}
                alt={prod.name}
                className="w-32 h-32 object-contain mb-4 rounded-xl"
              />
              <Badge variant="primary" size="sm" className="mb-2">
                {prod.badge}
              </Badge>
              <h4 className="text-lg font-semibold mb-1 text-[#3A0519] dark:text-[#93C5FD]">
                {prod.name}
              </h4>
              <Text
                size="lg"
                className="font-bold text-[#6A092F] dark:text-amber-300"
              >
                {prod.price}
              </Text>
              <Button variant="gradient" size="sm" className="mt-3 w-full">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
