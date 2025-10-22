'use client'
import { signOut } from 'next-auth/react'

export default function SignOutBtn() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: '/account/login' })}
      className="text-red-600 text-sm"
    >
      Sign out
    </button>
  )
}
