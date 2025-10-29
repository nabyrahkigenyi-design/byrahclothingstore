'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function AdminLogin() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [err,setErr] = useState<string|null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErr(null)
    const res = await signIn('credentials', { redirect:false, email, password, callbackUrl:'/admin' })
    setLoading(false)
    if (res?.ok) window.location.href = '/admin'
    else setErr('Invalid admin credentials')
  }

  return (
    <div className="max-w-sm mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">Admin login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="w-full border rounded px-3 py-2" placeholder="Admin password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button className="w-full bg-black text-white rounded py-2" disabled={loading}>{loading?'Signing in…':'Sign in'}</button>
      </form>
    </div>
  )
}
