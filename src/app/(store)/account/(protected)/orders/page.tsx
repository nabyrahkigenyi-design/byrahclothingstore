// src/app/(store)/account/(protected)/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import Link from "next/link"

type OrderWithItems = Awaited<ReturnType<typeof db.order.findMany>>[number]

const shortId = (id: string | number) => String(id).slice(0, 6).toUpperCase()

export default async function AccountHome() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email || ""

  const orders = await db.order.findMany({
    where: { email },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true, variant: true } } },
    take: 10,
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Account</h1>
          <p className="text-sm text-gray-600">Welcome{session?.user?.name ? `, ${session.user.name}` : ""}.</p>
        </div>
        <div className="flex gap-3 text-sm">
          <Link href="/" className="underline">Continue shopping</Link>
          <Link href="/account/orders" className="underline">All orders</Link>
          <Link href="/account/settings" className="underline">Profile & settings</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2 rounded-2xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Recent orders</h2>
          {!orders.length && (
            <div className="text-sm text-gray-600">No orders yet.</div>
          )}
          <div className="divide-y">
            {orders.map((o: OrderWithItems) => (
              <div key={o.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">Order #{shortId(o.id)}</div>
                  <div className="text-xs text-gray-600">
                    {o.items.length} item{o.items.length !== 1 ? "s" : ""} • {o.status}
                  </div>
                </div>
                <div className="text-sm">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
          {!!orders.length && (
            <div className="mt-4">
              <Link className="underline text-sm" href="/account/orders">View all orders</Link>
            </div>
          )}
        </section>

        <aside className="rounded-2xl border p-6 space-y-3">
          <h2 className="text-lg font-semibold">Account quick links</h2>
          <ul className="text-sm space-y-2">
            <li><Link className="underline" href="/account/settings">Profile & address book</Link></li>
            <li><Link className="underline" href="/cart">View cart</Link></li>
            <li><Link className="underline" href="/checkout">Checkout</Link></li>
            <li><Link className="underline" href="/">Shop new arrivals</Link></li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
