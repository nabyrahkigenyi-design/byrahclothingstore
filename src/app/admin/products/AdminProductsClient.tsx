'use client'
import { useState } from 'react'
import Link from 'next/link'

type Row = {
  id: string
  name: string
  sku: string
  priceUGX: number
  variants?: { stock: number }[]
}

export default function AdminProductsClient({ list = [] as Row[] }:{
  list?: Row[]
}){
  const [rows,setRows] = useState<Array<Row>>(Array.isArray(list) ? list : [])

  async function del(id: string){
    if(!confirm('Delete this product?')) return
    const res = await fetch(`/api/products/${id}`, { method:'DELETE' })
    if(res.ok) setRows(r => r.filter(x => x.id !== id))
  }

  if(!rows.length){
    return (
      <div className="border rounded-xl p-6 text-sm text-gray-600">
        No products yet.
      </div>
    )
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left">
          <th>Name</th><th>SKU</th><th>Price</th><th>Stock</th><th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map(p=>(
          <tr key={p.id} className="border-t">
            <td className="py-2">{p.name}</td>
            <td>{p.sku}</td>
            <td>{p.priceUGX.toLocaleString()}</td>
            <td>{(p.variants ?? []).reduce((s,v)=>s+Number(v.stock||0),0)}</td>
            <td className="space-x-3">
              <Link href={`/admin/products/${p.id}`} className="underline">Edit</Link>
              <button onClick={()=>del(p.id)} className="text-rose-600 underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
