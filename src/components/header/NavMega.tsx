'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'


type Subcat = { name:string; slug:string }
type Mega = { label:string; slug:string; hero?:string; groups: { title?:string; items: Subcat[] }[] }


const MEGA: Mega[] = [
{ label:'New', slug:'new', groups:[{ items: [] }], hero:'/hero/new.jpg' },
{ label:'Women', slug:'women', hero:'/hero/women.jpg', groups:[
{ title:'Hijabs', items:[{name:'Chiffon Hijab',slug:'chiffon-hijab'},{name:'Jersey Hijab',slug:'jersey-hijab'},{name:'Silk Hijab',slug:'silk-hijab'}] },
{ title:'Categories', items:[{name:'Abaya',slug:'abaya'},{name:'Sports wear',slug:'sports-wear'},{name:'Khimar',slug:'khimar'},{name:'Party wear',slug:'party-wear'}] }
]},
{ label:'Men', slug:'men', hero:'/hero/men.jpg', groups:[
{ title:'Qamees', items:[{name:'Saudi Qamees',slug:'saudi-qamees'},{name:'Emirati Qamees',slug:'emirati-qamees'},{name:'Misr Qamees',slug:'misr-qamees'},{name:'Embroidered Qamees',slug:'embroidered-qamees'}] },
{ title:'More', items:[{name:'Moroccan Kandora',slug:'moroccan-kandora'},{name:'Men pants',slug:'men-pants'},{name:'Kufi / Hats',slug:'kufi-hats'}] }
]},
{ label:'Children', slug:'children', hero:'/hero/children.jpg', groups:[
{ title:'Boys', items:[{name:'Qamees boys',slug:'qamees-boys'},{name:'Kandora boys',slug:'kandora-boys'},{name:'Beanies',slug:'beanies'}] },
{ title:'Girls', items:[{name:'Hijab girls',slug:'hijab-girls'}] }
]},
{ label:'Sale', slug:'sale', groups:[{ items: [] }], hero:'/hero/sale.jpg' },
]


export default function NavMega(){
const [open, setOpen] = useState<number|null>(null)
return (
<nav className="hidden md:flex items-center gap-6">
{MEGA.map((m,i)=> (
<div key={m.slug}
onMouseEnter={()=>setOpen(i)} onMouseLeave={()=>setOpen(o=>o===i?null:o)}
className="relative">
<Link href={`/${m.slug}`} className="flex items-center gap-1 hover:opacity-80">
<span className="font-medium">{m.label}</span>
<ChevronDown className="h-4 w-4" />
</Link>
<AnimatePresence>
{open===i && (
<motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0,y:8}}
className="absolute left-1/2 -translate-x-1/2 top-10 z-40 w-[820px] bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 grid grid-cols-3 gap-6">
<div className="col-span-2 grid grid-cols-2 gap-6">
{m.groups.map((g,gi)=> (
<div key={gi}>
{g.title && <div className="text-xs uppercase text-gray-500 mb-2">{g.title}</div>}
<ul className="space-y-2">
{g.items.map(it=> (
<li key={it.slug}><Link href={`/${m.slug}?c=${it.slug}`} className="hover:underline">{it.name}</Link></li>
))}
</ul>
</div>
))}
</div>
<div className="relative h-44 rounded-xl overflow-hidden">
{m.hero && <Image src={m.hero} alt="category" fill className="object-cover"/>}
</div>
</motion.div>
)}
</AnimatePresence>
</div>
))}
</nav>
)
}