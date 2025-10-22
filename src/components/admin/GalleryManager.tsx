'use client'
import { useState } from 'react'

type Img = { id:number; url:string; alt:string; position:number }
export default function GalleryManager({ productId, initial }:{ productId:number; initial:Img[] }) {
  const [imgs,setImgs] = useState(initial)
  async function add(e:React.ChangeEvent<HTMLInputElement>){
    const files = e.target.files; if(!files?.length) return
    const fd = new FormData(); Array.from(files).forEach(f=>fd.append('images',f))
    const res = await fetch(`/api/products/${productId}/images`, { method:'POST', body:fd })
    const created:Img[] = await res.json(); setImgs(x=>[...x,...created])
    e.currentTarget.value = ''
  }
  async function remove(id:number){
    await fetch(`/api/products/${productId}/images?id=${id}`, { method:'DELETE' })
    setImgs(x=>x.filter(i=>i.id!==id))
  }
  async function setPrimary(id:number){
    await fetch(`/api/products/${productId}/images`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    // primary gets position=1; re-fetch minimal
    const res = await fetch(`/api/products/${productId}/images?list=1`)
    setImgs(await res.json())
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Images</div>
        <label className="text-sm underline cursor-pointer">
          Add images<input type="file" multiple accept="image/*" className="hidden" onChange={add}/>
        </label>
      </div>
      {!!imgs.length && (
        <div className="grid grid-cols-3 gap-3">
          {imgs.sort((a,b)=>a.position-b.position).map(i=>(
            <div key={i.id} className="relative rounded-lg overflow-hidden border">
              <img src={i.url} alt={i.alt} className="w-full aspect-[4/5] object-cover"/>
              <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-xs flex">
                <button onClick={()=>setPrimary(i.id)} className="flex-1 py-1">{i.position===1?'Primary':'Make primary'}</button>
                <button onClick={()=>remove(i.id)} className="px-2 text-rose-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
