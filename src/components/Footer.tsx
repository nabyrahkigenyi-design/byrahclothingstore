'use client'

import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";

const EMAIL = process.env.NEXT_PUBLIC_STORE_EMAIL || "nabyrahkigenyi@gmail.com" // Set default to original hardcoded value
const PHONE = process.env.NEXT_PUBLIC_STORE_PHONE || "+256702486205" // Set default to original hardcoded value
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-16 bg-neutral-950 text-neutral-200">
      {/* top */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        {/* brand / contact */}
        <div>
          <div className="text-xl font-semibold">Byrah Clothing Store</div>
          <p className="mt-2 text-sm text-neutral-400">
            Modest wear for everyone. Free shipping in Uganda on orders ≥ UGX 150,000.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>Equatorial Mall, Shop 443, Kampala, Uganda</span>
            </div>
            {/* UPDATED: Use environment variable PHONE */}
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${PHONE}`} className="hover:underline">{PHONE}</a>
            </div>
            {/* UPDATED: Use environment variable EMAIL */}
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span>Mon–Sat 10:00–19:00 • Sun 12:00–18:00</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <a aria-label="Instagram" href="#" className="hover:opacity-80"><Instagram className="h-5 w-5" /></a>
            <a aria-label="Facebook" href="#" className="hover:opacity-80"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>

        {/* shop links */}
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-neutral-400">Shop</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/new" className="hover:underline">New Arrivals</Link></li>
            <li><Link href="/women" className="hover:underline">Women</Link></li>
            <li><Link href="/men" className="hover:underline">Men</Link></li>
            <li><Link href="/children" className="hover:underline">Children</Link></li>
            <li><Link href="/sale" className="hover:underline">Sale</Link></li>
            {/* REMOVED: Admin link was here */}
          </ul>
        </div>

        {/* customer care */}
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-neutral-400">Customer Care</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/policies/shipping" className="hover:underline">Shipping & Delivery (2 days UG)</Link></li>
            <li><Link href="/policies/returns" className="hover:underline">Returns & Exchanges</Link></li>
            <li><Link href="/policies/size-guide" className="hover:underline">Size Guide</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><a className="hover:underline" href="https://wa.me/256702486205" target="_blank">WhatsApp Support</a></li>
          </ul>
        </div>

        {/* newsletter / payments */}
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-neutral-400">Newsletter</div>
          <p className="mt-3 text-sm text-neutral-400">
            Be first to know about new drops and promos.
          </p>
          <form
            className="mt-3 flex items-center gap-2"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! You’re subscribed."); }}
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 w-full placeholder:text-neutral-500"
            />
            <button className="bg-white text-black text-sm font-medium px-3 py-2 rounded-md">
              Subscribe
            </button>
          </form>

          <div className="mt-6">
            <div className="text-sm font-semibold uppercase tracking-wide text-neutral-400">Payments</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs">Visa</span>
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs">Mastercard</span>
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs">MTN MoMo</span>
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs">Airtel Money</span>
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs">Flutterwave</span>
              <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs">Paystack</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div>© {year} Byrah Clothing Store • Kampala, Uganda</div>
          <div className="flex items-center gap-4">
            <Link href="/policies/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/policies/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
            {/* ADDED: Admin login link to the bottom bar */}
            <a className="hover:underline" href="/account/login?admin=1">Admin login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}