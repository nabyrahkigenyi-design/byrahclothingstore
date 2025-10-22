import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"

export default async function OrdersPage(){
  const session = await getServerSession(authOptions)
  const email = session?.user?.email || ""
  const orders = await db.order.findMany({
    where: { email },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true, variant: true } } }
  })

  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
      {!orders.length && <div className="text-sm text-gray-600">No orders yet.</div>}
      <div className="space-y-4">
        {orders.map((o)=> {
          const shortId =
            typeof o.id === "string"
              ? o.id.slice(0, 6).toUpperCase()
              : String(o.id).padStart(6, "0") // pretty number ID

          return (
            <div key={o.id} className="border rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Order #{shortId}</div>
                <div className="text-sm">{o.status}</div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {new Date(o.createdAt).toLocaleString()}
              </div>
              <ul className="mt-3 text-sm list-disc ml-5">
                {o.items.map((i)=>(
                  <li key={i.id}>
                    {i.qty} × {i.product.name} {i.variant?.size ? `(Size ${i.variant.size})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
