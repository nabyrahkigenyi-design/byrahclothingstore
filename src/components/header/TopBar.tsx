import { Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
export default function TopBar(){
return (
<div className="w-full bg-black text-white text-xs py-2">
<div className="max-w-6xl mx-auto flex items-center justify-between px-4">
<div className="flex items-center gap-3">
<span className="hidden md:inline">Free shipping in UG on orders ≥ UGX 150,000</span>
</div>
<div className="flex items-center gap-4">
<a href="https://maps.app.goo.gl/" className="flex items-center gap-1"><MapPin className="h-3 w-3"/> Equatorial Mall, Shop 443</a>
<a aria-label="Instagram" href="#"><Instagram className="h-4 w-4"/></a>
<a aria-label="Facebook" href="#"><Facebook className="h-4 w-4"/></a>
<a aria-label="Twitter" href="#"><Twitter className="h-4 w-4"/></a>
</div>
</div>
</div>
)
}