import { NextResponse, type NextRequest } from 'next/server'
import { cspHeader } from '@/lib/csp'

export function middleware(_req: NextRequest) {
  const headers = new Headers()
  headers.set('Content-Security-Policy', cspHeader)
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  return NextResponse.next({ headers })
}

// Optional: scope middleware
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/payments/.*).*)'],
}
