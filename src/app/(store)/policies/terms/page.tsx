import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Terms of Service – Byrah" }

export default function Page() {
  return (
    <div className="prose max-w-none">
      <header className="rounded-2xl overflow-hidden bg-gradient-to-r from-stone-800 to-stone-900 text-white">
        <div className="px-6 py-10">
          <h1 className="text-3xl font-semibold">Terms of Service</h1>
          <p className="opacity-90 mt-2">Please read these terms carefully before using our website.</p>
        </div>
      </header>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Ordering & Availability</h2>
        <Separator className="my-4" />
        <ul className="text-sm">
          <li>Placing an order constitutes an offer to purchase. We may accept or cancel due to stock or pricing errors.</li>
          <li>Prices and availability are subject to change without notice.</li>
          <li>We may limit quantities to prevent abuse or resale.</li>
        </ul>
      </section>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Payments & Risk</h2>
        <Separator className="my-4" />
        <ul className="text-sm">
          <li>Payments are processed securely by our partners; we don’t store card numbers.</li>
          <li>Risk of loss passes on delivery or pickup collection.</li>
        </ul>
      </section>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Returns</h2>
        <Separator className="my-4" />
        <p className="text-sm">See <a className="underline" href="/policies/returns">Returns & Exchanges</a> for details.</p>
      </section>
    </div>
  )
}
