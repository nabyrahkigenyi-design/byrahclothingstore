// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/prisma'

export async function POST(req: Request) {
  const { name, email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error:'Missing' }, { status:400 })
  const exists = await db.user.findUnique({ where:{ email: email.toLowerCase() } })
  if (exists) return NextResponse.json({ error:'Email already in use' }, { status:409 })
  const passwordHash = await bcrypt.hash(password, 12)
  const u = await db.user.create({ data:{ name, email: email.toLowerCase(), passwordHash, role:'CUSTOMER' } })
  return NextResponse.json({ ok:true, id: u.id })
}
