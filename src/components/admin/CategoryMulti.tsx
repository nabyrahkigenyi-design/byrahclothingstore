'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

type Cat = { id: number; name: string }

type Props = {
  options: Cat[]
  /** Controlled value (ids) */
  value?: number[]
  /** Controlled change handler */
  onChange?: (vals: number[]) => void
  /** Uncontrolled: field name to post as hidden input (comma-separated ids) */
  name?: string
  /** Uncontrolled: initial selected ids */
  initialValues?: number[]
  className?: string
}

export default function CategoryMulti({
  options,
  value,
  onChange,
  name,
  initialValues = [],
  className,
}: Props) {
  // Internal state supports both controlled & uncontrolled
  const [sel, setSel] = useState<number[]>(value ?? initialValues)
  const hiddenRef = useRef<HTMLInputElement | null>(null)

  // Keep internal state in sync if parent controls it
  useEffect(() => {
    if (value) setSel(value)
  }, [value])

  // Emit to parent and keep hidden input up to date
  useEffect(() => {
    onChange?.(sel)
    if (name && hiddenRef.current) {
      hiddenRef.current.value = sel.join(',')
    }
  }, [sel, onChange, name])

  const stringValue = useMemo(() => sel.map(String), [sel])

  return (
    <div className={className}>
      {name && <input ref={hiddenRef} type="hidden" name={name} defaultValue={initialValues.join(',')} />}
      <select
        multiple
        className="mt-1 w-full border rounded px-3 py-2 min-h-32"
        value={stringValue}
        onChange={(e) => {
          const vals = Array.from(e.currentTarget.selectedOptions).map((o) => Number(o.value))
          setSel(vals)
        }}
      >
        {options.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <div className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd (or long-press) to select multiple.</div>
    </div>
  )
}
