import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { db } from "@/lib/prisma"

// FIX: Helper function to safely convert ID (string or number) to a short, uppercase string
const shortId = (id: string | number) => String(id).slice(0, 6).toUpperCase()

export default async function AccountHome(){
  const session = await getServerSession(authOptions)
  const email = session?.user?.email || ""
  const orders = await db.order.findMany({
    where: { email },
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 5
  })
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-6">
        <div className="text-lg font-semibold">Welcome back{session?.user?.name? `, ${session.user.name}`:""}!</div>
        <p className="text-gray-600 mt-1">Browse our latest arrivals and continue shopping.</p>
        <div className="mt-3 flex gap-3">
          <Link href="/" className="bg-black text-white px-4 py-2 rounded-md">Home</Link>
          <Link href="/new" className="border px-4 py-2 rounded-md">New In</Link>
        </div>
      </div>

      <div className="rounded-2xl border p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-4 divide-y">
          {orders.length === 0 && <div className="text-sm text-gray-600">No orders yet.</div>}
          {orders.map(o=>(
            <div key={o.id} className="py-3 flex items-center justify-between">
              <div>
                {/* Usage of shortId helper to fix Type Error */}
                <div className="font-medium">Order #{shortId(o.id)}</div>
                <div className="text-xs text-gray-600">{o.items.length} items • {o.status}</div>
              </div>
              <div className="text-sm">{new Date(o.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
