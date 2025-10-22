import { db } from '@/lib/prisma'
import ProductGallery from '@/components/ProductGallery'
import { UGX, FREE_SHIP_THRESHOLD } from '@/lib/currency'
import RecommendationRail from '@/components/RecommendationRail'
import RecentlyViewed from '@/components/RecentlyViewed'
import PurchaseBox from '@/components/PurchaseBox'

// FIX 2: Change signature to async params and await it
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.product.findUnique({ where: { slug }, include: { images: true } })
  if (!p) return {}
  return {
    title: p.name,
    description: p.description.slice(0, 150),
    openGraph: { images: p.images[0]?.url ? [{ url: p.images[0].url }] : [] },
  }
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const p = await db.product.findUnique({
    where: { slug },
    include: {
      images: true,
      variants: { orderBy: { size: 'asc' } },
      categories: { include: { category: true } },
    },
  })
  if (!p) return <div className="py-20">Not found</div>

  const recs = await db.product.findMany({
    where: {
      id: { not: p.id },
      categories: { some: { categoryId: { in: p.categories.map(c => c.categoryId) } } },
    },
    take: 8,
    include: { images: true },
  })
  
  const productData = {
    ...p,
    id: String(p.id),
    images: p.images.map(img => ({
      url: img.url,
      alt: img.alt || p.name
    })),
  }

  const recsData = recs.map(r => ({
    ...r,
    id: String(r.id),
  }))
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductGallery images={productData.images} /> 
      <div>
        <h1 className="text-2xl font-semibold">{productData.name}</h1>
        <div className="mt-2 text-xl">{UGX.format(productData.priceUGX)}</div>
        <div className="text-xs text-gray-600 mt-1">
          Free shipping on orders ≥ UGX {FREE_SHIP_THRESHOLD.toLocaleString()} • Delivery in 2 days or Pickup
        </div>

        <div className="mt-4">
          <PurchaseBox product={productData} /> 
        </div>

        <div className="mt-6 prose max-w-none">
          <h3>Description</h3>
          <p>{productData.description}</p>
          <div className="mt-4">Share:
            <div className="flex gap-2 mt-2 text-sm">
              <a
                target="_blank"
                href={`https://wa.me/?text=${encodeURIComponent(
                  'Check this: ' + process.env.NEXT_PUBLIC_BASE_URL + '/product/' + productData.slug
                )}`}
              >
                WhatsApp
              </a>
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  process.env.NEXT_PUBLIC_BASE_URL + '/product/' + productData.slug
                )}`}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <RecommendationRail items={recsData} />
        <RecentlyViewed currentId={productData.id} /> 
      </div>
    </div>
  )
}