// src/components/header/TopBar.tsx
import { MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export default function TopBar(){
  return (
    <div className="w-full bg-black text-white text-[11px] sm:text-xs py-2">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="hidden md:inline">Free shipping in UG on orders ≥ UGX 150,000</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://maps.app.goo.gl/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 opacity-90 hover:opacity-100 transition"
          >
            <MapPin className="h-3 w-3" />
            <span className="hidden sm:inline">Equatorial Mall, Shop 443</span>
            <span className="sm:hidden">Location</span>
          </a>
          <a aria-label="Instagram" href="#" className="opacity-90 hover:opacity-100 transition"><Instagram className="h-4 w-4"/></a>
          <a aria-label="Facebook" href="#" className="opacity-90 hover:opacity-100 transition"><Facebook className="h-4 w-4"/></a>
          <a aria-label="Twitter" href="#" className="opacity-90 hover:opacity-100 transition"><Twitter className="h-4 w-4"/></a>
        </div>
      </div>
    </div>
  )
}
