import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="font-serif text-2xl font-normal text-black">Deco-Art</h3>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Handcrafted furniture pieces that blend traditional artistry with contemporary design.
            </p>
            <p className="text-xs text-gray-500">
              Jagrani, Lucknow
              <br />
              Uttar Pradesh, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-6 text-gray-900">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                </Link>
              </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-6 text-gray-900">
              Collections
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/products?category=tables", label: "Tables" },
                { href: "/products?category=dining-sets", label: "Dining Sets" },
                { href: "/products?category=sofa-sets", label: "Sofa Sets" },
                { href: "/products?category=beds", label: "Beds" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                </Link>
              </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-6 text-gray-900">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                Phone: <span className="text-gray-500">+91 XXXX XXXXXX</span>
              </li>
              <li>
                <a 
                  href="mailto:info@decoartfurniture.com" 
                  className="hover:text-black transition-colors"
                >
                  info@decoartfurniture.com
                </a>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-black transition-colors"
                >
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} Deco-Art Furniture. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <Link 
                href="/privacy" 
                className="hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-black transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
