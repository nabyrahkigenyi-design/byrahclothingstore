'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
export default function Verify(){
  const [ok,setOk]=useState(false)
  useEffect(()=>{
    const q=new URLSearchParams(location.search)
    setOk(q.get('status')==='successful')
    if(q.get('status')==='successful'){ localStorage.removeItem('cart') }
  },[])
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">{ok?'Order received':'Payment status'}</h1>
      <p className="mt-2">{ok?'Thank you. We will contact you for pickup or delivery.':'We are processing your request.'}</p>
      <Link className="underline mt-4 inline-block" href="/">Back to home</Link>
    </div>
  )
}
