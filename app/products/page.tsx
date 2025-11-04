import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import SortDropdown from "@/components/SortDropdown";
import ProductsFilterDrawer from "@/components/ProductsFilterDrawer";

// Force dynamic rendering to avoid build-time database calls
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search, sort } = searchParams;

  // Build where clause
  const where: any = {
    isActive: true,
  };

  if (category) {
    where.category = {
      slug: category,
    };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Build orderBy
  let orderBy: any = { createdAt: "desc" };
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  } else if (sort === "name-asc") {
    orderBy = { name: "asc" };
  }

    // Fetch products with improved error handling
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    // If it's a connection error, set products to empty array
    if (error?.code === 'P1001' || error?.message?.includes('fetch failed')) {
      console.error("Database connection failed. Products will be empty.");
    }
  }

  // Fetch categories with improved error handling
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    // If it's a connection error, set categories to empty array
    if (error?.code === 'P1001' || error?.message?.includes('fetch failed')) {
      console.error("Database connection failed. Categories will be empty.");
    }
  }

  const selectedCategory = categories.find((c) => c.slug === category);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <p className="text-sm uppercase tracking-wider text-gray-500">
              {selectedCategory ? selectedCategory.name : "Our Collection"}
            </p>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-black mb-4">
            {selectedCategory ? selectedCategory.name : "All Products"}
          </h1>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
            {selectedCategory && ` in ${selectedCategory.name}`}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mobile Filter Drawer */}
      <ProductsFilterDrawer categories={categories} currentCategory={category} />
      
        <div className="flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-wider text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                      className={`block py-2 text-sm transition-colors ${
                    !category
                          ? "text-black font-medium"
                          : "text-gray-600 hover:text-black"
                  }`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                        className={`block py-2 text-sm transition-colors ${
                      category === cat.slug
                            ? "text-black font-medium"
                            : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-900 mb-4">Sort By</h3>
              <SortDropdown />
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {products.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-600 mb-6">No products found.</p>
                <Link
                  href="/products"
                  className="btn-modern inline-block"
                >
                  View All Products
                </Link>
            </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                    className="group block"
                >
                    <div className="aspect-[4/5] relative mb-4 bg-gray-50 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                      </div>
                    )}
                  </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 uppercase tracking-wider">{product.category.name}</p>
                      <h3 className="font-serif text-xl font-normal text-black group-hover:opacity-70 transition-opacity">
                      {product.name}
                    </h3>
                      <div className="flex items-baseline gap-3">
                        {product.discountPrice ? (
                          <>
                            <span className="text-lg text-black font-light">
                              {formatPrice(product.discountPrice)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg text-black font-light">
                            {formatPrice(product.price)}
                          </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
        </div>
      </div>
    </div>
  );
}
