// src/lib/upload.ts
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer())
  const res: any = await new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream({ folder: "byrah/products" }, (err, result) =>
        err ? reject(err) : resolve(result)
      )
      .end(buffer)
  )
  return { url: res.secure_url as string }
}
