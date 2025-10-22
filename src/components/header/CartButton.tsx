'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { onCartChange, getCart } from '@/lib/cart'

export default function CartButton(){
  const [count,setCount]=useState(0)
  useEffect(()=>{
    const sync=()=>setCount(getCart().reduce((s,i)=>s+i.qty,0))
    sync(); return onCartChange(sync)
  },[])
  return (
    <Link href="/cart" className="relative rounded-md px-3 py-1.5 hover:bg-gray-100">
      <span>Cart</span>
      {!!count && (
        <span className="absolute -right-2 -top-2 text-[10px] bg-black text-white rounded-full px-1.5">
          {count}
        </span>
      )}
    </Link>
  )
}
