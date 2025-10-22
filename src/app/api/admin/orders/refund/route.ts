import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function POST(req: Request){
  const { id } = await req.json()
  await db.order.update({ where:{ id:Number(id) }, data:{ status:'REFUNDED' } })
  return NextResponse.json({ ok:true })
}
