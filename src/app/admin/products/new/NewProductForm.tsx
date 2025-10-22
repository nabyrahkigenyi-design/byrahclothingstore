'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CategoryMulti from '@/components/admin/CategoryMulti'
import ImageUpload from '@/components/admin/ImageUpload'

type Cat = { id: number; name: string }

export default function NewProductForm({ cats }:{ cats:Cat[] }){
    const r = useRouter()
    // 💡 FIX: Initialize catIds as an array of numbers
    const [catIds,setCatIds] = useState<number[]>([]) 
    const [files,setFiles] = useState<File[]>([])
    const [loading,setLoading] = useState(false)

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setLoading(true)
        const fd = new FormData(e.currentTarget)
        
        // 💡 FIX: Iterate over number IDs and append them as strings
        catIds.forEach(id => fd.append('categoryIds', String(id))) 
        
        files.forEach(f => fd.append('images', f))
        
        const res = await fetch('/api/products', { method:'POST', body: fd })
        setLoading(false)
        if(res.ok) r.push('/admin/products')
        else alert('Failed to create product')
    }

    return (
        <form onSubmit={submit} className="max-w-2xl p-8 space-y-4">
            <h1 className="text-2xl font-semibold">Add product</h1>

            <input name="name" placeholder="Name" className="w-full border rounded px-3 py-2" required />
            <textarea name="description" placeholder="Description" className="w-full border rounded px-3 py-2" required />
            <input name="priceUGX" type="number" placeholder="Price in UGX" className="w-full border rounded px-3 py-2" required />
            <input name="sku" placeholder="SKU" className="w-full border rounded px-3 py-2" required />

            <div className="grid grid-cols-3 gap-2">
                <input name="sizes" placeholder="Sizes e.g. S,M,L or leave blank" className="border rounded px-3 py-2 col-span-2" />
                <input name="stock" type="number" placeholder="Stock per size" className="border rounded px-3 py-2" />
            </div>

            <input name="tags" placeholder="Tags comma separated, e.g. sale,new" className="w-full border rounded px-3 py-2" />

            <label className="block">Categories
                {/* 💡 FIX: Pass numbers for value and expect numbers for onChange */}
                <CategoryMulti value={catIds} onChange={setCatIds} options={cats} />
            </label>

            <div>
                <div className="font-medium mb-1">Images</div>
                <ImageUpload files={files} onChange={setFiles} />
            </div>

            <button className="bg-black text-white px-4 py-2 rounded-md" disabled={loading}>
                {loading ? 'Saving…' : 'Save'}
            </button>
        </form>
    )
}