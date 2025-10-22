'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'


export default function RecentlyViewed({currentId}:{currentId:string}){
const [items,setItems] = useState<{id:string; slug:string; name:string; img:string}[]>([])
useEffect(()=>{
const key = 'recently-viewed'
const list = JSON.parse(localStorage.getItem(key) || '[]') as any[]
const next = [{ id: currentId }, ...list.filter(x=>x.id!==currentId)].slice(0,12)
localStorage.setItem(key, JSON.stringify(next))
// fetch details for display
fetch(`/api/products?ids=${next.map(x=>x.id).join(',')}`).then(r=>r.json()).then(setItems)
},[currentId])
if(!items.length) return null
return (
<section className="mt-10">
<h2 className="text-lg font-semibold mb-4">Recently viewed</h2>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
{items.map(p=> (
<Link key={p.id} href={`/product/${p.slug}`} className="block">
<div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden">
<Image src={p.img} alt={p.name} width={400} height={500} className="w-full h-full object-cover"/>
</div>
<div className="mt-1 text-xs line-clamp-1">{p.name}</div>
</Link>
))}
</div>
</section>
)
}