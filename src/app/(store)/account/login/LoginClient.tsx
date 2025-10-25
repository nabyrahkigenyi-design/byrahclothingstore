"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginClient() {
  const sp = useSearchParams()
  const isAdmin = sp.get("admin") === "1"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault()
    await signIn("email", { email, callbackUrl: "/account" })
  }

  async function submitAdmin(e: React.FormEvent) {
    e.preventDefault()
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">{isAdmin ? "Admin sign in" : "Sign in"}</h1>

      {isAdmin ? (
        <form onSubmit={submitAdmin} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            required
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button className="w-full bg-black text-white rounded px-4 py-2">Sign in</button>
        </form>
      ) : (
        <form onSubmit={submitEmail} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button className="w-full bg-black text-white rounded px-4 py-2">Send magic link</button>
          <div className="text-center text-sm text-gray-600">
            Admin? <a href="/account/login?admin=1" className="underline">Go to admin login</a>
          </div>
        </form>
      )}
    </div>
  )
}
