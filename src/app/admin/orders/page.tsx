import { db } from "@/lib/prisma"
import Link from "next/link"

export const dynamic = "force-dynamic"

// Fixed in Step B: searchParams is awaited
type Props = { searchParams: Promise<{ status?:string; page?:string }> }

export default async function OrdersPage({ searchParams }:Props) {
  // Await searchParams (Fix from Step B)
  const sp = await searchParams
  
  const status = (sp.status || "").toUpperCase()
  
  // FIX D: Cast status as 'any' when included in the 'where' clause 
  // to correctly match the Prisma enum type and prevent filtering issues.
  const where = (status && ["PENDING","PAID","FULFILLED","CANCELLED","REFUNDED"].includes(status))
    ? { status: status as any }
    : {}
    
  const page = Math.max(1, Number(sp.page||"1"))
  const take = 20
  const skip = (page-1)*take

  const [orders, total] = await Promise.all([
    db.order.findMany({ where, orderBy:{ createdAt:"desc" }, include:{ items:true }, skip, take }),
    db.order.count({ where })
  ])
  const pages = Math.max(1, Math.ceil(total/take))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="space-x-2 text-sm">
          {["ALL","PENDING","PAID","FULFILLED","CANCELLED","REFUNDED"].map(s=>{
            const href = s==="ALL"? "/admin/orders" : `/admin/orders?status=${s}`
            const active = (s==="ALL" && !status) || s===status
            return <a key={s} href={href} className={active?"font-semibold underline":"hover:underline"}>{s}</a>
          })}
        </div>
      </div>
      <table className="w-full text-sm">
        <thead><tr className="text-left"><th>Date</th><th>Email</th><th>Status</th><th>Total</th><th>Items</th><th/></tr></thead>
        <tbody>
          {orders.map(o=>(
            <tr key={o.id} className="border-t">
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>{o.email}</td>
              <td>{o.status}</td>
              <td>{o.totalUGX.toLocaleString()} UGX</td>
              <td>{o.items.reduce((s,i)=>s+i.qty,0)}</td>
              <td><Link href={`/admin/orders/${o.id}`} className="underline">View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-2 text-sm">
        {Array.from({length: pages}, (_,i)=>i+1).map(p=>{
          const qs = new URLSearchParams()
          if(status) qs.set("status", status)
          qs.set("page", String(p))
          return <a key={p} href={`/admin/orders?${qs.toString()}`} className={`px-2 py-1 border rounded ${p===page?"bg-black text-white":""}`}>{p}</a>
        })}
      </div>
    </div>
  )
}
