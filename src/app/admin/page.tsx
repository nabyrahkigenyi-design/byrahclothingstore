import { db } from "@/lib/prisma"
import Link from "next/link"

export default async function AdminHome(){
  const [pc, oc] = await Promise.all([
    db.product.count(),
    db.order.count(),
  ])
  const latest = await db.order.findMany({ orderBy:{ createdAt:"desc" }, take:5 })
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4"><div className="text-xs text-gray-600">Products</div><div className="text-2xl font-semibold">{pc}</div></div>
        <div className="border rounded-xl p-4"><div className="text-xs text-gray-600">Orders</div><div className="text-2xl font-semibold">{oc}</div></div>
        <Link href="/admin/orders" className="border rounded-xl p-4 hover:bg-gray-50">
          <div className="text-xs text-gray-600">Manage</div><div className="text-2xl font-semibold">Orders</div>
        </Link>
      </div>
      <div>
        <div className="font-medium mb-2">Latest orders</div>
        <div className="border rounded-xl divide-y text-sm">
          {latest.map(o=>(
            <div key={o.id} className="p-3 flex justify-between">
              <span>#{o.id} • {o.email}</span>
              <span>{o.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
