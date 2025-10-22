import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import Link from "next/link"

export default async function AccountHome() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email || ""
  const orders = await db.order.findMany({
    where: { email },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { items: true },
  })

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {!orders.length && <div className="text-sm text-gray-600">No orders yet.</div>}
        <div className="divide-y">
          {orders.map((o) => (
            <div key={o.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">
                  Order #{String(o.id).slice(0, 6).toUpperCase()}
                </div>
                <div className="text-xs text-gray-600">
                  {o.items.length} items • {o.status}
                </div>
              </div>
              <div className="text-sm">{new Date(o.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link className="underline text-sm" href="/account/orders">View all orders</Link>
        </div>
      </div>

      <div className="rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="text-sm">
          <div><span className="text-gray-500">Name:</span> {session?.user?.name || "—"}</div>
          <div><span className="text-gray-500">Email:</span> {session?.user?.email || "—"}</div>
        </div>
        <div className="mt-4">
          <Link className="underline text-sm" href="/account/settings">Edit profile</Link>
        </div>
      </div>
    </div>
  )
}
