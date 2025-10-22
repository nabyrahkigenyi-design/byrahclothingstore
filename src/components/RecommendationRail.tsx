import ProductCard from './ProductCard'
export default function RecommendationRail({items}:{items:any[]}){
return (
<section className="mt-10">
<h2 className="text-lg font-semibold mb-4">You might also like</h2>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
{items.map(p=> <ProductCard key={p.id} p={p} />)}
</div>
</section>
)
}