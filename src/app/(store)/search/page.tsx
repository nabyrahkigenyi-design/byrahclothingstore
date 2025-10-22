'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { UGX } from '@/lib/currency'

export default function SearchPage(){
  const sp = useSearchParams()
  const q = sp.get('q')||''
  const [items,setItems]=useState<any[]>([])
  useEffect(()=>{ if(!q) return; fetch(`/api/search?q=${encodeURIComponent(q)}`).then(r=>r.json()).then(setItems) },[q])
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Search results {q? `for “${q}”`: ''}</h1>
      {!q && <div className="text-sm text-gray-600 mt-2">Type in the header search box.</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {items.map(p=> (
          <Link key={p.id} href={`/product/${p.slug}`} className="group block">
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
              <Image src={p.img} alt={p.name} width={600} height={750} className="h-full w-full object-cover group-hover:scale-105 transition"/>
            </div>
            <div className="mt-2 text-sm">
              <div className="font-medium line-clamp-1">{p.name}</div>
              <div className="text-gray-600">{UGX.format(p.priceUGX)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
