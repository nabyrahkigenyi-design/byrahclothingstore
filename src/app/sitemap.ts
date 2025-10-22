import type { MetadataRoute } from "next"
import { db } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/new`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/women`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/men`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/children`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sale`, changeFrequency: "weekly", priority: 0.8 },
  ]

  const products = await db.product.findMany({
    where: { status: "ACTIVE" }, // or remove if you don’t use status
    select: { slug: true, updatedAt: true },
  })

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url: `${base}/product/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
