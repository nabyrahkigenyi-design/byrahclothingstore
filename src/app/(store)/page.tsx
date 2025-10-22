// src/app/(store)/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import HomeHero from '@/components/home/HomeHero'
import BrandsMarquee from '@/components/home/BrandsMarquee'

export default async function Home(){
  const newest = await db.product.findMany({ orderBy:{ createdAt:'desc' }, take: 12, include:{ images:true } })
  const menSubcats = ['saudi-qamees','emirati-qamees','misr-qamees','embroidered-qamees','moroccan-kandora','kufi-hats','men-pants']

  return (
    <main className="space-y-16">
      {/* Full-bleed hero stays as-is */}
      <HomeHero />

      {/* Sister brands – full width band but content padded */}
      <section className="bg-gray-50 py-12">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-6">
      <div className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
        Sister Brands
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </div>
  </div>

  {/* full-bleed marquee with soft fades */}
  <BrandsMarquee />
</section>

      {/* HIM & HER */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">Modesty for <span className="text-black/70">HIM</span> & <span className="text-black/70">HER</span></h2>
        <p className="text-center max-w-3xl mx-auto mt-3 text-base md:text-lg text-gray-700">
          Elevate your wardrobe with timeless modest essentials. From flowing abayas and breathable hijabs to impeccably tailored thobes and kandoras—each piece is crafted for elegance, comfort, and faith-first living.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link href="/women" className="group relative h-[340px] rounded-2xl overflow-hidden">
            <Image src="/hero/women.jpg" alt="Women" fill className="object-cover transition-transform group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <div className="text-2xl font-semibold">Islamic clothing for women</div>
              <div className="text-sm opacity-90">Abayas • Hijabs • Sportswear • Khimar</div>
            </div>
          </Link>

          <Link href="/men" className="group relative h-[340px] rounded-2xl overflow-hidden">
            <Image src="/hero/men.jpg" alt="Men" fill className="object-cover transition-transform group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <div className="text-2xl font-semibold">Islamic clothing for men</div>
              <div className="text-sm opacity-90">Thobes • Kandoras • Kufi / Hats</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Men feature */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">Islamic clothing for men</h2>
          <p className="text-gray-700 mt-3 text-base md:text-lg">
            Tradition meets modern craftsmanship. Discover premium thobes, elegant kandoras, kufis, and everyday staples designed for dignity, breathability, and all-day comfort.
          </p>
          <p className="text-gray-700 mt-2">
            Dress for Friday prayer, special events, or the week ahead—beautifully and modestly.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {menSubcats.map(s=>(
              <Link key={s} href={`/men?c=${s}`} className="text-xs border rounded-full px-3 py-1 hover:bg-black hover:text-white">
                {s.replace(/-/g,' ')}
              </Link>
            ))}
          </div>
          <Link href="/men" className="inline-block bg-black text-white rounded-md px-5 py-2.5 mt-6">DISCOVER NOW</Link>
        </div>
        <div className="relative h-[360px] rounded-2xl overflow-hidden">
          <Image src="/hero/men.jpg" alt="Men promo" fill className="object-cover" />
        </div>
      </section>

      {/* Children feature */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-[320px] rounded-2xl overflow-hidden md:order-2">
          <Image src="/hero/children.jpg" alt="Children" fill className="object-cover" />
        </div>
        <div className="md:order-1">
          <h2 className="text-3xl md:text-4xl font-semibold">Children</h2>
          <p className="text-gray-700 mt-3 text-base md:text-lg">
            Modest, playful, and comfortable—our kids’ range spans abayas, hijabs, qamees, and kandoras in cheerful colors and easy-care fabrics.
          </p>
          <p className="text-gray-700 mt-2">Perfect for Eid, school events, and everyday wear.</p>
          <Link href="/children" className="inline-block border border-black text-black rounded-md px-5 py-2.5 mt-6 hover:bg-black hover:text-white">
            Shop Children
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">New arrivals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
          {newest.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* About (full row) */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">About Byrah Clothing Store</h2>
        <div className="mt-3 text-base md:text-lg text-gray-700 space-y-3">
          <p><strong>Byrah Clothing Store</strong> is your Kampala destination for authentic, modern Islamic fashion—grounded in faith, crafted with quality, and made for daily life.</p>
          <p>We curate abayas, hijabs, thobes, kandoras, kufis, and essentials for the whole family. Expect breathable fabrics, tailored fits, and styles that move with you—from Jummah to celebrations and everything in between.</p>
          <p>Find us at <strong>Equatorial Mall, Shop 443, Kampala</strong>. We offer <strong>free shipping in Uganda on orders ≥ UGX 150,000</strong> and convenient in-store pickup.</p>
        </div>
      </section>

      {/* Map (full width below About) */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="rounded-2xl overflow-hidden border">
          <iframe
            title="Byrah Map"
            className="w-full h-[360px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Equatorial+Mall+Kampala&output=embed"
          />
        </div>
      </section>
    </main>
  )
}
