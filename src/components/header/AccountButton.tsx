import Link from "next/link"
import { User } from "lucide-react"
import { getSession } from "@/lib/auth"

export default async function AccountButton() {
  const session = await getSession()
  const loggedIn = !!session?.user?.email

  return (
    <div className="flex items-center gap-3">
      {loggedIn ? (
        <Link href="/account" className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span className="hidden sm:inline">My Account</span>
        </Link>
      ) : (
        <Link href="/account/login" className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
      )}
    </div>
  )
}
