import React, { useEffect, useState } from 'react'
import Nav from '../../component/Nav'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../App'
import { useCloudinaryUpload } from '../../customHooks/useCloudinaryUpload'
import ClipLoader from 'react-spinners/ClipLoader'
import { toast } from 'react-toastify'

const Editcourse = () => {   
    const navigator   = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mrp, setMrp] = useState("")
  const [price, setPrice] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [images, setImages] = useState([]) // { url, publicId }[]
  const [demoLink, setDemoLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const { uploadImages } = useCloudinaryUpload()

  // helper to derive publicId from secure_url if backend doesn't store it
  const derivePublicId = (url) => {
    try {
      const u = new URL(url)
      const segs = u.pathname.split('/') // /image/upload/v..../folder/name.jpg
      const uploadIdx = segs.findIndex(s => s === 'upload')
      let rel = segs.slice(uploadIdx + 1)
      if (rel[0] && /^v\d+/.test(rel[0])) rel = rel.slice(1)
      const joined = rel.join('/')
      return joined.replace(/\.[^/.]+$/, '')
    } catch {
      return null
    }
  }

  // Fetch existing course + thumbnail
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/course/getcourse-by-id/${id}` , { withCredentials: true })
        const { course, tumbnail } = res.data.courseData
        setTitle(course.title || "")
        setSubTitle(course.subTitle || "")
        setDescription(course.description || "")
        setMrp(course.mrp || "")
        setPrice(course.price || "")
        setIsPublished(!!course.isPublished)
        const imgs = Array.isArray(tumbnail?.images) ? tumbnail.images.map(url => ({ url, publicId: derivePublicId(url) })) : []
        setImages(imgs)
        setDemoLink(tumbnail?.demoLink || "")
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to load course')
      }
    }
    if (id) fetchData()
  }, [id])

  const handleSelectImages = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const items = await uploadImages(files)
      setImages((prev) => [...prev, ...items.map(x => ({ url: x.url, publicId: x.publicId }))])
    } catch (err) {
      toast.error(err?.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = async (item) => {
    try {
      await axios.post(`${baseUrl}/api/course/cloudinary/delete`, { publicId: item.publicId }, { withCredentials: true })
      toast.success('Image deleted successfully')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed')
    }
    setImages((prev) => prev.filter((u) => u.url !== item.url))
  }

  const saveChanges = async () => {
    if (!title || !subTitle || !description || !price) {
      toast.error('All required fields must be filled')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${baseUrl}/api/course/edit-course`, {
        title, subTitle, description, mrp, price, isPublished,
        courseId: id,
        demoLink,
        images: images.map(i => i.url),
      }, { withCredentials: true })
      if (res.data?.success) {
        toast.success('Course updated') 
         navigator("/educator/courses")
      } else {
        toast.error(res.data?.message || 'Update failed')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=' w-full min-h-[100vh] bg-[#f2f4f5] flex justify-center items-start pt-16 pb-10 overflow-x-hidden px-4'>
      <Nav/>
      <form onSubmit={(e)=>e.preventDefault()} className='bg-white w-full max-w-3xl rounded-2xl shadow p-6 md:p-10 flex flex-col gap-5'>
        <h1 className='text-2xl md:text-3xl font-bold text-center'>Edit Course</h1>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='isPublished'>Is Published?</label>
          <select id='isPublished' value={isPublished ? 'true' : 'false'} onChange={(e)=>setIsPublished(e.target.value === 'true')} className='w-1/5 outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'>
            <option value='false'>No</option>
            <option value='true'>Yes</option>
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='title'>Title</label>
          <input id='title' type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2' />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='subTitle'>Sub Title</label>
          <input id='subTitle' type='text' value={subTitle} onChange={(e)=>setSubTitle(e.target.value)} className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2' />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='description'>Description</label>
          <textarea id='description' rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2 resize-none' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor='mrp'>MRP</label>
            <input id='mrp' type='number' value={mrp} onChange={(e)=>setMrp(e.target.value)} className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2' />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor='price'>Price</label>
            <input id='price' type='number' value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2' />
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <label className='font-semibold'>Course Thumbnails</label>
          <input type='file' accept='image/*' multiple onChange={handleSelectImages} className='w-full' />
          {uploading && <span className='text-sm text-gray-500'>Uploading...</span>}
          {images.length > 0 && (
            <div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
              {images.map((item) => (
                <div key={item.url} className='relative group'>
                  <img src={item.url} alt='thumb' className='w-full h-24 object-cover rounded' />
                  <button type='button' onClick={() => removeImage(item)} className='absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100'>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='demoLink'>Demo Link</label>
          <input id='demoLink' type='url' value={demoLink} onChange={(e)=>setDemoLink(e.target.value)} className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2' />
        </div>

        <div className='flex gap-3 justify-end pt-2 cursor-pointer '>
          <button type='button' onClick={saveChanges} disabled={loading || uploading} className='bg-black text-white px-4 py-2 rounded-xl cursor-pointer '>
            {loading ? <ClipLoader size={18} color='#ffffff' /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editcourse
