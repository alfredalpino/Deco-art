import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2c2c2c] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            Our Story
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 leading-relaxed">
            Crafting timeless elegance, one piece at a time.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0a0a0a] mb-6">
              Artisanal Excellence Since Day One
            </h2>
            <p className="text-[#2c2c2c]/80 leading-relaxed mb-6 font-light">
              At Deco-Art, we believe that furniture is more than just functional pieces for your home—it's an expression 
              of your personal style and a reflection of your values. Our journey began with a simple yet profound vision: 
              to create furniture that stands the test of time, both in quality and design.
            </p>
            <p className="text-[#2c2c2c]/80 leading-relaxed mb-6 font-light">
              Every piece in our collection is meticulously handcrafted by skilled artisans who have honed their craft over 
              generations. We source only the finest materials, ensuring that each item not only looks beautiful but also 
              withstands the rigors of daily use for decades to come.
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0a0a0a] mb-6 mt-12">
              Our Commitment
            </h2>
            <p className="text-[#2c2c2c]/80 leading-relaxed mb-6 font-light">
              We are committed to sustainable practices, ethical sourcing, and supporting local craftsmanship. When you choose 
              Deco-Art, you're not just buying furniture—you're investing in pieces that will become heirlooms, passed down 
              through generations.
            </p>
            <div className="mt-12">
              <Link
                href="/products"
                className="inline-block btn-luxury bg-[#0a0a0a] text-white border-[#0a0a0a] hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0a0a0a] active:bg-[#d4af37] active:border-[#d4af37] active:text-[#0a0a0a]"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
