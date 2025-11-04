import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

// Force dynamic rendering to avoid build-time database calls
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch categories with images - with improved error handling
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

  // Fetch featured products - with improved error handling
  let featuredProducts: any[] = [];
  try {
    featuredProducts = await prisma.product.findMany({
      where: {
        featured: true,
        isActive: true,
      },
      take: 4,
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error: any) {
    console.error("Error fetching featured products:", error);
    // If it's a connection error, set featuredProducts to empty array
    if (error?.code === 'P1001' || error?.message?.includes('fetch failed')) {
      console.error("Database connection failed. Featured products will be empty.");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Minimal */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal mb-6 tracking-tight text-black">
            Timeless
              <br />
            Craftsmanship
            </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Handcrafted furniture pieces that blend traditional artistry with contemporary design
            </p>
              <Link
                href="/products"
            className="btn-modern inline-block"
              >
                Explore Collection
              </Link>
        </div>
      </section>

      {/* Featured Products - Clean Grid */}
      {featuredProducts.length > 0 && (
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Featured</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-black">
                Selected Pieces
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {featuredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] relative mb-6 bg-gray-50 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2}
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
                    <h3 className="font-serif text-2xl font-normal text-black group-hover:opacity-70 transition-opacity">
                      {product.name}
                    </h3>
                    <p className="text-lg text-black font-light">
                      {product.discountPrice ? formatPrice(product.discountPrice) : formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories - Minimal Grid */}
      {categories.length > 0 && (
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Collections</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-black">
                Explore by Category
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group block"
                >
                  <div className="aspect-square relative mb-4 bg-white overflow-hidden border border-gray-200">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-center font-serif text-lg font-normal text-black group-hover:opacity-70 transition-opacity">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Minimal */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal mb-6">
            Begin Your Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            Discover pieces that reflect your style and stand the test of time
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-gray-100 transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </section>
    </main>
  );
}
