// src/components/header/AccountButton.tsx
import { User } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function AccountButton() {
  const session = await getServerSession(authOptions)
  return (
    <Link href={session ? '/account' : '/account/login'} className="inline-flex items-center gap-2 text-sm hover:opacity-80">
      <User className="h-5 w-5" /><span className="hidden sm:inline">{session?'My account':'Sign in'}</span>
    </Link>
  )
}
