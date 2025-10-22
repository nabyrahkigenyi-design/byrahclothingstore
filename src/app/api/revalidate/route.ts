import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(req: Request){
    
    const secret = req.headers.get('x-revalidation-secret') 
    if (secret !== REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Invalid secret token" }, { status: 401 })
    }

    const { path } = await req.json()
    
    if(!path) return NextResponse.json({error:"path required"},{status:400})
    
    revalidatePath(path, 'page') 
    
    return NextResponse.json({ revalidated:true })
}