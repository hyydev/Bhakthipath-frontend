import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`
        ${isDark ? 'bg-[#0A1628] text-white' : 'bg-[#F7FAFF] text-[#3A0519]'}
        py-12 mt-12 transition-colors duration-500
      `}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">BhaktiVerse</h3>
          <p className={isDark ? "text-gray-300" : "text-gray-700"}>
            A spiritual e-commerce platform delivering divine products with fast q-commerce experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className={`flex flex-col gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <li>About Us</li>
            <li>My Orders</li>
            <li>Categories</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className={isDark ? "text-gray-300" : "text-gray-700"}>
            <li>Email: support@bhaktiverse.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Vrindavan, India</li>
          </ul>
        </div>

      </div>

      <p className={`text-center mt-10 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        © {new Date().getFullYear()} BhaktiVerse — All Rights Reserved
      </p>
    </footer>
  );
}
