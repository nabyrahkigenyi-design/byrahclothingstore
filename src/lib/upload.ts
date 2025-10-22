import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File): Promise<{ url: string }> {
  const buffer = Buffer.from(await file.arrayBuffer())

  const result: UploadApiResponse = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'byrah/products' },
      (err, res) => (err || !res ? reject(err) : resolve(res))
    )
    stream.end(buffer)
  })

  return { url: result.secure_url }
}
