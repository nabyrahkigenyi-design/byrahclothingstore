import { db } from '@/lib/prisma'
import NewProductForm from './NewProductForm'

export default async function Page() {
  const cats = await db.category.findMany({ select:{ id:true, name:true }, orderBy:{ name:'asc' } })
  return <NewProductForm cats={cats} />
}
