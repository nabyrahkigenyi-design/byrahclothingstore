// src/lib/upload.ts
import { v2 as cloud } from 'cloudinary'

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/** Upload a Next.js/Node File to Cloudinary. Returns { url, width, height, publicId } */
export async function uploadImage(file: File) {
  const buf = Buffer.from(await file.arrayBuffer())
  const res: any = await new Promise((resolve, reject) =>
    cloud.uploader
      .upload_stream({ folder: 'byrah/products' }, (err, result) =>
        err ? reject(err) : resolve(result)
      )
      .end(buf)
  )
  return { url: res.secure_url as string, width: res.width as number, height: res.height as number, publicId: res.public_id as string }
}

/** Alias used by some routes. Same as uploadImage but accepts FormData entry. */
export async function uploadImageFromFormFile(entry: FormDataEntryValue) {
  if (typeof entry === 'string') throw new Error('Expected file, got string')
  return uploadImage(entry as File)
}
