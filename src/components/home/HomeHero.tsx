'use client'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { src: '/hero/main-1.jpg', title: 'Elegance in every stitch', href: '/new' },
  { src: '/hero/main-2.jpg', title: 'Modesty for every day', href: '/women' },
  { src: '/hero/main-3.jpg', title: 'Refined styles for him', href: '/men' },
]

export default function HomeHero(){
  const [i,setI] = useState(0)
  const next = useCallback(()=> setI(v => (v+1)%slides.length), [])
  const prev = useCallback(()=> setI(v => (v-1+slides.length)%slides.length), [])
  useEffect(()=>{ const t = setInterval(next, 5000); return ()=>clearInterval(t) },[next])

  return (
    <section className="relative h-[60vh] sm:h-[64vh] md:h-[68vh] overflow-hidden rounded-2xl">
      {slides.map((s,idx)=> (
        <div key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ${idx===i?'opacity-100':'opacity-0'}`}>
          <Image src={s.src} alt={s.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-4 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold drop-shadow">{s.title}</h1>
              <Link href={s.href} className="inline-block mt-4 bg-white text-black px-5 py-2.5 rounded-md">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button aria-label="Prev" onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button aria-label="Next" onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_,idx)=> (
          <span key={idx}
            className={`h-1.5 w-6 rounded-full ${idx===i?'bg-white':'bg-white/50'}`} />
        ))}
      </div>
    </section>
  )
}