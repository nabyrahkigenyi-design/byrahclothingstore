export const runtime = 'nodejs'


import { NextResponse } from 'next/server'
import Flutterwave from 'flutterwave-node-v3'


export async function POST(req: Request){
const body = await req.json()
const flw = new (Flutterwave as any)(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY)
const tx_ref = `BYRAH-${Date.now()}`
const payload = {
tx_ref,
amount: body.amount,
currency: 'UGX',
redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/verify`,
customer: { email: body.email, phonenumber: body.phone, name: body.name },
payment_options: 'card, mobilemoneyuganda',
meta: { orderId: body.orderId }
}
const res = await flw.Payment.initialize(payload)
return NextResponse.json(res)
}