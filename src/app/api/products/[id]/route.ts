import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export const runtime = 'nodejs';

async function revalidateSections(){
  const base = process.env.NEXTAUTH_URL
  if (!base) {
      console.error("NEXTAUTH_URL is not defined. Cannot revalidate category sections.")
      return
  }
  for (const p of ['/women','/men','/children','/new','/sale']) {
    await fetch(`${base}/api/revalidate`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ path: p })
    })
  }
}

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: Request, ctx: RouteContext) {
    const { id } = await ctx.params;

    if (!(await requireAdmin())) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const pid = Number(id);

    const { name, priceUGX, description, categoryIds = [], variants = [] } = await req.json();
    const parsedCategoryIds = (categoryIds as number[]).map(Number);
    const parsedPriceUGX = Number(priceUGX);

    try {
        const updatedProduct = await db.product.update({
            where: { id: pid },
            data: {
                name,
                priceUGX: parsedPriceUGX,
                description,
                categories: { 
                    deleteMany: {}, 
                    create: parsedCategoryIds.map((categoryId) => ({ categoryId })), 
                },
            },
        });

        const existingVariants = await db.variant.findMany({ where: { productId: pid } });
        const incomingSizes = new Set(variants.map((v: any) => v.size));

        await db.variant.deleteMany({
            where: {
                productId: pid,
                size: { notIn: Array.from(incomingSizes) as string[] }
            }
        });

        for (const v of variants) {
            const prev = existingVariants.find(e => e.size === v.size);
            const stockValue = Number(v.stock || 0);

            if (prev) {
                await db.variant.update({
                    where: { id: prev.id },
                    data: { stock: stockValue }
                });
            } else {
                await db.variant.create({
                    data: { productId: pid, size: v.size, stock: stockValue }
                });
            }
        }

        const slug = updatedProduct.slug || updatedProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: `/product/${slug}` }),
        });
        
        await revalidateSections();

        return NextResponse.json({ ok: true, product: updatedProduct });

    } catch (error) {
        console.error(`Error updating product ID ${pid}:`, error);
        return NextResponse.json({ error: 'Failed to update product', details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(_req: Request, ctx: RouteContext) {
    const { id } = await ctx.params;
    
    if (!(await requireAdmin())) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const pid = Number(id);

    try {
        const deletedProduct = await db.product.delete({ where: { id: pid } });

        const slug = deletedProduct.slug || deletedProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        
        await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: "/" }),
        });
        
        await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: `/product/${slug}` }),
        });

        await revalidateSections();

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error(`Error deleting product ID ${pid}:`, error);
        const status = (error as { code?: string }).code === 'P2025' ? 404 : 500;
        return new NextResponse(JSON.stringify({ error: 'Failed to delete product', details: (error as Error).message }), { status });
    }
}