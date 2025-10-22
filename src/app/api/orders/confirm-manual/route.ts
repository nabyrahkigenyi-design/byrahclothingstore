import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const { id, method } = await req.json()
  await db.order.update({ where:{ id }, data:{ status:'PENDING' } }) // staff marks PAID later
  return NextResponse.json({ ok:true })
}
