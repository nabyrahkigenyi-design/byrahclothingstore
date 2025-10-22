import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function revalidateSections(){
  const base = process.env.NEXTAUTH_URL
  const paths = ['/', '/new','/sale','/women','/men','/children']
  await Promise.all(paths.map(p =>
    fetch(`${base}/api/revalidate`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ path: p })
    }).catch(()=>null)
  ))
}
