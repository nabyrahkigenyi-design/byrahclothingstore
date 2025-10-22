// src/app/api/orders/route.ts
import { NextResponse } from "next/server"
import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const runtime = "nodejs"

type CartItem = {
  productId: number | string
  variantId: number | string
  qty: number
  priceUGX: number
}

type AddressInput = {
  name: string
  phone: string
  line1: string
  line2?: string | null
  city: string
  region?: string | null
  postal?: string | null
}

type Body = {
  pickup: boolean
  items: CartItem[]
  address?: AddressInput | null
  email: string
}

const FREE_SHIP_THRESHOLD = 150_000
const STANDARD_SHIP_FEE = 10_000

export async function POST(req: Request) {
  try {
    const { pickup, items, address, email }: Body = await req.json()

    if (!email || !items?.length) {
      return NextResponse.json(
        { error: "Email and at least one cart item are required." },
        { status: 400 }
      )
    }

    // Derive userId only if there is a session and emails match
    const session = await getServerSession(authOptions)
    const isSameEmail = session?.user?.email === email
    const userId: string | undefined = isSameEmail
      ? ((session?.user as unknown as { id?: string })?.id ?? undefined)
      : undefined

    // Totals
    const subtotal = items.reduce((sum, i) => sum + Number(i.priceUGX) * Number(i.qty), 0)
    const shippingUGX =
      pickup ? 0 : subtotal >= FREE_SHIP_THRESHOLD ? 0 : STANDARD_SHIP_FEE
    const totalUGX = subtotal + shippingUGX

    // Create order
    const order = await db.order.create({
      data: {
        email,
        userId,
        pickup,
        totalUGX,
        shippingUGX,
        status: "PENDING",
        items: {
          create: items.map((i) => ({
            productId: Number(i.productId),
            variantId: Number(i.variantId),
            qty: Number(i.qty),
            priceUGX: Number(i.priceUGX),
          })),
        },
        ...(pickup
          ? {}
          : address
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
          : {}),
      },
      select: { id: true },
    })

    return NextResponse.json({ id: order.id })
  } catch (err) {
    console.error("Create order error:", err)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
