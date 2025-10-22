// src/app/(store)/account/login/page.tsx
"use client"
import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const sp = useSearchParams()
  const isAdmin = sp.get("admin") === "1"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submitCustomer(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setErr(null)
    const res = await signIn("email", { email, redirect: false, callbackUrl: "/account/(protected)" })
    setLoading(false)
    if (res?.error) setErr(res.error)
    else setSent(true)
  }

  async function submitAdmin(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setErr(null)
    const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/admin" })
    setLoading(false)
    if (res?.error) setErr(res.error)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">{isAdmin ? "Admin sign in" : "Sign in to Byrah"}</h1>

      {!isAdmin && !sent && (
        <form onSubmit={submitCustomer} className="space-y-3">
          <input
            type="email" required value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="you@example.com" className="w-full border rounded px-3 py-2"
          />
          <button disabled={loading} className="w-full bg-black text-white rounded px-4 py-2">
            {loading ? "Sending link…" : "Send magic link"}
          </button>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <p className="text-xs text-gray-600">We’ll email you a secure sign-in link.</p>
        </form>
      )}

      {!isAdmin && sent && (
        <div className="text-sm">
          <p>Check your email for a sign-in link. Keep this tab open — you’ll be redirected after clicking the link.</p>
        </div>
      )}

      {isAdmin && (
        <form onSubmit={submitAdmin} className="space-y-3">
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="admin@byrah.store" className="w-full border rounded px-3 py-2" />
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
            placeholder="Admin password" className="w-full border rounded px-3 py-2" />
          <button disabled={loading} className="w-full bg-black text-white rounded px-4 py-2">
            {loading ? "Signing in…" : "Sign in"}
          </button>
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>
      )}

      {!isAdmin && (
        <div className="mt-6 text-xs text-gray-500">
          Admin? <a className="underline" href="/account/login?admin=1">Go to admin login</a>
        </div>
      )}
    </div>
  )
}
