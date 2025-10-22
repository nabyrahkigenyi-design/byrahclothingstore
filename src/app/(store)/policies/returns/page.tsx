import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Returns & Exchanges – Byrah" }

export default function Page() {
  return (
    <div className="prose max-w-none">
      <header className="rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
        <div className="px-6 py-10">
          <h1 className="text-3xl font-semibold">Returns & Exchanges</h1>
          <p className="opacity-90 mt-2">
            Shop with confidence — easy exchanges or returns within 7 days.
          </p>
        </div>
      </header>

      <div className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Policy Overview</h2>
        <Separator className="my-4" />
        <ul className="text-sm leading-6">
          <li>Return or exchange within <strong>7 days</strong> of delivery/pickup.</li>
          <li>Items must be <strong>unused</strong>, with tags and original packaging.</li>
          <li>Refunds go to the original payment method; store credit available.</li>
          <li>Bring your receipt or order number for faster service.</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3">
          Hygiene items (inner caps, under scarves, certain accessories) are final sale.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold">How to Start a Return</h3>
          <Separator className="my-4" />
          <ol className="list-decimal ml-5 text-sm space-y-2">
            <li>Visit our store or <a className="underline" href="/contact">contact us</a>.</li>
            <li>Provide order number, item(s), and reason.</li>
            <li>We inspect the item and process your exchange/refund.</li>
          </ol>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold">Damaged / Wrong Item</h3>
          <Separator className="my-4" />
          <p className="text-sm">
            If your order arrives damaged or incorrect, contact us within <strong>48 hours</strong> of receipt.
            We’ll replace or refund as quickly as possible.
          </p>
        </div>
      </div>
    </div>
  )
}
