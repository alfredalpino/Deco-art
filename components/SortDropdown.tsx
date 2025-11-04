"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "newest";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <select
      value={sort}
      onChange={(e) => handleSortChange(e.target.value)}
      className="w-full px-4 py-3 text-base sm:text-sm border border-[#e8e5dd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] bg-white text-[#0a0a0a] touch-manipulation min-h-[44px]"
    >
      <option value="newest">Newest First</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A to Z</option>
    </select>
  );
}
