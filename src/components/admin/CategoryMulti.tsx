'use client'
import { useEffect, useState } from 'react'

export type Cat = { id: number; name: string }

type Props = {
  value: number[]
  onChange: (ids: number[]) => void
  /** optional: pass preloaded categories; if omitted, the component will fetch */
  options?: Cat[]
}

export default function CategoryMulti({ value, onChange, options }: Props) {
  const [opts, setOpts] = useState<Cat[]>(options || [])

  useEffect(() => {
    if (options) return
    ;(async () => {
      try {
        const res = await fetch('/api/products/lookup') // your categories lookup route
        const data = (await res.json()) as Cat[]
        setOpts(data)
      } catch {
        setOpts([])
      }
    })()
  }, [options])

  if (!opts.length) {
    return <div className="text-sm text-gray-500">No categories yet</div>
  }

  return (
    <select
      multiple
      className="w-full border rounded px-3 py-2 h-32"
      // select expects string[], so map numbers -> strings
      value={value.map(String)}
      onChange={(e) => {
        const ids = Array.from(e.currentTarget.selectedOptions).map((o) => Number(o.value))
        onChange(ids)
      }}
    >
      {opts.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  )
}
