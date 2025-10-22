import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function ProfilePage(){
  const session = await getServerSession(authOptions)
  const email = session?.user?.email || ""
  const user = await db.user.findUnique({ where: { email } })

  async function update(formData: FormData){
    "use server"
    const name = (formData.get("name")||"").toString().trim()
    if (!session?.user?.email) return
    await db.user.update({ where:{ email: session.user.email }, data:{ name } })
    redirect("/account/profile")
  }

  return (
    <div className="rounded-2xl border p-6 max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <form action={update} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2 bg-gray-50" defaultValue={user?.email||""} disabled />
        </div>
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input name="name" className="w-full border rounded px-3 py-2" defaultValue={user?.name||""} />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md">Save</button>
      </form>
    </div>
  )
}
