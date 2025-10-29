import { db } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'

export default async function Page({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
    const params = await searchParams;

    const parent = await db.category.findUnique({ where: { slug: 'children' } })
    
    const sub = params.c ? await db.category.findUnique({ where: { slug: params.c } }) : null
    
    const where = sub
        ? { categories: { some: { categoryId: sub.id! } } }
        : { categories: { some: { category: { parentId: parent?.id } } } }

    const items = await db.product.findMany({ where, include: { images: true }, orderBy: { createdAt: 'desc' } })
    
    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold">Children{sub ? ` – ${sub.name}` : ''}</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4">
                    {items.map(p => <ProductCard key={p.id} p={p} />)}
                </div>
            </div>
        </section>
    )
}