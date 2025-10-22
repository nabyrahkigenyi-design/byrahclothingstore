// prisma/seed-admin.ts
import { PrismaClient, Role } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('✨ Seeding admin user…')

  const email = process.env.ADMIN_EMAIL
  if (!email) throw new Error('Set ADMIN_EMAIL in your .env')

  await db.user.upsert({
    where: { email },
    create: {
      email,
      name: 'Byrah Admin',
      role: 'ADMIN' as Role,
    },
    update: {
      role: 'ADMIN' as Role,
    },
  })

  console.log(`✅ Admin ensured: ${email}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
