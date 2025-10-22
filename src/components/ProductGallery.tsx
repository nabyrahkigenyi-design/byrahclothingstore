'use client'
import Image from 'next/image'
import { useState } from 'react'
export default function ProductGallery({images}:{images:{url:string;alt:string}[]}){
const [i,setI] = useState(0)
const current = images[i] || {url:'/placeholder.jpg', alt:'product'}
return (
<div className="grid grid-cols-5 gap-3">
<div className="col-span-4 relative rounded-2xl overflow-hidden bg-gray-100 group">
  <Image
    src={current.url}
    alt={current.alt}
    width={1200}
    height={1200}
    className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-zoom-in"
  />
</div>

<div className="col-span-1 space-y-3 max-h-[560px] overflow-auto pr-1">
{images.map((img,idx)=> (
<button key={idx} onClick={()=>setI(idx)} className={`block aspect-square rounded-xl overflow-hidden border ${idx===i?'border-black':'border-transparent'}`}>
<Image src={img.url} alt={img.alt} width={200} height={200} className="w-full h-full object-cover"/>
</button>
))}
</div>
</div>
)
}