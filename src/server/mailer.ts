import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(opts: { to: string; subject: string; html: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY missing; skipping email send.")
    return { ok: false }
  }
  const from = process.env.EMAIL_FROM || "noreply@byrahclothingstore.com"
  await resend.emails.send({ from, to: opts.to, subject: opts.subject, html: opts.html })
  return { ok: true }
}
