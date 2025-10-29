// scripts/upsert-admin.ts
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  if (!email) throw new Error('ADMIN_EMAIL missing in env')

  await db.user.upsert({
    where: { email },
    create: { email, name: 'Byrah Admin', role: 'ADMIN' },
    update: { role: 'ADMIN' },
  })

  console.log('✅ Admin user ensured:', email)
}
main().finally(()=>db.$disconnect())
