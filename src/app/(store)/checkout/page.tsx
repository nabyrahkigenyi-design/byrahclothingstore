// src/app/(store)/checkout/page.tsx
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/account/login?next=/checkout')
  return <CheckoutClient />
}
