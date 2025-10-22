import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Privacy Policy – Byrah" }

export default function Page() {
  return (
    <div className="prose max-w-none">
      <header className="rounded-2xl overflow-hidden bg-gradient-to-r from-sky-700 to-sky-900 text-white">
        <div className="px-6 py-10">
          <h1 className="text-3xl font-semibold">Privacy Policy</h1>
          <p className="opacity-90 mt-2">We respect your privacy and collect only what we need to serve you.</p>
        </div>
      </header>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">What we collect</h2>
        <Separator className="my-4" />
        <ul className="text-sm">
          <li>Account details: name, email, phone.</li>
          <li>Addresses for shipping & pickup coordination.</li>
          <li>Order information and preferences.</li>
          <li>Payment processing via trusted gateways (we don’t store card numbers).</li>
        </ul>
      </section>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">How we use data</h2>
        <Separator className="my-4" />
        <ul className="text-sm">
          <li>Process orders, deliveries, and pickups.</li>
          <li>Provide customer support and order updates.</li>
          <li>Detect and prevent fraud or abuse.</li>
          <li>Improve products, content, and shopping experience.</li>
        </ul>
      </section>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Your choices</h2>
        <Separator className="my-4" />
        <ul className="text-sm">
          <li>Request a copy or deletion of your data by emailing <a href="mailto:hello@byrah.store">hello@byrah.store</a>.</li>
          <li>Opt out of marketing messages at any time.</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3">
          We never sell personal data. Minimal cookies are used for session and cart functionality.
        </p>
      </section>
    </div>
  )
}
