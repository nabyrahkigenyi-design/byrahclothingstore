'use client'
import { useEffect, useMemo, useState } from 'react'
import { getCart, CartItem } from '@/lib/cart'
import ky from 'ky'

type FormState = { name: string; email: string; phone: string; line1: string; city: string; region: string; postal: string }
type Method = 'pickup_cash'|'bank_transfer'

export default function CheckoutClient(){
  const [cart,setCart]=useState<CartItem[]>([])
  const [pickup,setPickup]=useState(false)
  const [method,setMethod]=useState<Method>('pickup_cash')
  const [form,setForm]=useState<FormState>({ name:'', email:'', phone:'', line1:'', city:'Kampala', region:'', postal:'' })
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(()=>{ setCart(getCart()) },[])
  
  const subtotal = useMemo(()=> cart.reduce((s,i)=>s+i.priceUGX*i.qty,0),[cart])
  const ship = pickup?0:(subtotal>=150000?0:10000)
  const total = subtotal+ship

  async function place(){
    setErrorMsg('');
    setLoading(true);

    const cartNum = cart.map(i => ({
      ...i,
      productId: Number(i.productId),
      variantId: Number(i.variantId),
      priceUGX: Number(i.priceUGX),
      qty: Number(i.qty),
    }))

    try {
      const order = await ky.post('/api/orders', { 
        json:{ 
          pickup, 
          items: cartNum, 
          address: pickup? null : form, 
          email: form.email, 
          method 
        } 
      }).json<{id:string}>()
      
      await ky.post('/api/orders/confirm-manual', { json:{ id: order.id, method } })
      location.href = `/checkout/verify?status=successful&id=${order.id}`

    } catch (e: any) {
      console.error("Checkout failed:", e);
      if (e?.response) {
        const errorText = await e.response.text();
        setErrorMsg(errorText || 'An unknown API error occurred.');
      } else {
        setErrorMsg('Checkout failed: Please check your network connection.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <label className="flex items-center gap-2"><input type="checkbox" checked={pickup} onChange={e=>setPickup(e.target.checked)} /> Pickup at Equatorial Mall, Shop 443</label>
        {!pickup && (
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2 col-span-2"/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border rounded px-3 py-2"/>
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border rounded px-3 py-2"/>
            <input placeholder="Address line" value={form.line1} onChange={e=>setForm({...form,line1:e.target.value})} className="border rounded px-3 py-2 col-span-2"/>
            <input placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} className="border rounded px-3 py-2"/>
            <input placeholder="Region" value={form.region} onChange={e=>setForm({...form,region:e.target.value})} className="border rounded px-3 py-2"/>
            <input placeholder="Postal" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})} className="border rounded px-3 py-2"/>
          </div>
        )}
        <div className="mt-4">
          <div className="font-medium">Payment method</div>
          <div className="space-y-2 text-sm mt-2">
            <label className="flex items-center gap-2"><input type="radio" checked={method==='pickup_cash'} onChange={()=>setMethod('pickup_cash')} /> Pay on Pickup (cash/mobile money in-store)</label>
            <label className="flex items-center gap-2"><input type="radio" checked={method==='bank_transfer'} onChange={()=>setMethod('bank_transfer')} /> Manual transfer (we send instructions)</label>
          </div>
        </div>
      </div>
      <div>
        <div className="border rounded-2xl p-6 space-y-2">
          <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toLocaleString()} UGX</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{pickup? '0' : (ship? ship.toLocaleString()+' UGX':'Free')}</span></div>
          <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{total.toLocaleString()} UGX</span></div>
          
          {errorMsg && (
            <div className="p-2 text-sm text-white bg-red-500 rounded-md">
              Error: {errorMsg}
            </div>
          )}

          <button 
            onClick={place} 
            className="w-full bg-black text-white rounded-md py-3 mt-2 disabled:bg-gray-400" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place order'}
          </button>
          
          <div className="text-xs text-gray-600">Delivery in 2 business days in Uganda.</div>
        </div>
      </div>
    </div>
  )
}
