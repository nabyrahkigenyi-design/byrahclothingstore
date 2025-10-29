import { db } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function Page(){
  const items = await db.product.findMany({
    where:{ tags:{ has: 'sale' }, status:'ACTIVE' },
    include:{ images:true },
    orderBy:{ updatedAt:'desc' }
  })
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Sale</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {items.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}