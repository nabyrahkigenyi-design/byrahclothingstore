import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { uploadImageFromFormFile as uploadImage } from '@/lib/upload'

export const runtime = 'nodejs'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function uniqueSlug(base: string) {
  let s = slugify(base)
  let n = 1
  while (await db.product.findUnique({ where: { slug: s } })) {
    n++
    s = `${slugify(base)}-${n}`
  }
  return s
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const ids = (url.searchParams.get("ids") || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)

  if (!ids.length) return NextResponse.json([], { status: 200 })

  const products = await db.product.findMany({
    where: { id: { in: ids } },
    include: { images: true }
  })

  const out = products.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    img: p.images[0]?.url || "/placeholder.jpg",
  }))
  return NextResponse.json(out)
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const name = String(form.get('name') || '')
    const description = String(form.get('description') || '')
    const priceUGX = Number(form.get('priceUGX') || 0)
    const sku = String(form.get('sku') || '')
    const tags = String(form.get('tags') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const sizes = String(form.get('sizes') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
    const stockPerSize = Number(form.get('stock') || 0)

    const rawCatIds = form.getAll('categoryIds').map(String)
    const categoryIds = rawCatIds
      .map(id => Number(id))
      .filter(n => Number.isFinite(n))

    const slug = await uniqueSlug(name)

    const product = await db.product.create({
      data: { name, slug, description, priceUGX, sku, tags },
    })

    if (categoryIds.length) {
      await db.productCategory.createMany({
        data: categoryIds.map(categoryId => ({
          productId: product.id,
          categoryId,
        })),
      })
    }

    if (sizes.length) {
      await db.variant.createMany({
        data: sizes.map(size => ({
          productId: product.id,
          size,
          stock: stockPerSize,
        })),
      })
    } else if (stockPerSize > 0) {
      await db.variant.create({
        data: { productId: product.id, size: 'One Size', stock: stockPerSize },
      })
    }

    const files = form.getAll('images')
    let position = 1
    for (const f of files) {
      if (typeof f === 'string') continue
      const up = await uploadImage(f as File)
      await db.image.create({
        data: {
          productId: product.id,
          url: up.url,
          alt: name,
          position: position++,
        },
      })
    }

    return NextResponse.json({ ok: true, id: product.id })
  } catch (e) {
    console.error('Error creating product:', e)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}