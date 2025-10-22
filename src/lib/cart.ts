export type CartItem = {
  productId:number; variantId:number; name:string; img:string; size:string;
  priceUGX:number; qty:number; slug:string
}
const KEY='cart'
const EVT='cart:change'
function emit(){ window.dispatchEvent(new CustomEvent(EVT)) }

export function getCart():CartItem[]{ return JSON.parse(localStorage.getItem(KEY)||'[]') }
export function setCart(c:CartItem[]){ localStorage.setItem(KEY, JSON.stringify(c)); emit() }
export function addToCart(item:CartItem){
  const c=getCart(); const i=c.findIndex(x=>x.variantId===item.variantId)
  if(i>=0) c[i].qty+=item.qty; else c.push(item); setCart(c); return c
}
export function updateQty(variantId:number, qty:number){
  const c=getCart().map(x=> x.variantId===variantId? {...x, qty:Math.max(1,qty)}:x); setCart(c)
}
export function removeItem(variantId:number){
  setCart(getCart().filter(x=>x.variantId!==variantId))
}
export function onCartChange(fn:()=>void){ window.addEventListener(EVT, fn); return ()=>window.removeEventListener(EVT, fn) }
export function clearCart(){ localStorage.removeItem(KEY); emit() }
