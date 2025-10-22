import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"

export async function requireAdmin() {
  const s = await getServerSession(authOptions)
  if (!s?.user?.email) return null
  const u = await db.user.findUnique({ where: { email: s.user.email } })
  return u?.role === "ADMIN" ? u : null
}
