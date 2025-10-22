'use client'
import { useRouter } from 'next/navigation'
import CategoryMulti from './CategoryMulti'

type Cat = { id:number; name:string }
type Variant = { size:string; stock:number }
type ProductCategory = { categoryId:number }
type Product = { 
    id:number; 
    name:string; 
    description:string; 
    priceUGX:number; 
    sku:string; 
    variants:Variant[]; 
    categories:ProductCategory[]; 
}

export default function EditProductForm({ product, cats }:{ product:Product; cats:Cat[] }) {
    const r = useRouter()
    const initialCategoryIds = product.categories.map(c=>c.categoryId)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        
        const categoryIdsString = String(fd.get('categoryIds')||'')
        const categoryIds = categoryIdsString.split(',').filter(Boolean).map(Number)
        
        const sizesStock = String(fd.get('sizesStock')||'')
        
        const body = {
            name: fd.get('name'),
            description: fd.get('description'),
            priceUGX: Number(fd.get('priceUGX')),
            sku: fd.get('sku'),
            categoryIds: categoryIds, 
            variants: sizesStock
                ? sizesStock.split(',').map(s=>{ 
                    const [sz,q]=s.split(':').map(t=>t.trim()); 
                    return { size:sz, stock:Number(q||0) } 
                  })
                : [{ size:'One Size', stock: Number(fd.get('stock')||10) }]
        }
        
        const res = await fetch(`/api/products/${product.id}`, { 
            method:'PUT', 
            headers:{'Content-Type':'application/json'}, 
            body: JSON.stringify(body) 
        })
        
        if(res.ok) {
            r.push('/admin/products')
        } else {
            alert(await res.text())
        }
    }

    async function onDelete() {
        if(!confirm('Delete this product?')) return
        const res = await fetch(`/api/products/${product.id}`, { method:'DELETE' })
        if(res.ok) r.push('/admin/products')
        else alert(await res.text())
    }

    return (
        <form onSubmit={onSubmit} className="max-w-2xl p-8 space-y-6">
            <h1 className="text-2xl font-bold">Edit product</h1>
            
            <label className="block">Name
                <input name="name" defaultValue={product.name} required className="w-full border rounded px-3 py-2 mt-1"/>
            </label>
            
            <label className="block">Description
                <textarea name="description" defaultValue={product.description} className="w-full border rounded px-3 py-2 mt-1"/>
            </label>
            
            <div className="flex gap-4">
                <label className="block flex-1">Price (UGX)
                    <input name="priceUGX" type="number" defaultValue={product.priceUGX} required min="0" className="w-full border rounded px-3 py-2 mt-1"/>
                </label>
                <label className="block flex-1">SKU
                    <input name="sku" defaultValue={product.sku} required className="w-full border rounded px-3 py-2 mt-1" />
                </label>
            </div>
            
            <label className="block">Categories
                <CategoryMulti 
                    options={cats} 
                    initialValues={initialCategoryIds} 
                    name="categoryIds" 
                />
            </label>
            
            <label className="block">Sizes and Stock
                <input 
                    name="sizesStock" 
                    defaultValue={product.variants.map(v=>`${v.size}:${v.stock}`).join(',')} 
                    className="mt-1 border rounded px-3 py-2 w-full"
                />
            </label>
            
            <div className="pt-4 flex gap-3">
                <button type="submit" className="bg-black text-white px-6 py-2 rounded-md">Save</button>
                <button type="button" onClick={onDelete} className="px-6 py-2 rounded-md border border-red-500 text-red-600">Delete</button>
            </div>
        </form>
    )
}