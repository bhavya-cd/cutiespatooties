import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import LookbookCarousel from '@/components/LookbookCarousel'
import HomeClient from './HomeClient'
import { supabase } from '@/lib/supabase'
import { getAllProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch from Supabase
  let products = []
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        colors:product_colors(*)
      `)

    if (error || !data || data.length === 0) {
      console.log('Supabase fetch failed or empty on homepage, using local data')
      products = getAllProducts()
    } else {
      // Map to frontend format
      products = data.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        brand: p.brand,
        title: p.title,
        shortDescription: p.short_description,
        description: p.description,
        price: p.price,
        originalPrice: p.original_price,
        discount: p.discount,
        rating: p.rating,
        ratingCount: p.rating_count,
        sizes: p.sizes,
        availableSizes: p.available_sizes,
        images: p.images,
        whatsappMessage: p.whatsapp_message,
        colors: p.colors?.map((c: any) => ({
          name: c.name,
          image: c.image,
          slug: c.slug
        }))
      }))
    }
  } catch (err) {
    products = getAllProducts()
  }

  return (
    <HomeClient>
      {/* HERO - AURORA style: bold headline + single CTA */}
      <section id="home" className="relative h-[90vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="/assets/images/logo1.jpeg"
          alt="Cutiespatooties Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-valentine-charcoal/20"></div>

        <div className="relative text-center text-white px-6 z-10 max-w-3xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-4 md:mb-6 tracking-tight">
            Cute. Comfy. Confident.
          </h2>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-8 md:mb-10 text-white/90">
            Everyday outfits designed to make you feel effortlessly you.
          </p>

          <Link
            href="#shop"
            className="inline-block bg-white text-valentine-charcoal px-8 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-valentine-blush transition-colors"
          >
            Shop New Arrivals
          </Link>
        </div>
      </section>

      {/* FEATURE CARDS - AURORA style: 3 square cards with image + overlay */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Link href="#shop" className="group relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden bg-valentine-blush/30">
            <Image
              src="/assets/images/logo2.jpeg"
              alt="Crafted with care"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-valentine-charcoal/30 group-hover:bg-valentine-charcoal/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h3 className="text-white font-serif text-xl md:text-2xl font-semibold tracking-wide">Crafted with care</h3>
              <p className="text-white/80 text-sm mt-1">Comfort-first pieces for everyday life.</p>
            </div>
          </Link>
          <Link href="#shop" className="group relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden bg-valentine-blush/30">
            <Image
              src="/assets/images/logo6.jpeg"
              alt="Soft fabrics"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-valentine-charcoal/30 group-hover:bg-valentine-charcoal/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h3 className="text-white font-serif text-xl md:text-2xl font-semibold tracking-wide">Soft fabrics</h3>
              <p className="text-white/80 text-sm mt-1">Feels good. Looks good.</p>
            </div>
          </Link>
          <Link href="#about" className="group relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden bg-valentine-blush/30">
            <Image
              src="/assets/images/logo4.jpeg"
              alt="Small batches"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-valentine-charcoal/30 group-hover:bg-valentine-charcoal/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <h3 className="text-white font-serif text-xl md:text-2xl font-semibold tracking-wide">Small batches</h3>
              <p className="text-white/80 text-sm mt-1">Thoughtfully made, not mass-produced.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* DISCOVER OUR COLLECTIONS - AURORA style */}
      <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-center text-xs font-medium tracking-[0.3em] uppercase text-valentine-charcoal/70 mb-10 md:mb-14">
          Discover Our Collections
        </h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <Link href="#shop" className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-valentine-blush/30">
            <Image src="/assets/images/logo6.jpeg" alt="Comfy essentials" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-valentine-charcoal/20 group-hover:bg-valentine-charcoal/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-white font-serif text-lg font-semibold">Comfy Essentials</h3>
              <span className="inline-block mt-3 text-white text-sm font-medium tracking-wider uppercase border-b border-white/80 pb-1 w-fit">Shop now</span>
            </div>
          </Link>
          <Link href="#shop" className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-valentine-blush/30">
            <Image src="/assets/images/logo7.jpeg" alt="Everyday ease" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-valentine-charcoal/20 group-hover:bg-valentine-charcoal/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-white font-serif text-lg font-semibold">Everyday Ease</h3>
              <span className="inline-block mt-3 text-white text-sm font-medium tracking-wider uppercase border-b border-white/80 pb-1 w-fit">Shop now</span>
            </div>
          </Link>
          <Link href="#shop" className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-valentine-blush/30">
            <Image src="/assets/images/logo8.jpeg" alt="Statement pieces" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-valentine-charcoal/20 group-hover:bg-valentine-charcoal/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-white font-serif text-lg font-semibold">Statement Pieces</h3>
              <span className="inline-block mt-3 text-white text-sm font-medium tracking-wider uppercase border-b border-white/80 pb-1 w-fit">Shop now</span>
            </div>
          </Link>
        </div>
      </section>

      {/* LOOKBOOK */}
      <LookbookCarousel />

      {/* MARQUEE */}
      <section className="overflow-hidden py-10 bg-valentine-cream">
        <div className="flex whitespace-nowrap animate-marquee text-4xl md:text-6xl font-serif text-valentine-rose/15">
          <span className="mx-8">♥ CUTIESPATOOTIES</span>
          <span className="mx-8">COMFY</span>
          <span className="mx-8">CUTE</span>
          <span className="mx-8">LOVE</span>
          <span className="mx-8">CONFIDENT</span>
          <span className="mx-8">♥ CUTIESPATOOTIES</span>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="shop" className="max-w-7xl mx-auto px-6 mt-20 md:mt-28">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-valentine-charcoal/60 text-xs font-medium tracking-[0.3em] uppercase mb-2">The Collection</p>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-valentine-charcoal">Our Collection</h2>
          <p className="text-valentine-charcoal/60 max-w-xl mx-auto">
            Designed for everyday comfort with a touch of love.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* FEATURES - compact strip */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-28 reveal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-6 md:p-8 rounded-xl border border-valentine-blush/50">
            <h3 className="text-lg font-serif font-semibold mb-1 text-valentine-charcoal">Everyday Life</h3>
            <p className="text-valentine-charcoal/70 text-sm">Comfort-first outfits that move with you.</p>
          </div>
          <div className="bg-valentine-burgundy text-white p-6 md:p-8 rounded-xl">
            <h3 className="text-lg font-serif font-semibold mb-1">Small Batches</h3>
            <p className="opacity-90 text-sm">Thoughtfully made, not mass-produced.</p>
          </div>
          <div className="bg-valentine-blush/50 p-6 md:p-8 rounded-xl border border-valentine-blush">
            <h3 className="text-lg font-serif font-semibold mb-1 text-valentine-charcoal">Real Moments</h3>
            <p className="text-valentine-charcoal/70 text-sm">Designed for real people & real moments.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-4xl mx-auto px-6 mt-28 text-center">
        <h2 className="text-4xl font-serif mb-6 text-valentine-charcoal">Why Cutiespatooties?</h2>
        <p className="text-valentine-charcoal/70 leading-relaxed">
          We believe comfort is confidence. Cutiespatooties Outfits is created for everyday
          wear — playful, easy, and thoughtfully designed for real moments. Perfect for you and yours.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-12 text-sm text-valentine-charcoal/80">
          <div><span className="text-valentine-rose">♥</span> Comfort-first designs</div>
          <div><span className="text-valentine-rose">♥</span> Everyday wearability</div>
          <div><span className="text-valentine-rose">♥</span> Small-batch & thoughtful</div>
        </div>
      </section>
    </HomeClient>
  )
}

