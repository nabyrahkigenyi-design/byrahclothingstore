import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { uploadImage } from "@/lib/upload" 
export const runtime = 'nodejs'

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const list = await db.image.findMany({ where: { productId: Number(id) }, orderBy: { position: 'asc' } })
  return NextResponse.json(list)
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const pid = Number(id)

  const form = await req.formData()
  const files = form.getAll('images') as File[]
  const start = (await db.image.count({ where: { productId: pid } })) + 1

  const created: any[] = []
  let pos = start
  for (const f of files) {
    const { url } = await uploadImage(f)
    const rec = await db.image.create({ data: { productId: pid, url, alt: '', position: pos++ } })
    created.push(rec)
  }
  return NextResponse.json(created)
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const pid = Number(id)
  const { id: imgId } = await req.json()

  const all = await db.image.findMany({ where: { productId: pid }, orderBy: { position: 'asc' } })
  const target = all.find(i => i.id === Number(imgId))
  if (!target) return NextResponse.json({ ok: false }, { status: 404 })

  await db.$transaction([
    db.image.update({ where: { id: target.id }, data: { position: 1 } }),
    ...all.filter(i => i.id !== target.id).map((i, idx) =>
      db.image.update({ where: { id: i.id }, data: { position: idx + 2 } })
    ),
  ])
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const pid = Number(id)

  const url = new URL(req.url)
  const imgId = Number(url.searchParams.get('id'))
  const img = await db.image.findUnique({ where: { id: imgId } })
  if (!img || img.productId !== pid) return NextResponse.json({ ok: false }, { status: 404 })

  await db.image.delete({ where: { id: imgId } })
  const rest = await db.image.findMany({ where: { productId: pid }, orderBy: { position: 'asc' } })
  await Promise.all(rest.map((i, idx) => db.image.update({ where: { id: i.id }, data: { position: idx + 1 } })))
  return NextResponse.json({ ok: true })
}
