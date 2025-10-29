'use client'
import Link from 'next/link'
import type { Product, Variant } from '@prisma/client'

type Row = Product & { variants: Variant[] }

export default function AdminProductsClient({ list }: { list: Row[] }) {
  return (
    <>
      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {list.map(p => (
          <div key={p.id} className="rounded-lg border p-3">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-600">SKU: {p.sku}</div>
            <div className="text-sm">UGX {p.priceUGX}</div>
            <div className="mt-2">
              <Link href={`/admin/products/${p.id}`} className="text-sm underline">Edit</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="hidden sm:table w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(p => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>UGX {p.priceUGX}</td>
              <td>{p.variants.reduce((s, v) => s + v.stock, 0)}</td>
              <td><Link href={`/admin/products/${p.id}`} className="underline">Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}