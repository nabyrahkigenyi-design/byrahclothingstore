// src/app/(store)/layout.tsx
import Link from 'next/link'
import Image from 'next/image'
import TopBar from '@/components/header/TopBar'
import NavMega from '@/components/header/NavMega'
import CartButton from '@/components/header/CartButton'
import AccountButton from '@/components/header/AccountButton'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: { default: 'Byrah Clothing Store', template: '%s | Byrah' },
  description: 'Islamic clothing in Uganda. Free shipping over UGX 150,000.',
  openGraph: { type: 'website', siteName: 'Byrah Clothing Store' }
}

export default function StoreLayout({ children }:{children:React.ReactNode}) {
  return (
    <>
      <TopBar />

      <header className="border-b">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="Byrah" width={120} height={32} className="h-8 w-auto" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center">
              <NavMega />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AccountButton />
            <CartButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </>
  )
}
