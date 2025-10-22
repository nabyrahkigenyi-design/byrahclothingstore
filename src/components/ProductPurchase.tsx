'use client';

import { useMemo, useState } from 'react';
import AddToCart from '@/components/AddToCart';

type Variant = { id: string; size: string; stock: number };
type ImageT = { url: string; alt?: string };

export default function PurchasePanel({
  productId,
  name,
  priceUGX,
  variants,
  images,
}: {
  productId: string;
  name: string;
  priceUGX: number;
  variants: Variant[];
  images: ImageT[];
}) {
  const firstInStock = useMemo(
    () => variants.find(v => v.stock > 0)?.id || '',
    [variants]
  );
  const [variantId, setVariantId] = useState(firstInStock);
  const [qty, setQty] = useState(1);

  const img = images?.[0]?.url || '/placeholder.jpg';
  const size =
    variants.find(v => v.id === variantId)?.size ||
    variants.find(v => v.id === firstInStock)?.size ||
    '';

  const disabled = !variantId;

  return (
    <div className="space-y-3">
      <label className="block text-sm">
        Size
        <select
          className="mt-1 border rounded-md px-3 py-2 w-full"
          value={variantId}
          onChange={e => setVariantId(e.target.value)}
        >
          {variants.map(v => (
            <option key={v.id} value={v.id} disabled={v.stock <= 0}>
              {v.size} {v.stock <= 0 ? '(Out of stock)' : ''}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        Qty
        <input
          type="number"
          min={1}
          className="mt-1 border rounded-md px-3 py-2 w-24"
          value={qty}
          onChange={e => setQty(Math.max(1, Number(e.target.value || 1)))}
        />
      </label>

      <AddToCart
        item={{ productId, variantId, name, img, size, priceUGX, qty }}
      />
      {disabled && (
        <div className="text-xs text-red-600">
          Select an in-stock size to add to cart.
        </div>
      )}
    </div>
  );
}
