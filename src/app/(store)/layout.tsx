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
    <html lang="en">
      <body>
        <TopBar />
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <img src="/logo.png" alt="Byrah" className="h-8 w-auto" />
            </a>

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
        {children}
        <Footer />
      </body>
    </html>
  )
}
