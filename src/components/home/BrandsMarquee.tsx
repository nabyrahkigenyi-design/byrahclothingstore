// src/components/home/BrandsMarquee.tsx
'use client'
import Image from 'next/image'

const LOGOS = [
  '/brands/brand1.svg',
  '/brands/brand2.svg',
  '/brands/brand3.svg',
  '/brands/brand4.svg',
  '/brands/brand5.svg',
]

// duplicate for seamless loop
const LOOP = [...LOGOS, ...LOGOS]

export default function BrandsMarquee() {
  return (
    <div className="relative">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

      <div className="overflow-hidden">
        {/* Start off-screen right with padding-left: 100vw, then scroll left */}
        <div
          className="flex gap-28 pl-[100vw] animate-[brands-move_var(--speed)_linear_infinite] will-change-transform"
          style={{ ['--speed' as any]: '32s' }}
        >
          {LOOP.map((src, i) => (
            <div key={i} className="shrink-0 opacity-90 hover:opacity-100 transition">
              <Image
                src={src}
                alt=""
                width={320}
                height={100}
                className="h-[100px] md:h-[84px] w-auto object-contain"
                priority={i < 6}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes brands-move {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
