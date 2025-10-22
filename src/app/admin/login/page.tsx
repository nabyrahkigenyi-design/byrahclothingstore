// src/app/admin/login/page.tsx
'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function AdminLogin(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('')
  async function submit(e:any){ e.preventDefault(); setErr('')
    const res = await signIn('credentials', { redirect:false, email, password })
    if(res?.ok) location.href='/admin'; else setErr('Invalid admin credentials')
  }
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-8 space-y-3">
      <h1 className="text-2xl font-semibold">Admin login</h1>
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <input className="w-full border rounded px-3 py-2" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" type="password" placeholder="Admin password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2 rounded-md w-full">Login</button>
    </form>
  )
}
