import { db } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function Page(){
  const items = await db.product.findMany({
    where:{ tags:{ has: 'sale' }, status:'ACTIVE' },
    include:{ images:true },
    orderBy:{ updatedAt:'desc' }
  })
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Sale</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(p=> <ProductCard key={p.id} p={p}/>)}
      </div>
    </div>
  )
}
