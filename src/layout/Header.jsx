import {ShoppingCart,User} from "lucide-react";



export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">

        {/* Logo */}
        <div className="text-2xl font-bold text-[#6A092F]">
          BhaktiVerse
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search books, categories…"
            className="w-full border px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#6A092F] outline-none"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-lg font-medium">
          <button><ShoppingCart color="#6A092F"/></button>
          <button><User color="#6A092F"/></button>
        </div>
      </div>
    </header>
  );
}
