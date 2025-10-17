import imageCompression from 'browser-image-compression'

export const useCloudinaryUpload = () => {
  // Safe read from .env and trim/normalize spaces
  const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim().replace(/\s+/g, '')
  const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim()
  const folderRaw = (import.meta.env.VITE_CLOUDINARY_FOLDER || '').trim()
  const folder = folderRaw || undefined  

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary cloud name or upload preset is missing in .env')
  }

  /**
   * Compress a single image file
   */
  const compress = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.5,          // ~500KB target
        maxWidthOrHeight: 1600,  // max dimensions
        useWebWorker: true,
        initialQuality: 0.8,
      }
      return await imageCompression(file, options)
    } catch {
      // fallback if compression fails
      return file
    }
  }

  /**
   * Upload a single file to Cloudinary
   * Returns { url, publicId }
   */
  const uploadOne = async (file, opts = {}) => {
    const presetToUse = (opts.preset ?? uploadPreset).trim()
    const folderToUse = (opts.folder ?? folder) || undefined

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const form = new FormData()
    form.append('upload_preset', presetToUse)
    if (folderToUse) form.append('folder', folderToUse)
    form.append('file', file)

    let res
    try {
      res = await fetch(url, { method: 'POST', body: form })
    } catch (networkErr) {
      throw new Error(`Network error during Cloudinary upload: ${networkErr?.message || networkErr}`)
    }

    if (!res.ok) {
      let txt = ''
      try {
        txt = await res.json().then((d) => JSON.stringify(d))
      } catch {
        txt = await res.text().catch(() => '')
      }
      throw new Error(`Cloudinary upload failed: ${res.status} ${txt}`)
    }

    const data = await res.json()
    if (!data?.secure_url) {
      throw new Error('Cloudinary response missing secure_url')
    }
    return { url: data.secure_url, publicId: data.public_id }
  }

  /**
   * Compress and upload multiple files
   */
  const uploadImages = async (files, opts) => {
    const arr = Array.from(files)
    const compressed = await Promise.all(arr.map((f) => compress(f)))
    const items = await Promise.all(compressed.map((f) => uploadOne(f, opts)))
    return items
  }

  return { uploadOne, uploadImages }
}

