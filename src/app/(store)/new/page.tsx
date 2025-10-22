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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">New arrivals</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(p=> <ProductCard key={p.id} p={p}/>)}
      </div>
    </div>
  )
}
