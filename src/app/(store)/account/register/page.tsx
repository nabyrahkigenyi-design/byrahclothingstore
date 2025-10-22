// src/app/(store)/account/register/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register(){
  const r = useRouter()
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('')
  async function submit(e:any){ e.preventDefault(); setErr('')
    const res = await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) })
    if(res.ok) r.push('/account/login?next=/checkout'); else setErr((await res.json()).error||'Failed')
  }
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-8 space-y-3">
      <h1 className="text-2xl font-semibold">Create account</h1>
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <input className="w-full border rounded px-3 py-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2 rounded-md w-full">Create account</button>
    </form>
  )
}
