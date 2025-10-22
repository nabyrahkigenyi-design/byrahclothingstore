'use client'
import { useEffect, useMemo, useState } from 'react'

type Cat = { id: number; name: string }
type Props = {
  value: number[]
  onChange?: (ids: number[]) => void
  name?: string // optional, if you also want hidden inputs for <form>
}

function arraysEqual(a: number[], b: number[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

export default function CategoryMulti({ value, onChange, name }: Props) {
  const [sel, setSel] = useState<number[]>(value ?? [])
  const [options, setOptions] = useState<Cat[] | null>(null)

  // Load categories once
  useEffect(() => {
    let alive = true
    ;(async () => {
      const res = await fetch('/api/products/lookup', { cache: 'no-store' })
      const data = (await res.json()) as { categories: Cat[] }
      if (alive) setOptions(data.categories)
    })()
    return () => {
      alive = false
    }
  }, [])

  // Sync down from parent only when different
  useEffect(() => {
    if (!arraysEqual(sel, value ?? [])) setSel(value ?? [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // Notify parent only when sel actually changes
  useEffect(() => {
    onChange?.(sel)
    // only depends on sel; parent should pass a stable onChange (useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel])

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = Array.from(e.currentTarget.selectedOptions).map(o => Number(o.value))
    // normalize + sort for stable equality
    next.sort((a, b) => a - b)
    if (!arraysEqual(sel, next)) setSel(next)
  }

  const noCats = !options || options.length === 0

  return (
    <div className="space-y-2">
      <select
        multiple
        className="w-full border rounded px-3 py-2 h-40"
        value={sel.map(String)}
        onChange={onSelect}
        disabled={noCats}
      >
        {options?.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Optional hidden inputs so <form> submits categoryIds[] */}
      {name &&
        sel.map(id => <input key={id} type="hidden" name={name} value={id} />)}

      {noCats && (
        <div className="text-sm text-gray-500">No categories yet</div>
      )}
    </div>
  )
}
