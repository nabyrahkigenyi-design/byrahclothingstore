// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export const revalidate = 3600 // cache sitemap for 1h

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://byrahclothingstore.vercel.app'

  const core: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/women`, lastModified: new Date() },
    { url: `${base}/men`, lastModified: new Date() },
    { url: `${base}/children`, lastModified: new Date() },
    { url: `${base}/sale`, lastModified: new Date() },
  ]

  // No DB in build env? Return static entries and avoid loading Prisma.
  if (!process.env.DATABASE_URL) return core

  try {
    // IMPORTANT: dynamic import so Prisma isn’t loaded at module top
    const { db } = await import('@/lib/prisma')
    const products = await db.product.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
      take: 5000, // keep sitemap reasonable
    })
    const productLinks = products.map(p => ({
      url: `${base}/product/${p.slug}`,
      lastModified: p.updatedAt,
    }))
    return [...core, ...productLinks]
  } catch {
    // Fail-soft if DB errors in build
    return core
  }
}
