import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = process.env.EMAIL_FROM!

export async function sendMail(
  to: string | string[],
  subject: string,
  html: string,
  text?: string
) {
  const res = await resend.emails.send({ from: FROM, to, subject, html, text })
  if (res.error) throw new Error(`Resend error: ${res.error.message ?? res.error}`)
  return res
}

// alias so old imports keep working
export const sendEmail = sendMail
