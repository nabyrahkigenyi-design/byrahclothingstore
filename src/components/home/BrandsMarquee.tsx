'use client'
import Image from 'next/image'
import { useMemo } from 'react'

type BrandLogo = {
  src: string
  alt: string
}

const BRANDS: BrandLogo[] = [
  { src: '/brands/brand1.svg', alt: 'Brand 1' },
  { src: '/brands/brand2.svg', alt: 'Brand 2' },
  { src: '/brands/brand3.svg', alt: 'Brand 3' },
  { src: '/brands/brand4.svg', alt: 'Brand 4' },
  { src: '/brands/brand5.svg', alt: 'Brand 5' },
]

export default function BrandsMarquee() {
  const logos: BrandLogo[] = useMemo(() => [...BRANDS, ...BRANDS], [])

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex items-center animate-[marquee_22s_linear_infinite]"
        style={{ width: 'max-content' }}
        aria-label="Sister brands carousel"
      >
        {logos.map((b, i) => (
          <div
            key={`${b.src}-${i}`}
            className="shrink-0 opacity-80 hover:opacity-100 transition-opacity mx-8 sm:mx-12"
          >
            <Image
              src={b.src}
              alt={b.alt}
              width={160}
              height={48}
              className="h-8 sm:h-10 lg:h-12 w-auto"
              priority={i < 5}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}