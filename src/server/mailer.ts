// src/server/mailer.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = process.env.EMAIL_FROM!

/**
 * Minimal mail helper. Use HTML; text is optional.
 */
export async function sendMail(
  to: string | string[],
  subject: string,
  html: string,
  text?: string
) {
  const res = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    text,
  })
  if (res.error) {
    throw new Error(`Resend error: ${res.error.message || String(res.error)}`)
  }
  return res
}

// Back-compat alias (some files may import sendEmail)
export const sendEmail = sendMail
