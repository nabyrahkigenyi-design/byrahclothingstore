export const runtime = 'nodejs'


import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { db } from '@/lib/prisma'
import { sendEmail } from '@/server/mailer'


export async function POST(req: Request){
const secret = process.env.FLW_WEBHOOK_SECRET as string
const sig = req.headers.get('verif-hash') || ''
if(!secret || sig !== secret) return NextResponse.json({ ok:false }, { status:401 })
const event = await req.json()
if(event?.status === 'successful'){
const orderId = event?.data?.meta?.orderId
if(orderId){ 
  const o = await db.order.update({ 
    where:{ id: orderId }, 
    data:{ status:'PAID' } , 
    include:{ address:true }
  })
  
  try {
    await sendEmail(o.email, 'Payment confirmed', `<p>Your payment is confirmed. We will ship in 2 days.</p>`)
  } catch (error) {
    console.error("Failed to send payment confirmation email:", error)
  }
}
}
return NextResponse.json({ ok:true })
}
