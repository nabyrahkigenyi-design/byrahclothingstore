import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Shipping & Delivery – Byrah" }

const rows = [
  { label: "Delivery speed", value: "2 business days within Uganda" },
  { label: "Free shipping", value: "Orders ≥ UGX 150,000" },
  { label: "Standard fee", value: "UGX 10,000 (orders below threshold)" },
  { label: "Pickup", value: "Equatorial Mall, Shop 443, Kampala (Free)" },
  { label: "Dispatch days", value: "Mon–Sat (public holidays excluded)" },
]

export default function Page() {
  return (
    <div className="prose max-w-none">
      <header className="rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 to-black text-white">
        <div className="px-6 py-10">
          <h1 className="text-3xl font-semibold">Shipping & Delivery</h1>
          <p className="opacity-90 mt-2">
            Fast, reliable delivery across Uganda — or free pickup at Equatorial Mall, Shop 443.
          </p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <Separator className="my-4" />
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {rows.map(r => (
              <div key={r.label}>
                <dt className="text-gray-500">{r.label}</dt>
                <dd className="font-medium">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">How it works</h2>
          <Separator className="my-4" />
          <ol className="list-decimal ml-5 space-y-2 text-sm">
            <li>Place your order and choose <strong>Delivery</strong> or <strong>Pickup</strong>.</li>
            <li>We confirm stock and prepare your package.</li>
            <li>Delivered within <strong>2 business days</strong> (or ready for pickup same/next day).</li>
            <li>We’ll send updates by Email/SMS/WhatsApp.</li>
          </ol>
          <p className="mt-3 text-sm text-gray-600">
            Remote areas may require an extra day. We’ll notify you if timing changes.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <Separator className="my-4" />
        <h3 className="text-base font-semibold">Can I change my address after ordering?</h3>
        <p className="text-sm">Yes — contact us as soon as possible and we’ll update the shipment if it hasn’t left.</p>
        <h3 className="text-base font-semibold mt-4">What if I miss the delivery?</h3>
        <p className="text-sm">Courier will re-attempt, or we can hold the package for store pickup.</p>
      </div>
    </div>
  )
}
