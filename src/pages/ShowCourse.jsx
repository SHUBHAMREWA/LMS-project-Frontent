import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../component/Nav'
import { baseUrl } from '../App'
import Card from '../component/Card'
import ClipLoader from 'react-spinners/ClipLoader'

const toYouTubeEmbed = (url) => {
  if (!url) return null
  try {
    const short = url.match(/^https?:\/\/youtu\.be\/([\w-]{11})/)
    if (short) return `https://www.youtube.com/embed/${short[1]}`
    const watch = url.match(/[?&]v=([\w-]{11})/)
    if (watch) return `https://www.youtube.com/embed/${watch[1]}`
    const embed = url.match(/^https?:\/\/(www\.)?youtube\.com\/embed\/([\w-]{11})/)
    if (embed) return url
    return url
  } catch {
    return url
  }
}

const ShowCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(null)
  const [otherCourses, setOtherCourses] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/api/course/getcourse-by-id/${id}`, { withCredentials: true })
        const c = res.data?.courseData
        setCourse(c)
        if (c?.educatorId) {
          const oc = await axios.get(`${baseUrl}/api/course/published-by-educator/${c.educatorId}`, { withCredentials: true })
          const list = (oc.data?.courseData || []).filter((x) => x._id !== id)
          setOtherCourses(list)
        } else {
          setOtherCourses([])
        }
      } catch (err) {
        navigate('/allCourses')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetch()
  }, [id])

  const slides = useMemo(() => {
    if (!course) return []
    const list = []
    const demo = course?.thumbnails?.demoLink
    const embed = toYouTubeEmbed(demo)
    if (embed) list.push({ type: 'video', src: embed })
    const imgs = course?.thumbnails?.images || []
    imgs.forEach((src) => list.push({ type: 'image', src }))
    return list
  }, [course])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <ClipLoader />
      </div>
    )
  }

  if (!course) return null

  return (
    <div className='min-h-screen w-full bg-white'>
      <Nav />

      <div className='max-w-7xl mx-auto px-4 pt-24 pb-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left: media */}
          <div className='w-full'>
            <div className='relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-200'>
              {slides.length > 0 ? (
                slides[0].type === 'video' ? (
                  <iframe
                    src={slides[0].src}
                    className='w-full h-full'
                    title='Course Demo'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                  />
                ) : (
                  <img src={slides[0].src} alt={course.title} className='w-full h-full object-cover' />
                )
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>No media</div>
              )}
            </div>
          </div>

          {/* Right: summary */}
          <div className='space-y-3'>
            <h1 className='text-3xl font-black text-black'>{course.title}</h1>
            {course.subTitle && <p className='text-gray-600 font-semibold'>{course.subTitle}</p>}
            <div className='flex items-center gap-3 text-sm text-gray-600'>
              <span>0 (0 reviews)</span>
              <span>•</span>
              <span>{course.category || 'General'}</span>
            </div>

            <div className='flex items-baseline gap-3 pt-2'>
              <span className='text-4xl font-black text-black'>₹{course.price}</span>
              {course.mrp && Number(course.mrp) > Number(course.price) && (
                <span className='text-lg line-through text-gray-400'>₹{course.mrp}</span>
              )}
            </div>

            <ul className='mt-4 space-y-2 text-sm text-gray-700'>
              <li className='flex items-center gap-2'>✅ 10+ hours of video content</li>
              <li className='flex items-center gap-2'>✅ Lifetime access to course materials</li>
            </ul>

            <button className='mt-4 bg-black text-white px-6 py-3 rounded-xl font-bold'>Enroll Now</button>
          </div>
        </div>

        {/* Description */}
        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-2 space-y-6'>
            <section>
              <h2 className='text-xl font-black mb-3'>What You’ll Learn</h2>
              <ul className='list-disc pl-6 space-y-1 text-gray-700'>
                <li>Build real-world skills with hands-on practice</li>
                <li>Understand key concepts from basics to advanced</li>
                <li>Project-ready knowledge and best practices</li>
              </ul>
            </section>
            <section>
              <h2 className='text-xl font-black mb-3'>Requirements</h2>
              <p className='text-gray-700'>Basic programming knowledge is helpful but not required.</p>
            </section>
            <section>
              <h2 className='text-xl font-black mb-3'>Who This Course is For</h2>
              <p className='text-gray-700'>Beginners, aspiring developers, and professionals looking to upgrade skills.</p>
            </section>
          </div>
        </div>

        {/* Other courses by educator */}
        {otherCourses && otherCourses.length > 0 && (
          <div className='mt-12'>
            <h2 className='text-2xl font-black mb-5'>Other Published Courses by the Educator</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {otherCourses.map((c) => (
                <Card
                  key={c._id}
                  id={c._id}
                  title={c.title}
                  price={c.price}
                  mrp={c.mrp}
                  category={c.category}
                  images={c.thumbnails?.images}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowCourse
