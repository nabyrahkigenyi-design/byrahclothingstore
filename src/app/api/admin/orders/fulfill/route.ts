import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin"

export async function POST(req: Request){
  if(!(await requireAdmin())) return NextResponse.json({error:"unauthorized"},{status:401})
  const { id } = await req.json()

  const order = await db.order.findUnique({
    where:{ id: Number(id) },
    include:{ items:true }
  })
  if(!order) return NextResponse.json({error:"not found"},{status:404})

  for(const it of order.items){
    await db.variant.update({
      where:{ id: it.variantId },
      data:{ stock: { decrement: it.qty } }
    })
  }
  await db.order.update({ where:{ id: Number(id) }, data:{ status:"FULFILLED" } })
  return NextResponse.json({ ok:true })
}
