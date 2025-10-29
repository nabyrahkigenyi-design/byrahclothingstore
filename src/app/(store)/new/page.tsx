import { db } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function Page(){
  const since = new Date(Date.now()-1000*60*60*24*30)
  const items = await db.product.findMany({
    where:{ createdAt:{ gte: since }, status:'ACTIVE' },
    orderBy:{ createdAt:'desc' },
    include:{ images:true }
  })
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">New arrivals</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {items.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}