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

      {/* Sister brands – already updated */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gray-600">Sister Brands</div>
            <div className="mx-auto mt-2 h-px w-24 sm:w-36 bg-gray-200" />
          </div>
        </div>
        <BrandsMarquee />
      </section>

      {/* HIM & HER */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center">Modesty for <span className="text-black/70">HIM</span> & <span className="text-black/70">HER</span></h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Elevate your wardrobe with timeless modest essentials. From flowing abayas and breathable hijabs to impeccably tailored thobes and kandoras—each piece is crafted for elegance, comfort, and faith-first living.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/women" className="group relative h-[340px] rounded-2xl overflow-hidden">
              <Image src="/hero/women.jpg" alt="Women" fill className="object-cover transition-transform group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <div className="text-lg sm:text-xl font-semibold">Islamic clothing for women</div>
                <div className="text-xs sm:text-sm opacity-90">Abayas • Hijabs • Sportswear • Khimar</div>
              </div>
            </Link>

            <Link href="/men" className="group relative h-[340px] rounded-2xl overflow-hidden">
              <Image src="/hero/men.jpg" alt="Men" fill className="object-cover transition-transform group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <div className="text-lg sm:text-xl font-semibold">Islamic clothing for men</div>
                <div className="text-xs sm:text-sm opacity-90">Thobes • Kandoras • Kufi / Hats</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Men feature */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Islamic clothing for men</h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700">
                Tradition meets modern craftsmanship. Discover premium thobes, elegant kandoras, kufis, and everyday staples designed for dignity, breathability, and all-day comfort.
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-700">
                Dress for Friday prayer, special events, or the week ahead—beautifully and modestly.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {menSubcats.map(s=>(
                  <Link key={s} href={`/men?c=${s}`} className="text-xs sm:text-sm border rounded-full px-3 py-1 hover:bg-black hover:text-white">
                    {s.replace(/-/g,' ')}
                  </Link>
                ))}
              </div>
              <Link href="/men" className="inline-block bg-black text-white rounded-md px-4 py-2 mt-6 text-sm sm:text-base">DISCOVER NOW</Link>
            </div>
            <div className="relative h-[360px] rounded-2xl overflow-hidden">
              <Image src="/hero/men.jpg" alt="Men promo" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Children feature */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div className="relative h-[320px] rounded-2xl overflow-hidden order-2 sm:order-1">
              <Image src="/hero/children.jpg" alt="Children" fill className="object-cover" />
            </div>
            <div className="order-1 sm:order-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Children</h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700">
                Modest, playful, and comfortable—our kids’ range spans abayas, hijabs, qamees, and kandoras in cheerful colors and easy-care fabrics.
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-700">Perfect for Eid, school events, and everyday wear.</p>
              <Link href="/children" className="inline-block border border-black text-black rounded-md px-4 py-2 mt-6 text-sm sm:text-base hover:bg-black hover:text-white">
                Shop Children
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals – already correctly wrapped */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold">New arrivals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-5">
            {newest.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">About Byrah Clothing Store</h2>
          <div className="mt-3 sm:mt-4 space-y-3">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">
              <strong>Byrah Clothing Store</strong> is your Kampala destination for authentic, modern Islamic fashion—grounded in faith, crafted with quality, and made for daily life.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">
              We curate abayas, hijabs, thobes, kandoras, kufis, and essentials for the whole family. Expect breathable fabrics, tailored fits, and styles that move with you—from Jummah to celebrations and everything in between.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">
              Find us at <strong>Equatorial Mall, Shop 443, Kampala</strong>. We offer <strong>free shipping in Uganda on orders ≥ UGX 150,000</strong> and convenient in-store pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </main>
  )
}