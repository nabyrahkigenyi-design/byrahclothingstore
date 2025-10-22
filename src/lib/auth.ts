// src/lib/auth.ts
import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/prisma'
import { Resend } from 'resend'
import type { Adapter } from 'next-auth/adapters'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'

const resend = new Resend(process.env.RESEND_API_KEY)

type UserRole = 'ADMIN' | 'CUSTOMER'
type TokenWithRole = JWT & { role?: UserRole }
type SessionUserWithRole = Session['user'] & { role?: UserRole }

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: 'jwt' },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM!,
      sendVerificationRequest: async ({ identifier, url }) => {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: 'Sign in to Byrah Store',
          html: `<p>Click to sign in:</p><p><a href="${url}">${url}</a></p>`,
          text: `Sign in link: ${url}`,
        })
      },
    }),
    Credentials({
      name: 'Admin',
      credentials: { email: { label: 'Email' }, password: { label: 'Password', type: 'password' } },
      async authorize(creds) {
        const email = (creds?.email ?? '') as string
        const password = (creds?.password ?? '') as string
        const u = await db.user.findUnique({ where: { email } })
        if (u && u.role === 'ADMIN' && password === process.env.ADMIN_PASSWORD) {
          return { id: u.id, email: u.email ?? '', name: u.name ?? 'Admin', role: 'ADMIN' as UserRole }
        }
        return null
      },
    }),
  ],
  pages: { signIn: '/account/login' },
  callbacks: {
    async jwt({ token, user }) {
      const t = token as TokenWithRole
      if (user) {
        const role: UserRole = (user as { role?: UserRole }).role ?? 'CUSTOMER'
        t.role = role
      }
      return t
    },
    async session({ session, token }) {
      const t = token as TokenWithRole
      if (session.user) {
        (session.user as SessionUserWithRole).role = t.role ?? 'CUSTOMER'
      }
      return session
    },
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions)
