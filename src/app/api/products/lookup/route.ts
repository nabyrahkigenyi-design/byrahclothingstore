import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  // return only leaf categories (no children). Remove the "where" if you want all.
  const categories = await db.category.findMany({
    where: { children: { none: {} } },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json({ categories })
}
