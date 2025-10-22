import { db } from "@/lib/prisma"
import OrderActions from '@/components/admin/OrderActions'

export const dynamic = "force-dynamic"

// Removed 'markPaid' and 'fulfill' server actions as OrderActions handles updates via API routes.

export default async function OrderDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const o = await db.order.findUnique({
    where: { id: Number(id) },
    include: { items: { include: { product: true, variant: true } }, address: true },
  })
  if (!o) return <div className="p-8">Not found</div>

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order #{o.id} — {o.status}</h1>
        {/* Now correctly passing only the 'id' prop, as required by your OrderActions component. */}
        <OrderActions id={o.id} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="font-medium mb-2">Items</div>
          <ul className="space-y-2">
            {o.items.map(it => (
              <li key={it.id} className="flex justify-between border rounded px-3 py-2">
                <div>{it.product.name} • {it.variant.size} × {it.qty}</div>
                <div>{(it.priceUGX * it.qty).toLocaleString()} UGX</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Summary</div>
          <div className="border rounded p-4 space-y-1 text-sm">
            <div className="flex justify-between"><span>Status</span><span>{o.status}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{o.shippingUGX ? o.shippingUGX.toLocaleString()+" UGX" : "Free"}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>{o.totalUGX.toLocaleString()} UGX</span></div>
          </div>
          {o.address && (
            <div className="mt-4 text-sm">
              <div className="font-medium">Ship to</div>
              <div>{o.address.name}</div>
              <div>{o.address.line1}</div>
              <div>{o.address.city}{o.address.region ? ", " + o.address.region : ""}</div>
              <div>{o.address.phone}</div>
            </div>
          )}
          {o.pickup && <div className="mt-4 text-sm">Pickup at Equatorial Mall, Shop 443.</div>}
        </div>
      </div>
    </div>
  )
}
