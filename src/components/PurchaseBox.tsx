'use client'
import { useMemo, useState } from 'react'
import { addToCart } from '@/lib/cart'

type Variant = { id:number; size:string; stock:number }
export default function PurchaseBox({ product }:{ product:{
    id:string; name:string; priceUGX:number; images:{url:string}[]; variants:Variant[]
}}){
    const first = useMemo(()=>product.variants.find(v=>v.stock>0)?.id,[product.variants])
    const [vid,setVid] = useState<number>(first ?? 0)
    const v = product.variants.find(x=>x.id===vid)
    const [qty,setQty] = useState<number>(1)
    const canAdd = !!v && v.stock>0 && qty>=1
    
    const [added, setAdded] = useState(false)

    function add(){
        if(!canAdd) return
        
        addToCart({
            productId: Number(product.id), // Ensure you convert the string back to a number here if addToCart expects a number
            variantId: vid,
            name: product.name,
            img: product.images[0]?.url || '/placeholder.jpg',
            size: v!.size,
            priceUGX: product.priceUGX,
            qty
        })
        
        setAdded(true)
        
        setTimeout(() => {
            setAdded(false)
        }, 2000)
    }

    const buttonText = added ? 'Added! ✅' : 'Add to cart'
    const buttonClass = added 
        ? "w-full md:w-auto bg-green-600 text-white rounded-md px-6 py-3 disabled:opacity-50 transition-colors duration-200"
        : "w-full md:w-auto bg-black text-white rounded-md px-6 py-3 disabled:opacity-50 transition-colors duration-200"

    return (
        <div className="space-y-3">
            <label className="block">Size
                <select className="mt-1 border rounded-md px-3 py-2 w-full"
                    value={vid||''}
                    onChange={e=>{ setVid(Number(e.target.value)); setQty(1) }}>
                    {product.variants.map(v=>(
                        <option key={v.id} value={v.id} disabled={v.stock<=0}>
                            {v.size}{v.stock<=0?' (Out of stock)':''}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block">Qty
                <input type="number" className="mt-1 border rounded-md px-3 py-2 w-24"
                    min={1} max={Math.max(1, v?.stock ?? 1)}
                    value={qty}
                    onChange={e=>setQty(Math.max(1, Math.min(Number(e.target.value||1), v?.stock ?? 1)))} />
                {v && <span className="ml-2 text-xs text-gray-500">In stock: {v.stock}</span>}
            </label>
            <button type="button" onClick={add} disabled={!canAdd || added}
                className={buttonClass}>
                {buttonText}
            </button>
        </div>
    )
}