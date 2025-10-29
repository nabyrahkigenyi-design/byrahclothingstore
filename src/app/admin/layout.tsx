// src/app/admin/layout.tsx
import { redirect } from "next/navigation"
import Link from "next/link"
import { getSession } from "@/lib/auth"
import SignOutBtn from "@/components/admin/SignOutBtn"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect("/account/login?admin=1")

  const role = (session.user as any)?.role
  if (role !== "ADMIN") redirect("/")

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold">Admin</h1>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
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
