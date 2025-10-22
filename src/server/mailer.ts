import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

// Internal function to handle the actual sending via Resend
export async function sendMail({ to, subject, html }: { to: string, subject: string, html: string }) {
  if (!to) return
  await resend.emails.send({ from: process.env.FROM_EMAIL!, to, subject, html })
}

export async function sendSignInEmail({ to, url, code, brand }: {
  to: string; url: string; code: string; brand: string
}) {
  const subject = `${brand} sign-in code: ${code}`
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
      <h2>${brand}</h2>
      <p>Your sign-in code:</p>
      <div style="font-size:28px;font-weight:700;letter-spacing:4px">${code}</div>
      <p>Or click the button to sign in instantly:</p>
      <p><a href="${url}" style="background:#111;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Sign in</a></p>
      <p style="color:#666">If you did not request this, you can safely ignore this email.</p>
    </div>
  `
  // send via the renamed internal transport
  await sendMail({ to, subject, html })
}