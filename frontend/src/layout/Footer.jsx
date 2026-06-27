import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { FaInstagram, FaYoutube, FaFacebook, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const linkClass = isDark
    ? 'text-gray-400 hover:text-amber-200 transition-colors duration-200'
    : 'text-ink-600 hover:text-saffron-700 transition-colors duration-200';

  return (
    <footer
      data-testid="main-footer"
      className={`
        relative mt-24 overflow-hidden
        ${isDark
          ? 'bg-[#070F1F] text-white border-t border-white/[0.06]'
          : 'bg-ivory-100/80 text-ink-900 border-t border-saffron-200/40'
        }
      `}
    >
      {/* Top accent line */}
      <div className={`h-[2px] w-full ${isDark
        ? 'bg-gradient-to-r from-transparent via-primary-500/60 to-transparent'
        : 'bg-gradient-to-r from-transparent via-saffron-400/80 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${isDark
                  ? 'bg-gradient-to-br from-primary-500/30 to-purple-500/30 border border-primary-400/40'
                  : 'bg-gradient-to-br from-saffron-100 to-gold-200 border border-saffron-300/70'
                }`}>
                <svg viewBox="0 0 24 24" className={`w-6 h-6 ${isDark ? 'text-primary-300' : 'text-saffron-700'}`} fill="currentColor">
                  <path d="M12 2C9 5 8 8 8 10c0 1 0 2 1 3-2 0-4-1-5-3 0 3 2 6 5 7-2 1-4 1-6 0 2 2 5 3 7 3v2h2v-2c2 0 5-1 7-3-2 1-4 1-6 0 3-1 5-4 5-7-1 2-3 3-5 3 1-1 1-2 1-3 0-2-1-5-4-8z" />
                </svg>
              </div>
              <span className="text-2xl font-display font-extrabold tracking-tight">
                Bhakthi<span className={isDark ? 'bg-gradient-to-r from-primary-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent' : 'text-saffron-gradient'}>Verse</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-ink-600'}`}>
              A sacred marketplace for devotional living — curated spiritual products delivered with love and blessings.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {[FaInstagram, FaYoutube, FaFacebook, FaXTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110
                    ${isDark
                      ? 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-gray-300 hover:text-white'
                      : 'bg-white/80 hover:bg-saffron-100 border border-saffron-200 text-ink-700 hover:text-saffron-700 shadow-sm'
                    }`}
                  aria-label="social"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className={`text-sm font-display font-semibold uppercase tracking-[0.18em] mb-5 ${isDark ? 'text-amber-200' : 'text-saffron-700'}`}>
              Shop
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className={linkClass}>Puja Items</a></li>
              <li><a href="#" className={linkClass}>Sacred Books</a></li>
              <li><a href="#" className={linkClass}>Devotional Wear</a></li>
              <li><a href="#" className={linkClass}>Malas & Jewellery</a></li>
              <li><a href="#" className={linkClass}>All Categories</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`text-sm font-display font-semibold uppercase tracking-[0.18em] mb-5 ${isDark ? 'text-amber-200' : 'text-saffron-700'}`}>
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className={linkClass}>About Us</a></li>
              <li><a href="#" className={linkClass}>My Orders</a></li>
              <li><a href="#" className={linkClass}>Shipping & Returns</a></li>
              <li><a href="#" className={linkClass}>Privacy Policy</a></li>
              <li><a href="#" className={linkClass}>Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`text-sm font-display font-semibold uppercase tracking-[0.18em] mb-5 ${isDark ? 'text-amber-200' : 'text-saffron-700'}`}>
              Contact
            </h3>
            <ul className={`flex flex-col gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-ink-600'}`}>
              <li className="flex items-start gap-2"><Mail size={15} className="mt-0.5 shrink-0" /> support@bhaktiverse.com</li>
              <li className="flex items-start gap-2"><Phone size={15} className="mt-0.5 shrink-0" /> +91 98765 43210</li>
              <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> Vrindavan, India</li>
            </ul>

            {/* Newsletter mini */}
            <div className="mt-5">
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-300' : 'text-ink-700'}`}>
                Stay blessed
              </p>
              <div className={`flex items-center gap-2 p-1 rounded-full
                ${isDark ? 'bg-white/[0.06] border border-white/10' : 'bg-white border border-ink-200 shadow-sm'}`}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`bg-transparent flex-1 px-3 py-1.5 text-xs outline-none
                    ${isDark ? 'text-white placeholder:text-gray-500' : 'text-ink-900 placeholder:text-ink-400'}`}
                />
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                    ${isDark
                      ? 'bg-primary-500 hover:bg-primary-400 text-white'
                      : 'bg-saffron-600 hover:bg-saffron-500 text-white shadow-sacred'
                    }`}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className={`mt-14 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3 text-xs
          ${isDark ? 'border-white/10 text-gray-500' : 'border-ink-100 text-ink-500'}`}>
          <p>© {new Date().getFullYear()} BhakthiVerse — All Rights Reserved</p>
          <p className="flex items-center gap-1.5">
            <Sparkles size={12} className={isDark ? 'text-amber-300' : 'text-saffron-500'} />
            Made with devotion in Vrindavan
          </p>
        </div>
      </div>
    </footer>
  );
}
