import { useTheme } from "../../../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductCategories } from "../../Ecommerce/hooks/useProductCategories";
import { Sparkles, BookOpen, Shirt, Gem, Package, Layers } from "lucide-react";
import { useState } from "react";

// Static decorative icons for category labels (mapped by keyword)
const iconFor = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("book")) return BookOpen;
  if (n.includes("cloth") || n.includes("kurta")) return Shirt;
  if (n.includes("acces") || n.includes("mala") || n.includes("jewel")) return Gem;
  if (n.includes("puja") || n.includes("ritual") || n.includes("worship")) return Sparkles;
  return Package;
};

const fallbackLinks = [
  { name: "Puja Items", slug: "puja-items" },
  { name: "Books", slug: "books" },
  { name: "Clothing", slug: "clothing" },
  { name: "Accessories", slug: "accessories" },
  { name: "More", slug: "more" },
];

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useProductCategories();
  const [hoverIdx, setHoverIdx] = useState(null);

  const links =
    categories && categories.length > 0
      ? categories.slice(0, 6).map((c) => ({ name: c.name, slug: c.slug }))
      : fallbackLinks;

  return (
    <nav
      data-testid="main-navbar"
      className={`
        w-full sticky top-[64px] sm:top-[72px] z-40 transition-all duration-500
        ${isDark
          ? "bg-[#0A1628]/60 backdrop-blur-2xl border-b border-white/[0.06]"
          : "bg-ivory-50/70 backdrop-blur-2xl border-b border-saffron-200/30"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
        <div
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2.5 relative"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* All categories quick link */}
          <button
            type="button"
            onClick={() => navigate("/ecommerce")}
            data-testid="nav-all-link"
            className={`group flex items-center gap-1.5 px-3 py-2 rounded-full font-body text-sm font-semibold whitespace-nowrap transition-all duration-300
              ${location.pathname === "/ecommerce"
                ? (isDark
                    ? "bg-white/[0.08] text-white border border-white/15"
                    : "bg-saffron-100 text-saffron-800 border border-saffron-300")
                : (isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                    : "text-ink-700 hover:text-saffron-800 hover:bg-saffron-50")
              }
            `}
          >
            <Layers size={15} />
            <span>All</span>
          </button>

          {links.map((link, idx) => {
            const Icon = iconFor(link.name);
            const isActive = location.pathname === `/category/${link.slug}`;
            const isHover = hoverIdx === idx;

            return (
              <button
                key={link.slug}
                type="button"
                onClick={() => navigate(`/category/${link.slug}`)}
                data-testid={`nav-link-${link.slug}`}
                onMouseEnter={() => setHoverIdx(idx)}
                className={`relative group flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-body text-sm font-semibold whitespace-nowrap transition-all duration-300
                  ${isActive
                    ? (isDark
                        ? "bg-white/[0.10] text-white border border-white/15 shadow-[0_0_18px_rgba(59,130,246,0.18)]"
                        : "bg-gradient-to-r from-saffron-100 to-gold-100 text-saffron-800 border border-saffron-300 shadow-sacred")
                    : (isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                        : "text-ink-700 hover:text-saffron-800 hover:bg-saffron-50")
                  }
                `}
              >
                <Icon size={15} className={`transition-transform duration-300 ${isHover ? "rotate-[8deg] scale-110" : ""}`} />
                <span>{link.name}</span>

                {/* Underline indicator */}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-[3px] h-[2px] rounded-full transition-all duration-300
                    ${isActive || isHover
                      ? (isDark ? "w-7 bg-primary-400" : "w-7 bg-saffron-500")
                      : "w-0 bg-transparent"
                    }`}
                />
              </button>
            );
          })}
        </div>

        {/* Promo strip (premium touch) */}
        <div className={`hidden lg:flex items-center gap-2 pr-2 text-xs font-medium
          ${isDark ? "text-amber-200/80" : "text-saffron-700"}
        `}>
          <Sparkles size={14} className={isDark ? "text-amber-300" : "text-saffron-500"} />
          <span>Free shipping over ₹500</span>
        </div>
      </div>
    </nav>
  );
}
