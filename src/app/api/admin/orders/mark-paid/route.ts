import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin"

export async function POST(req: Request){
  if(!(await requireAdmin())) return NextResponse.json({error:"unauthorized"},{status:401})
  const { id } = await req.json()
  await db.order.update({ where:{ id: Number(id) }, data:{ status:"PAID" } })
  return NextResponse.json({ ok:true })
}
