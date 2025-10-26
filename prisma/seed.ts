// prisma/seed.ts

// 1. IMPORT & INITIALIZE PRISMA CLIENT
// FIX APPLIED: We are now using the relative path to the custom output location
// that was defined in prisma/schema.prisma.
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

// ----------------------------------------------------------------------------------

async function main() {
  console.log('✨ Starting database seeding...')
  
  // 1. CLEAR EXISTING DATA (Optional, but recommended for clean runs)
  // Assuming 'productCategory', 'variant', 'product', and 'category' are your model names
  await db.productCategory.deleteMany()
  await db.variant.deleteMany()
  await db.product.deleteMany()
  await db.category.deleteMany()
  console.log('   - Cleared existing data.')

  // 2. CREATE MAIN CATEGORIES (Base level)
  const cats = {
    women: await db.category.create({ data: { name: 'Women', slug: 'women', heroImage: '/hero/women.jpg' } }),
    men: await db.category.create({ data: { name: 'Men', slug: 'men', heroImage: '/hero/men.jpg' } }),
    children: await db.category.create({ data: { name: 'Children', slug: 'children', heroImage: '/hero/children.jpg' } }),
    sale: await db.category.create({ data: { name: 'Sale', slug: 'sale' } }),
    news: await db.category.create({ data: { name: 'New', slug: 'new' } }),
  }
  console.log('   - Created top-level categories.')


  // 3. CHILDREN SUBCATEGORIES
  const boys = await db.category.create({ data: { name:'Boys', slug:'boys', parentId: cats.children.id } })
  await db.category.createMany({ data: [
    { name:'Qamees boys', slug:'qamees-boys', parentId: boys.id },
    { name:'Kandora boys', slug:'kandora-boys', parentId: boys.id },
    { name:'Beanies', slug:'beanies', parentId: boys.id },
  ]})
  const girls = await db.category.create({ data: { name:'Girls', slug:'girls', parentId: cats.children.id } })
  await db.category.create({ data: { name:'Hijab girls', slug:'hijab-girls', parentId: girls.id } })
  console.log('   - Created children categories.')


  // 4. WOMEN SUBCATEGORIES
  const womenHijabs = await db.category.create({ data: { name:'Hijabs', slug:'hijabs', parentId: cats.women.id, heroImage:'/hero/hijabs.jpg' } })
  await db.category.createMany({ data: [
    { name:'Chiffon Hijab', slug:'chiffon-hijab', parentId: womenHijabs.id },
    { name:'Jersey Hijab', slug:'jersey-hijab', parentId: womenHijabs.id },
    { name:'Silk Hijab', slug:'silk-hijab', parentId: womenHijabs.id },
  ]})
  await db.category.createMany({ data: [
    { name:'Abaya', slug:'abaya', parentId: cats.women.id },
    { name:'Sports wear', slug:'sports-wear', parentId: cats.women.id },
    { name:'Khimar', slug:'khimar', parentId: cats.women.id },
    { name:'Party wear', slug:'party-wear', parentId: cats.women.id },
  ]})
  console.log('   - Created women categories.')


  // 5. MEN SUBCATEGORIES
  await db.category.createMany({ data: [
    { name:'Saudi Qamees', slug:'saudi-qamees', parentId: cats.men.id },
    { name:'Emirati Qamees', slug:'emirati-qamees', parentId: cats.men.id },
    { name:'Misr Qamees', slug:'misr-qamees', parentId: cats.men.id },
    { name:'Embroidered Qamees', slug:'embroidered-qamees', parentId: cats.men.id },
    { name:'Moroccan Kandora', slug:'moroccan-kandora', parentId: cats.men.id },
    { name:'Men pants', slug:'men-pants', parentId: cats.men.id },
    { name:'Kufi / Hats', slug:'kufi-hats', parentId: cats.men.id },
  ]})
  console.log('   - Created men categories.')


  // 6. SAMPLE PRODUCT, CATEGORY LINKING, AND VARIANTS
  const prod = await db.product.create({
    data: {
      name: 'Classic Saudi Qamees – White',
      slug: 'classic-saudi-qamees-white',
      description: 'Breathable thobe with premium stitching.',
      priceUGX: 180000,
      sku: 'BQ-SSQ-001',
      tags: ['qamees','men','white'],
      status: 'ACTIVE', // Explicitly setting status as required by the schema
      images: { create: [
        { url: '/products/ssq-white-1.jpg', alt: 'Front', position: 1 },
        { url: '/products/ssq-white-2.jpg', alt: 'Detail', position: 2 },
      ]},
    }
  })

  // Link product to the 'Saudi Qamees' category
  const saudiQameesCat = await db.category.findUnique({ where: { slug: 'saudi-qamees' } })
  if (saudiQameesCat) await db.productCategory.create({ data: { productId: prod.id, categoryId: saudiQameesCat.id } })
  
  // Create variants
  await db.variant.createMany({ data: [
    { productId: prod.id, size: 'S', stock: 10 },
    { productId: prod.id, size: 'M', stock: 12 },
    { productId: prod.id, size: 'L', stock: 8 },
  ]})
  console.log('   - Created sample product with variants.')
  
  console.log('✅ Seeding finished successfully!')
}

// ----------------------------------------------------------------------------------

// EXECUTION BLOCK (Ensures disconnect and proper exit)
main()
  .catch(async (e) => {
    console.error('An error occurred during seeding:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
