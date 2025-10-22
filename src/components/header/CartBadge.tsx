// new file: src/components/header/CartBadge.tsx
'use client'
import { useEffect, useState } from 'react'
export default function CartBadge(){
  const [n,setN]=useState(0)
  useEffect(()=>{
    const read=()=>setN((JSON.parse(localStorage.getItem('cart')||'[]') as any[]).reduce((s,i)=>s+i.qty,0))
    read()
    window.addEventListener('storage', read)
    return ()=>window.removeEventListener('storage', read)
  },[])
  return <a href="/cart" className="text-xs">Cart ({n})</a>
}
