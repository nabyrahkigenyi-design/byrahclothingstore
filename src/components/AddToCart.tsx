'use client'
import { useState } from 'react'
import { addToCart } from '@/lib/cart'

export default function AddToCart({ item }:{ item:any }){
  const [ok,setOk]=useState(false)
  return (
    <button type="button" onClick={()=>{ addToCart(item); setOk(true) }} className="w-full md:w-auto bg-black text-white rounded-md px-6 py-3">
      {ok?'Added':'Add to cart'}
    </button>
  )
}
