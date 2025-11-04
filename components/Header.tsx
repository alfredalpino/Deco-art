"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('header')) {
        setIsMenuOpen(false);
      }
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isMenuOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isUserMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-serif text-xl md:text-2xl font-normal text-black hover:opacity-70 transition-opacity"
          >
              Deco-Art
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
            <Link 
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-normal transition-opacity hover:opacity-70 ${
                    isActive ? 'text-black' : 'text-gray-600'
                  }`}
                >
                  {link.label}
            </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Search (desktop) */}
            <div className="hidden lg:block">
                <input
                  type="text"
                  placeholder="Search"
                className="w-40 px-3 py-2 text-sm bg-transparent border-b border-gray-300 focus:border-black focus:outline-none transition-colors placeholder:text-gray-400"
                  />
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-black transition-colors"
              aria-label="Shopping cart"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Menu */}
            {session ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                  aria-label="User menu"
                >
                  <span className="hidden xl:inline text-sm">{session.user?.name || session.user?.email}</span>
                  <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                  <svg
                      className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  </div>
                </button>
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg py-2 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      {(session.user as any)?.role === "admin" && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-black hover:opacity-70 transition-opacity"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-4">
                <span className={`absolute top-0 left-0 w-full h-px bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : ''
                }`}></span>
                <span className={`absolute top-2 left-0 w-full h-px bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute bottom-0 left-0 w-full h-px bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 bottom-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 top-16 z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div 
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl overflow-y-auto">
            <div className="flex flex-col pt-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
              <Link
                    key={link.href}
                    href={link.href}
                    className={`px-8 py-4 text-base font-normal border-b border-gray-100 transition-colors ${
                      isActive ? 'text-black bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                onClick={() => setIsMenuOpen(false)}
              >
                    {link.label}
              </Link>
                );
              })}
              <div className="px-8 pt-6">
                  <input
                    type="text"
                    placeholder="Search products..."
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded focus:border-black focus:outline-none transition-colors placeholder:text-gray-400"
                    />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
