'use client'

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function ContactClient({ email, phone }: { email: string; phone: string }) {
  return (
    <div className="prose max-w-none">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4 not-prose text-sm text-gray-600">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>/</li>
          <li className="text-gray-900">Contact</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="rounded-2xl overflow-hidden bg-gradient-to-r from-rose-700 to-rose-900 text-white">
        <div className="px-6 py-10">
          <h1 className="text-3xl font-semibold">Contact Us</h1>
          <p className="opacity-90 mt-2">We’re happy to help with sizing, orders, or anything else.</p>
        </div>
      </header>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <section className="rounded-2xl border bg-white p-6 not-prose">
          <h2 className="text-xl font-semibold">Store & Hours</h2>
          <Separator className="my-4" />
          <ul className="text-sm space-y-1">
            <li><strong>Address:</strong> Equatorial Mall, Shop 443, Kampala</li>
            <li><strong>Phone:</strong> <a href={`tel:${phone}`}>{phone}</a></li>
            <li><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></li>
            <li><strong>Hours:</strong> Mon–Sat 10:00–19:00 • Sun 12:00–18:00</li>
            <li><strong>WhatsApp:</strong> <a className="underline" target="_blank" href={`https://wa.me/${phone.replace(/\D/g,"")}`}>Chat now</a></li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-white p-6 not-prose">
          <h2 className="text-xl font-semibold">Send a message</h2>
          <Separator className="my-4" />
          <form
            className="grid grid-cols-2 gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              const subject = encodeURIComponent("Byrah contact")
              const body = encodeURIComponent(
                `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`
              )
              window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
            }}
          >
            <input required name="name" placeholder="Full name" className="border rounded px-3 py-2 col-span-2" />
            <input required name="email" type="email" placeholder="Email" className="border rounded px-3 py-2" />
            <input name="phone" placeholder="Phone (optional)" className="border rounded px-3 py-2" />
            <textarea required name="message" placeholder="How can we help?" className="border rounded px-3 py-2 min-h-32 col-span-2" />
            <button className="bg-black text-white rounded px-4 py-2 w-fit">Send</button>
          </form>
        </section>
      </div>

      {/* FAQ */}
      <section className="rounded-2xl border bg-white p-6 not-prose mt-8">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <Separator className="my-4" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>How long is delivery in Uganda?</AccordionTrigger>
            <AccordionContent>Within Kampala we deliver in 2 business days. Upcountry delivery times vary by courier.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Do you offer pickup?</AccordionTrigger>
            <AccordionContent>Yes—Pickup at Equatorial Mall, Shop 443. You’ll receive an SMS/email when your order is ready.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>Which payment methods are available?</AccordionTrigger>
            <AccordionContent>Cards and Mobile Money via Flutterwave. You can also pay on pickup.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>What’s your return policy?</AccordionTrigger>
            <AccordionContent>Unworn items with tags can be returned within 7 days. See the full policy on our Returns page.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Map */}
<section className="rounded-2xl border bg-white p-2 mt-8">
  <iframe
    title="Byrah Clothing Store Map"
    className="w-full h-[360px] rounded-xl"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1839.02850589359!2d32.5739935!3d0.3182858!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb56ab9f3609%3A0x7bbb50730adfcb5c!2sEquatoria%20Shopping%20Mall!5e1!3m2!1sen!2snl!4v1760804822414!5m2!1sen!2snl"
    style={{ border: 0 }}
  />
</section>

    </div>
  )
}
