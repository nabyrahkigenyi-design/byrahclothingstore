import ContactClient from "./ContactClient"

export const metadata = {
  title: "Contact Us – Byrah",
  description: "Get in touch with Byrah Clothing Store in Equatorial Mall, Kampala.",
}

const EMAIL = process.env.NEXT_PUBLIC_STORE_EMAIL || "nabyrahkigenyi@gmail.com"
const PHONE  = process.env.NEXT_PUBLIC_STORE_PHONE  || "+256 702 486 205"

export default function Page() {
  return <ContactClient email={EMAIL} phone={PHONE} />
}
