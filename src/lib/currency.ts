export const UGX = new Intl.NumberFormat('en-UG', { style:'currency', currency:'UGX', maximumFractionDigits:0 })
export const FREE_SHIP_THRESHOLD = 150000
export function shippingFor(total: number) { return total >= FREE_SHIP_THRESHOLD ? 0 : 10000 }