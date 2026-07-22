export async function uploadFile(file) {
  const formData = new FormData()

  formData.append('file', file)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  )

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error('File upload failed')
  }

  const data = await response.json()

  return {
    url: data.secure_url,
    publicId: data.public_id,
    originalName: file.name,
    resourceType: data.resource_type,
    format: data.format,
  }
}

export async function uploadImage(file) {
  const result = await uploadFile(file)
  return result.url
}