// src/app/api/auth/[...nextauth]/route.ts
import makeAuthHandler from "@/lib/auth"

const handler = makeAuthHandler()
export { handler as GET, handler as POST }
export const runtime = "nodejs"
