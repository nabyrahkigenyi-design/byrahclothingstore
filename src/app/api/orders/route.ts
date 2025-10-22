import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { sendMail } from '@/server/mailer'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request){
    const session = await getServerSession(authOptions)
    const { pickup, items, address, email } = await req.json()
    if(!items?.length) return NextResponse.json({ error:'Empty cart' }, { status:400 })

    const variantIds = items.map((i:any)=> Number(i.variantId))
    const variants = await db.variant.findMany({ where:{ id:{ in: variantIds } }, select:{ id:true, stock:true, productId:true, product:{ select:{ priceUGX:true } } } })
    const vmap = new Map(variants.map(v=> [v.id, v]))

    for(const it of items){
        const v = vmap.get(Number(it.variantId))
        if(!v) return NextResponse.json({ error:`Variant ${it.variantId} not found` },{ status:400 })
        if(v.stock < it.qty) return NextResponse.json({ error:`Insufficient stock for variant ${it.variantId}` },{ status:409 })
        it.priceUGX = v.product.priceUGX
        it.productId = v.productId
    }

    const subtotal = items.reduce((s:any,i:any)=> s + i.priceUGX*i.qty, 0)
    const shippingUGX = pickup? 0 : (subtotal>=150000?0:10000)
    const totalUGX = subtotal + shippingUGX
    
    // Check if user is logged in AND the order email matches the session email
    const userId = session?.user?.email === email 
        ? (session.user as any).id ?? undefined 
        : undefined;

    const order = await db.order.create({
        data:{
            email,
            userId: userId, // Attach the user ID if authenticated
            pickup, 
            totalUGX, 
            shippingUGX, 
            status:'PENDING',
            items:{ 
                create: items.map((i:any)=>({ 
                    productId: i.productId, 
                    variantId: Number(i.variantId), 
                    qty: i.qty, 
                    priceUGX: i.priceUGX 
                })) 
            },
            ...(address && !pickup
                ? {
                    address: {
                        create: {
                            name: address.name,
                            phone: address.phone,
                            line1: address.line1,
                            line2: address.line2 ?? null,
                            city: address.city,
                            region: address.region ?? null,
                            postal: address.postal ?? null,
                        },
                    },
                }
                : {}
            )
        }
    })
    
    try {
        await sendMail({ to: email, subject: 'Order received', html: `<p>Thanks. Order ${order.id} received.</p>` })
    } catch (error) {
        console.error("Failed to send order confirmation email:", error);
    }

    return NextResponse.json({ id: order.id })
}
