// src/app/api/payments/paystack/initialize/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // TODO: read body and call Paystack; for now return stub so build passes
  // const body = await req.json();
  // ...init with Paystack SDK...
  return NextResponse.json({ ok: true });
}
