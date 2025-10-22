import Link from 'next/link'
import Image from 'next/image'
import { UGX } from '@/lib/currency'
export default function ProductCard({p}:{p:any}){
const img = p.images?.[0]?.url || '/placeholder.jpg'
return (
<Link href={`/product/${p.slug}`} className="group block">
<div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
<Image src={img} alt={p.name} width={600} height={750} className="h-full w-full object-cover transition-transform group-hover:scale-105"/>
</div>
<div className="mt-2 text-sm">
<div className="font-medium line-clamp-1">{p.name}</div>
<div className="text-gray-600">{UGX.format(p.priceUGX)}</div>
</div>
</Link>
)
}