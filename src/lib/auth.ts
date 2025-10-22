import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter" 
import { db } from "@/lib/prisma"
import { Resend } from "resend"
import type { NextAuthOptions } from "next-auth"

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db) as any,
    session: { strategy: "jwt" },
    providers: [
        EmailProvider({
            from: process.env.EMAIL_FROM!,
            sendVerificationRequest: async ({ identifier, url }) => {
                await resend.emails.send({
                    from: process.env.EMAIL_FROM!,
                    to: identifier,
                    subject: "Sign in to Byrah Store",
                    html: `<p>Click the link to sign in:</p><p><a href="${url}">${url}</a></p>`,
                    text: `Sign in link: ${url}`,
                })
            },
        }),
        Credentials({
            name: "Admin",
            credentials: { email: {}, password: {} },
            async authorize(c) {
                const u = await db.user.findUnique({ where: { email: c?.email as string } })
                
                if (u && u.role === "ADMIN" && c?.password === process.env.ADMIN_PASSWORD) {
                    return { 
                        id: u.id, 
                        email: u.email || "", 
                        name: u.name || "Admin", 
                        role: "ADMIN" as const 
                    }
                }
                return null
            },
        }),
    ],
    pages: { signIn: "/account/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) (token as any).role = (user as any).role || "CUSTOMER"
            return token
        },
        async session({ session, token }) {
            (session.user as any).role = (token as any).role || "CUSTOMER"
            return session
        },
    },
}

export const { 
    handlers: { GET, POST }, 
    auth,
    signIn,
    signOut
} = NextAuth(authOptions)
