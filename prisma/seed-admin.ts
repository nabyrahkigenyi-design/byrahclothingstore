// prisma/seed-admin.ts
import { PrismaClient } from './src/generated/prisma'
import * as bcrypt from 'bcryptjs'

const db = new PrismaClient()

const SALT_ROUNDS = 10;

async function main() {
  console.log('✨ Starting admin user seeding...')

  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email) {
    throw new Error('Set ADMIN_EMAIL in environment variables (.env).')
  }
  if (!password) {
    throw new Error('Set ADMIN_PASSWORD in environment variables (.env).')
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  await db.user.upsert({
    where: { email },
    create: {
      email,
      name: 'Byrah Admin',
      role: 'ADMIN',
      password: hashedPassword,
    },
    update: {
      role: 'ADMIN',
      password: hashedPassword,
    },
  })

  console.log(`✅ Upserted admin user with email: ${email}`)
}

main()
  .catch(async (e) => {
    console.error('An error occurred during admin seeding:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })