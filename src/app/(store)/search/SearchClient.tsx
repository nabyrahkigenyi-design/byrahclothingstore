"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

type Product = { id:string; slug:string; name:string; img?:string; priceUGX:number }

export default function SearchClient() {
  const sp = useSearchParams()
  const q = sp.get("q") || ""
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let ignore = false
    async function run() {
      if (!q) { setItems([]); return }
      setLoading(true)
      // Replace with your real search API
      const res = await fetch(`/api/products/lookup?q=${encodeURIComponent(q)}`)
      const data = res.ok ? await res.json() : []
      if (!ignore) setItems(data)
      setLoading(false)
    }
    run()
    return () => { ignore = true }
  }, [q])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Search</h1>
      {q ? <div className="mb-4 text-sm text-gray-600">Results for “{q}”</div> : <div className="text-gray-600">Type in the search box to find products.</div>}
      {loading && <div className="py-6">Searching…</div>}
      {!loading && !!items.length && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map(p => (
            <li key={p.id} className="border rounded-xl p-3">
              <Link href={`/product/${p.slug}`} className="block">
                <div className="aspect-[4/5] bg-gray-100 rounded-lg mb-2 overflow-hidden" />
                <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                <div className="text-xs text-gray-600 mt-1">{p.priceUGX.toLocaleString()} UGX</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!loading && q && items.length === 0 && <div className="py-6 text-gray-600">No results.</div>}
    </div>
  )
}
