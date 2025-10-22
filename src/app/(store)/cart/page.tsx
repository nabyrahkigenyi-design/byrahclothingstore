'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { getCart, updateQty, removeItem } from '@/lib/cart'
import { UGX, FREE_SHIP_THRESHOLD, shippingFor } from '@/lib/currency'

export default function CartPage(){
  const [cart,setCart]=useState<any[]>([])
  useEffect(()=>{ setCart(getCart()) },[])
  const subtotal = useMemo(()=> cart.reduce((s,i)=>s+i.priceUGX*i.qty,0),[cart])
  const ship = shippingFor(subtotal), total=subtotal+ship

  function changeQty(id:number, q:number){ updateQty(id,q); setCart(getCart()) }
  function remove(id:number){ removeItem(id); setCart(getCart()) }

  if(!cart.length) return <div className="max-w-4xl mx-auto px-4 py-14">Your cart is empty.</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {cart.map(i=>(
          <div key={i.variantId} className="flex items-center gap-4 border rounded-xl p-3">
            <img src={i.img} alt={i.name} className="w-20 h-24 object-cover rounded"/>
            <div className="flex-1">
              <Link href={`/product/${i.slug}`} className="font-medium hover:underline">{i.name}</Link>
              <div className="text-sm text-gray-600">Size {i.size}</div>
              <div className="mt-2 flex items-center gap-2">
                <input type="number" min={1} value={i.qty} onChange={e=>changeQty(i.variantId, Number(e.target.value)||1)}
                       className="w-20 border rounded px-2 py-1"/>
                <button onClick={()=>remove(i.variantId)} className="text-rose-600 text-sm underline">Remove</button>
              </div>
            </div>
            <div className="w-28 text-right">{UGX.format(i.priceUGX*i.qty)}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="border rounded-2xl p-6 space-y-2">
          <div className="flex justify-between"><span>Subtotal</span><span>{UGX.format(subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{ship?UGX.format(ship):'Free'}</span></div>
          <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{UGX.format(total)}</span></div>
          <Link href="/checkout" className="block text-center bg-black text-white rounded-md py-3 mt-3">Checkout</Link>
          <div className="text-xs text-gray-600">Free shipping ≥ UGX {FREE_SHIP_THRESHOLD.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
