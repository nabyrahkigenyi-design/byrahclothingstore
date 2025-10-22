import { db } from '@/lib/prisma'
export async function searchProducts(q:string){
  if(!q) return []
  return db.product.findMany({
    where:{ OR:[
      { name: { contains: q, mode:'insensitive' } },
      { description: { contains: q, mode:'insensitive' } },
      { tags: { hasSome: q.toLowerCase().split(/\s+/).filter(Boolean) } },
    ]},
    include:{ images:true },
    take: 24
  })
}
