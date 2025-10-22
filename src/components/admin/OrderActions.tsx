'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function OrderActions({ id }:{ id:number|string }) {
  const r = useRouter()
  const [p,start] = useTransition()
  async function hit(path:string){
    await fetch(path,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    r.refresh()
  }
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={()=>start(()=>hit('/api/admin/orders/mark-paid'))} className="px-3 py-1.5 rounded bg-emerald-600 text-white" disabled={p}>Mark paid</button>
      <button onClick={()=>start(()=>hit('/api/admin/orders/fulfill'))} className="px-3 py-1.5 rounded bg-indigo-600 text-white" disabled={p}>Fulfill</button>
      <button onClick={()=>start(()=>hit('/api/admin/orders/cancel'))} className="px-3 py-1.5 rounded bg-rose-600 text-white" disabled={p}>Cancel</button>
      <button onClick={()=>start(()=>hit('/api/admin/orders/refund'))} className="px-3 py-1.5 rounded bg-amber-600 text-white" disabled={p}>Refund</button>
    </div>
  )
}
