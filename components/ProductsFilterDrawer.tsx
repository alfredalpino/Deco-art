"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SortDropdown from "./SortDropdown";

interface ProductsFilterDrawerProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  currentCategory?: string;
}

export default function ProductsFilterDrawer({ categories, currentCategory }: ProductsFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-30 bg-[#0a0a0a] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#d4af37] active:bg-[#d4af37] transition-all duration-300 touch-manipulation min-h-[52px] flex items-center gap-2 font-medium text-sm"
        aria-label="Open filters"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </button>

      {/* Drawer Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transform transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Drawer Content */}
      <div
        className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0a0a0a]">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#2c2c2c] hover:text-[#d4af37] active:text-[#d4af37] transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close filters"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-[#0a0a0a]">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center ${
                    !currentCategory
                      ? "bg-[#d4af37] text-[#0a0a0a] font-medium"
                      : "text-[#2c2c2c] hover:bg-[#faf8f3] active:bg-[#faf8f3]"
                  }`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 rounded-lg transition-colors touch-manipulation min-h-[48px] flex items-center ${
                      currentCategory === cat.slug
                        ? "bg-[#d4af37] text-[#0a0a0a] font-medium"
                        : "text-[#2c2c2c] hover:bg-[#faf8f3] active:bg-[#faf8f3]"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#0a0a0a]">Sort By</h3>
            <SortDropdown />
          </div>
        </div>
      </div>
    </>
  );
}

