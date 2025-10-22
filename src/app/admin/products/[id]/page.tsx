import { db } from '@/lib/prisma'
import EditProductForm from '@/components/admin/EditProductForm'
import GalleryManager from '@/components/admin/GalleryManager'

export default async function Page({ params }:{ params:Promise<{ id:string }> }){
  const { id } = await params
  
  // Fetch product, categories, and images concurrently
  const [p, cats, imgs] = await Promise.all([
    db.product.findUnique({
      where:{ id: Number(id) },
      include:{ variants:true, categories:true },
    }),
    db.category.findMany({ select:{ id:true, name:true }, orderBy:{ name:'asc' } }),
    // Fetch images associated with this product
    db.image.findMany({ where:{ productId:Number(id) }, orderBy:{ position:'asc' } })
  ])

  if(!p) return <div className="p-8">Not found</div>
  
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Edit Product: {p.name}</h1>
      
      {/* Existing form for product details */}
      <EditProductForm product={p as any} cats={cats} />
      
      {/* New component for managing the image gallery */}
      <GalleryManager productId={Number(id)} initial={imgs as any} />
    </div>
  )
}
