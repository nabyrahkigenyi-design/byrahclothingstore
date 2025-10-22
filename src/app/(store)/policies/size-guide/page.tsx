import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Size Guide – Byrah" }

const men = [
  { size: "S", chest: "96–100", length: "138–140" },
  { size: "M", chest: "100–104", length: "140–142" },
  { size: "L", chest: "104–108", length: "142–144" },
  { size: "XL", chest: "108–114", length: "144–146" },
]
const womenAbaya = [
  { size: "52", height: "155–160", note: "Petite" },
  { size: "54", height: "160–165", note: "Regular" },
  { size: "56", height: "165–170", note: "Tall" },
  { size: "58", height: "170–175", note: "Extra Tall" },
]
const children = [
  { age: "3–4", height: "98–104", note: "Boys/Girls" },
  { age: "5–6", height: "110–116", note: "Boys/Girls" },
  { age: "7–8", height: "122–128", note: "Boys/Girls" },
  { age: "9–10", height: "134–140", note: "Boys/Girls" },
]

export default function Page() {
  return (
    <div className="prose max-w-none">
      <header className="rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-700 to-indigo-900 text-white">
        <div className="px-6 py-10">
          <h1 className="text-3xl font-semibold">Size Guide</h1>
          <p className="opacity-90 mt-2">
            Body measurements in <strong>cm</strong>. Fit may vary slightly by style and fabric.
          </p>
        </div>
      </header>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Men — Thobe / Qamees</h2>
        <Separator className="my-4" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left">Size</th><th className="text-left">Chest (cm)</th><th className="text-left">Length (cm)</th></tr></thead>
            <tbody>
              {men.map(r=>(
                <tr key={r.size} className="border-t">
                  <td>{r.size}</td><td>{r.chest}</td><td>{r.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Women — Abaya Length</h2>
        <Separator className="my-4" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left">Size</th><th className="text-left">Height (cm)</th><th className="text-left">Notes</th></tr></thead>
            <tbody>
              {womenAbaya.map(r=>(
                <tr key={r.size} className="border-t">
                  <td>{r.size}</td><td>{r.height}</td><td>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-3">Tip: For loose abaya fit, choose the length closest to your height.</p>
      </section>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h2 className="text-xl font-semibold">Children</h2>
        <Separator className="my-4" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="text-left">Age (yrs)</th><th className="text-left">Height (cm)</th><th className="text-left">Notes</th></tr></thead>
            <tbody>
              {children.map(r=>(
                <tr key={r.age} className="border-t">
                  <td>{r.age}</td><td>{r.height}</td><td>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 mt-8">
        <h3 className="text-lg font-semibold">How to Measure</h3>
        <Separator className="my-4" />
        <ul className="text-sm">
          <li><strong>Chest:</strong> measure under arms, around fullest part of chest.</li>
          <li><strong>Length:</strong> shoulder to ankle (for thobes/abaya).</li>
          <li><strong>Between sizes?</strong> Choose the larger one for modest fit.</li>
        </ul>
      </section>
    </div>
  )
}
