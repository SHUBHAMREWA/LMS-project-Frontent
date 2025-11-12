
import React, { useState } from 'react'
import Nav from '../../component/Nav'
import { useCloudinaryUpload } from '../../customHooks/useCloudinaryUpload'
import axios from 'axios'
import { baseUrl } from '../../App'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNavigate } from 'react-router-dom'

const Createcourse = () => {
  
   const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mrp, setMrp] = useState("")
  const [price, setPrice] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  // New state for media schema
  const [images, setImages] = useState([]) // array of { url, publicId }
  const [demoLink, setDemoLink] = useState("") // string URL
  const [uploading, setUploading] = useState(false) ;
  const [loading , setLoading]    = useState(false)
  const [category, setCategory] = useState("")

  const categories = [
    "Web Devlopment",
    "UI/UX designing",
    "AI/ML",
    "App Dev",
    "Ethical Hacking",
    "Data Analytics",
    "Data Science",
    "Ai Tools",
    "Programming Languages",
    "Cloud Computing",
  ]

  console.log(images.length != 0 ? typeof images[0].url : "land")

  console.log(images)

  const { uploadImages } = useCloudinaryUpload()

  const handleSelectImages = async (e) => {
    const files = e.target.files

    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const items = await uploadImages(files)
      setImages((prev) => [...prev, ...items])

    } catch (err) {
      console.error('Image upload failed', err)
      alert(err?.message || 'Image upload failed. Please check Cloudinary env and try again.')
    } finally {
      setUploading(false)
      e.target.value = '' // reset input
    }
  }

  const removeImage = async (item) => {
    try {
      await axios.post(baseUrl + '/api/course/cloudinary/delete', { publicId: item.publicId }, { withCredentials: true })
         
      toast.success('Image deleted successfully', {
        position: "top-right",
        autoClose: 200,
        theme: "light",
        });
        
    } catch (err) {
      console.error('Cloudinary server delete failed', err?.response?.data || err.message)  

      toast.error(`${err?.response?.data || err.message}`, {
        position: "top-right",
        autoClose: 200,
        theme: "light",
        });

    }
    setImages((prev) => prev.filter((it) => it.url !== item.url))
  }

  const resetForm = () => {
    setTitle("")
    setSubTitle("")
    setDescription("")
    setMrp("")
    setPrice("")
    setIsPublished(false)
    setImages([])
    setDemoLink("")
  }  

  const uploadCourseDetails = async()=>{  
       
    if(!title || !subTitle || !description ||  !price ){
         return toast.error("All fields are required", {
                position: "top-right",
                autoClose: 2000,
                      })
                       }
                       setLoading(true)

            try {  
                 const result =  await axios.post(baseUrl + '/api/course/add-course',  {
                  title,  subTitle , description , mrp, price , isPublished , category } , {withCredentials : true})  ; 

              console.log(result.data.courseId)   ;
              let courseId =   result.data.courseId  ;

              let sendImages = images?.map((e)=> {
                    let url =   e.url 
                    return url 
              }) 

              console.log(sendImages)

              const uploadThumnail = await axios.post(baseUrl +  '/api/course/add-thumbnail' , 
                                                        { courseId , images : sendImages , demoLink}  
                                                      ,     { withCredentials : true})  
                  if(uploadThumnail.data.success){  
                        setLoading(false)  ;
                         resetForm() ;
                           toast.success('Course added successfully', {
                                position: "top-right",
                                autoClose: 200,
                                theme: "light",
                           })
                           navigate('/educator/courses')
                  }else{ 
                        setLoading(false)
                        toast.error('Something went wrong', {
                              position: "top-right",
                              autoClose: 200,
                              theme: "light",
                        })
                  }  


              
            } catch (error) {    

              setLoading(false)
                   
               console.log(error.response.data.message)

                 toast.error(error.response.data.message , {
                    position: "top-right",
                    autoClose: 200,
                    theme: "light",
                 })
              
            }


      
  }

  return (
    <div className=' w-full min-h-[100vh] bg-[#f2f4f5] flex justify-center items-start pt-16 pb-10 overflow-x-hidden px-4'>
      <Nav/>
      <form onSubmit={(e)=>e.preventDefault()} className='bg-white w-full max-w-3xl rounded-2xl shadow p-6 md:p-10 flex flex-col gap-5'>
        <h1 className='text-2xl md:text-3xl font-bold text-center'>Add Course</h1>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='isPublished'>Is Published?</label>
          <select
            id='isPublished'
            value={isPublished ? 'true' : 'false'}
            onChange={(e)=>setIsPublished(e.target.value === 'true')}
            className='w-1/5 outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'
          >
            <option value='false'>No</option>
            <option value='true'>Yes</option>
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='Enter course title'
            className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='subTitle'>Sub Title</label>
          <input
            id='subTitle'
            type='text'
            value={subTitle}
            onChange={(e)=>setSubTitle(e.target.value)}
            placeholder='Enter course sub title'
            className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='description'>Description</label>
          <textarea
            id='description'
            rows={4}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='Write a short description about the course'
            className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2 resize-none'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor='mrp'>MRP</label>
            <input
              id='mrp'
              type='number'
              value={mrp}
              onChange={(e)=>setMrp(e.target.value)}
              placeholder='Enter MRP'
              className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-semibold' htmlFor='price'>Price</label>
            <input
              id='price'
              type='number'
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              placeholder='Enter selling price'
              className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'
            />
          </div>
        </div>

        {/* Category */}
        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='category'>Category</label>
          <select
            id='category'
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className='w-full md:w-1/2 outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'
          >
            <option value=''>Select category (optional)</option>
            {categories.map((c)=>(<option key={c} value={c}>{c}</option>))}
          </select>
        </div>

        {/* Media Section */}
        <div className='flex flex-col gap-3'>
          <label className='font-semibold'>Course Thumbnails</label>
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={handleSelectImages}
            className='w-full cursor-pointer bg-black text-white px-4 py-2 rounded-xl'
          />
          {uploading && <span className='text-sm text-gray-500'>Uploading...</span>}
          {images.length > 0 && (
            <div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
              {images.map((item) => (
                <div key={item.url} className='relative group'>
                  <img src={item.url} alt='thumb' className='w-full h-24 object-cover rounded' />
                  <div className='absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100'>
                    <button
                      type='button'
                      onClick={() => removeImage(item)}
                      className='bg-black/60 text-white text-xs px-2 py-0.5 rounded'
                    >Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold' htmlFor='demoLink'>Demo Link</label>
          <input
            id='demoLink'
            type='url'
            value={demoLink}
            onChange={(e)=>setDemoLink(e.target.value)}
            placeholder='https://example.com/demo'
            className='w-full outline-none shadow border border-s-0 border-e-0 bg-gray-50 border-gray-400 p-2'
          />
        </div>

        <div className='flex gap-3 justify-end pt-2'>
          <button 
           disabled={loading}
            type='button'
            onClick={resetForm}
            className=' cursor-pointer bg-gray-200 text-black px-4 py-2 rounded-xl'
          >
            Reset
          </button>
          <button   
           
           disabled ={loading}
           onClick={uploadCourseDetails}
           type='button' className= 'bg-black cursor-pointer text-white px-4 py-2 rounded-xl'>{loading ? <ClipLoader/> :  "Save"} </button>
        </div>
      </form>
    </div>
  )
}

export default Createcourse
