'use client'
import type { Product, Variant } from '@prisma/client'

type Row = Product & { variants: Variant[] }

export default function AdminProductsClient({ list }: { list: Row[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left">
          <th>Name</th><th>SKU</th><th>Price</th><th>Stock</th><th></th>
        </tr>
      </thead>
      <tbody>
        {list.map(p => (
          <tr key={p.id} className="border-t">
            <td>{p.name}</td>
            <td>{p.sku}</td>
            <td>{p.priceUGX}</td>
            <td>{p.variants.reduce((s, v) => s + v.stock, 0)}</td>
            <td><a className="underline" href={`/admin/products/${p.id}`}>Edit</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
