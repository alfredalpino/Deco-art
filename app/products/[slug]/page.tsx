import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

// Force dynamic rendering to avoid build-time database calls
export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
    let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
      },
    });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    // If it's a connection error, product will be null and we'll show 404
    if (error?.code === 'P1001' || error?.message?.includes('fetch failed')) {
      console.error("Database connection failed.");
    }
  }

  if (!product || !product.isActive) {
    notFound();
  }

  let relatedProducts: any[] = [];
  try {
    relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        isActive: true,
      },
      take: 4,
    });
  } catch (error: any) {
    console.error("Error fetching related products:", error);
    // If it's a connection error, relatedProducts will be empty array
    if (error?.code === 'P1001' || error?.message?.includes('fetch failed')) {
      console.error("Database connection failed. Related products will be empty.");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link 
              href={`/products?category=${product.category.slug}`} 
              className="hover:text-black transition-colors capitalize"
            >
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Product Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] relative bg-gray-50 overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
              </div>
            )}
          </div>
            
            {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square relative bg-gray-50 overflow-hidden border border-gray-200 hover:border-black transition-colors cursor-pointer"
                  >
                  <Image 
                    src={image} 
                    alt={`${product.name} ${index + 2}`} 
                    fill 
                    className="object-cover" 
                      sizes="(max-width: 640px) 25vw, 20vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
          <div className="space-y-8">
            {/* Category */}
        <div>
            <Link
              href={`/products?category=${product.category.slug}`}
                className="inline-block text-sm uppercase tracking-wider text-gray-500 hover:text-black transition-colors mb-4"
            >
              {product.category.name}
            </Link>
          </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-black leading-tight">
              {product.name}
            </h1>
          
            {/* Price */}
            <div className="flex items-baseline gap-6 pb-6 border-b border-gray-200">
            {product.discountPrice ? (
                <div className="flex items-baseline gap-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-5xl font-normal text-black">
                    {formatPrice(product.discountPrice)}
                  </span>
                    <span className="text-2xl text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </div>
                  <span className="px-3 py-1 bg-black text-white text-xs font-medium uppercase">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
                <span className="text-4xl md:text-5xl font-normal text-black">
                  {formatPrice(product.price)}
                </span>
            )}
          </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-black' : 'bg-gray-400'}`}></div>
              <p className="text-sm text-gray-600">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
              </p>
            </div>

            {/* Add to Cart */}
            <div>
              <AddToCartButton productId={product.id} disabled={product.stock === 0} />
            </div>

            {/* Description */}
            {product.description && (
              <div className="pt-8 border-t border-gray-200">
                <h2 className="font-serif text-2xl font-normal mb-4 text-black">Description</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {product.description}
                </p>
            </div>
          )}

            {/* Specifications */}
          {product.specs && typeof product.specs === "object" && (
              <div className="pt-8 border-t border-gray-200">
                <h2 className="font-serif text-2xl font-normal mb-6 text-black">Specifications</h2>
                <dl className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 last:border-0">
                      <dt className="text-sm uppercase tracking-wider text-gray-500">
                        {key}
                      </dt>
                      <dd className="text-sm text-black">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-gray-200">
            <div className="mb-12">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                You May Also Like
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-black">
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.slug}`}
                  className="group block"
              >
                  <div className="aspect-[4/5] relative mb-4 bg-gray-50 overflow-hidden">
                  {relatedProduct.images && relatedProduct.images.length > 0 ? (
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                    <h3 className="font-serif text-lg font-normal text-black group-hover:opacity-70 transition-opacity">
                    {relatedProduct.name}
                  </h3>
                    <div className="flex items-baseline gap-3">
                    {relatedProduct.discountPrice ? (
                        <>
                          <span className="text-lg text-black font-light">
                          {formatPrice(relatedProduct.discountPrice)}
                        </span>
                          <span className="text-sm text-gray-400 line-through">
                          {formatPrice(relatedProduct.price)}
                        </span>
                        </>
                    ) : (
                        <span className="text-lg text-black font-light">
                        {formatPrice(relatedProduct.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </section>
        )}
        </div>
    </div>
  );
}
