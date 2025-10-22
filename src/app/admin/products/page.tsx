import { db } from '@/lib/prisma'
import Link from 'next/link'
import AdminProductsClient from './AdminProductsClient'

export default async function AdminProducts(){
  const list = await db.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link className="bg-black text-white px-4 py-2 rounded-md" href="/admin/products/new">
          Add new
        </Link>
      </div>
      <AdminProductsClient list={list}/>
    </div>
  )
}
