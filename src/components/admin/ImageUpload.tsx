'use client'
import { useRef, useState, useEffect } from 'react'

export default function ImageUpload({
  files,
  onChange,
}:{
  files: File[]
  onChange: (files: File[])=>void
}){
  const inputRef = useRef<HTMLInputElement|null>(null)
  const [previews,setPreviews] = useState<string[]>([])

  useEffect(()=>{
    const urls = files.map(f=>URL.createObjectURL(f))
    setPreviews(urls)
    return ()=> urls.forEach(u=>URL.revokeObjectURL(u))
  },[files])

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e)=> onChange(Array.from(e.target.files||[]))}
      />
      <button type="button" className="border rounded px-3 py-2"
        onClick={()=>inputRef.current?.click()}>
        Select images
      </button>
      {!!previews.length && (
        <div className="grid grid-cols-4 gap-2">
          {previews.map((src,i)=>(
            <div key={i} className="aspect-square rounded overflow-hidden border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
      )}
      {!previews.length && <div className="text-sm text-gray-500">No images selected</div>}
    </div>
  )
}
