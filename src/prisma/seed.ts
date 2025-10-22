import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()


async function main() {
const cats = {
women: await db.category.create({ data: { name: 'Women', slug: 'women', heroImage: '/hero/women.jpg' } }),
men: await db.category.create({ data: { name: 'Men', slug: 'men', heroImage: '/hero/men.jpg' } }),
children: await db.category.create({ data: { name: 'Children', slug: 'children', heroImage: '/hero/children.jpg' } }),
sale: await db.category.create({ data: { name: 'Sale', slug: 'sale' } }),
news: await db.category.create({ data: { name: 'New', slug: 'new' } }),
}
// Subcats examples
const boys = await db.category.create({ data: { name:'Boys', slug:'boys', parentId: cats.children.id } })
await db.category.createMany({ data: [
{ name:'Qamees boys', slug:'qamees-boys', parentId: boys.id },
{ name:'Kandora boys', slug:'kandora-boys', parentId: boys.id },
{ name:'Beanies', slug:'beanies', parentId: boys.id },
]})
const girls = await db.category.create({ data: { name:'Girls', slug:'girls', parentId: cats.children.id } })
await db.category.create({ data: { name:'Hijab girls', slug:'hijab-girls', parentId: girls.id } })


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


const men = cats.men
await db.category.createMany({ data: [
{ name:'Saudi Qamees', slug:'saudi-qamees', parentId: men.id },
{ name:'Emirati Qamees', slug:'emirati-qamees', parentId: men.id },
{ name:'Misr Qamees', slug:'misr-qamees', parentId: men.id },
{ name:'Embroidered Qamees', slug:'embroidered-qamees', parentId: men.id },
{ name:'Moroccan Kandora', slug:'moroccan-kandora', parentId: men.id },
{ name:'Men pants', slug:'men-pants', parentId: men.id },
{ name:'Kufi / Hats', slug:'kufi-hats', parentId: men.id },
]})


// Sample product
const prod = await db.product.create({
data: {
name: 'Classic Saudi Qamees – White',
slug: 'classic-saudi-qamees-white',
description: 'Breathable thobe with premium stitching.',
priceUGX: 180000,
sku: 'BQ-SSQ-001',
tags: ['qamees','men','white'],
images: { create: [
{ url: '/products/ssq-white-1.jpg', alt: 'Front', position: 1 },
{ url: '/products/ssq-white-2.jpg', alt: 'Detail', position: 2 },
]},
}
})
const cat = await db.category.findUnique({ where: { slug: 'saudi-qamees' } })
if (cat) await db.productCategory.create({ data: { productId: prod.id, categoryId: cat.id } })
await db.variant.createMany({ data: [
{ productId: prod.id, size: 'S', stock: 10 },
{ productId: prod.id, size: 'M', stock: 12 },
{ productId: prod.id, size: 'L', stock: 8 },
]})
}


main().finally(()=>db.$disconnect())