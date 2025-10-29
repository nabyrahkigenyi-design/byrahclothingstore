import Link from 'next/link'
import Image from 'next/image'
import { UGX } from '@/lib/currency'

export default function ProductCard({ p }: { p: any }) {
  const img = p.images?.[0]?.url || '/placeholder.jpg'
  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={img}
          alt={p.name}
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-2 sm:mt-3">
        <h3 className="text-sm sm:text-base line-clamp-2">{p.name}</h3>
        <div className="mt-1 text-sm sm:text-base font-semibold">{UGX.format(p.priceUGX)}</div>
        <button className="mt-2 w-full sm:w-auto sm:px-4 px-3 py-2 rounded-md border text-sm hover:bg-gray-50">
          Add to cart
        </button>
      </div>
    </Link>
  )
}