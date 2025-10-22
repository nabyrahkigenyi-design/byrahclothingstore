import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const links = [
  { href: "/policies/shipping", label: "Shipping & Delivery" },
  { href: "/policies/returns", label: "Returns & Exchanges" },
  { href: "/policies/size-guide", label: "Size Guide" },
  { href: "/policies/privacy", label: "Privacy Policy" },
  { href: "/policies/terms", label: "Terms of Service" },
]

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center gap-2">
          <li><Link className="hover:underline" href="/">Home</Link></li>
          <li>/</li>
          <li className="text-gray-700">Help & Policies</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-[260px_1fr] gap-8">
        <aside className="rounded-2xl border bg-white">
          <div className="px-4 py-4 font-semibold">Help & Policies</div>
          <Separator />
          <ul className="py-2">
            {links.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block px-4 py-2.5 text-sm hover:bg-gray-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </main>
  )
}
