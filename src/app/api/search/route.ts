import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const q = new URL(req.url).searchParams.get('q')?.trim() || ''
  if(!q) return NextResponse.json([])
  const items = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode:'insensitive' } },
        { description: { contains: q, mode:'insensitive' } },
        { tags: { hasSome: q.split(/\s+/).map(s=>s.toLowerCase()) } }
      ]
    },
    take: 24,
    orderBy: { createdAt: 'desc' },
    include: { images:true }
  })
  return NextResponse.json(items.map(p=>({ id:p.id, slug:p.slug, name:p.name, priceUGX:p.priceUGX, img:p.images[0]?.url||'/placeholder.jpg' })))
}
