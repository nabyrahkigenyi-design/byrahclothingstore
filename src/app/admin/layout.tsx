// src/app/admin/layout.tsx
import { redirect } from "next/navigation"
import Link from "next/link"
import { getSession } from "@/lib/auth"
import SignOutBtn from "@/components/admin/SignOutBtn"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect("/account/login?admin=1")
  if ((session as any).role !== "ADMIN") redirect("/")
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Admin</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
          <SignOutBtn />
        </nav>
      </header>
      {children}
    </div>
  )
}
