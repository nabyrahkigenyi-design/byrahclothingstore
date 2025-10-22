import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function AccountProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/account/login")

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Account</h1>
        <div className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/men">Men</Link>
          <Link href="/women">Women</Link>
          <Link href="/children">Children</Link>
        </div>
      </div>
      {children}
    </div>
  )
}
