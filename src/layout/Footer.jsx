export default function Footer() {
  return (
    <footer className="bg-[#3A0519] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">BhaktiVerse</h3>
          <p className="text-gray-300">
            A spiritual e-commerce platform delivering divine products with fast q-commerce experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>About Us</li>
            <li>My Orders</li>
            <li>Categories</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="text-gray-300">
            <li>Email: support@bhaktiverse.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Vrindavan, India</li>
          </ul>
        </div>

      </div>

      <p className="text-center text-gray-400 mt-10 text-sm">
        © {new Date().getFullYear()} BhaktiVerse — All Rights Reserved
      </p>
    </footer>
  );
}
