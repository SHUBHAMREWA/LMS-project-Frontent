import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Nav from '../../component/Nav'
import { baseUrl } from '../../App'
import ClipLoader from 'react-spinners/ClipLoader'
import { toast } from 'react-toastify'
import getEnrollCourses from '../../customHooks/getEnrollCourses'
import { FaStar } from 'react-icons/fa'

// Convert common video links to embeddable src
const toEmbedUrl = (raw) => {
  if (!raw) return null
  const url = String(raw).trim()
  // YouTube short
  const ytShort = url.match(/^https?:\/\/youtu\.be\/([\w-]{11})(?:[?#].*)?$/)
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`
  // YouTube watch
  const ytWatch = url.match(/[?&]v=([\w-]{11})/)
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`
  if (/youtube\.com\/embed\//.test(url)) return url
  // Vimeo
  const vimeoStd = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:[?#/].*)?$/)
  if (vimeoStd) return `https://player.vimeo.com/video/${vimeoStd[1]}`
  const vimeoManage = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/manage\/videos\/(\d+)(?:[?#/].*)?$/)
  if (vimeoManage) return `https://player.vimeo.com/video/${vimeoManage[1]}`
  if (/player\.vimeo\.com\/video\//.test(url)) return url
  return null
}

const WatchCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // ensure enroll data is in store
  getEnrollCourses()
  const { enrollCourseData } = useSelector((s) => s.enrollCourseData)
  const { userData } = useSelector((s) => s.user)

  const enrolledIds = useMemo(() => {
    const arr = Array.isArray(enrollCourseData) ? enrollCourseData : []
    return new Set(arr.map((e) => String(e?.course?._id || e?.courseId)))
  }, [enrollCourseData])
  const isEnrolled = useMemo(() => enrolledIds.has(String(id)), [enrolledIds, id])

  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])

  // player state
  const [currentLesson, setCurrentLesson] = useState(null)
  const [currentSrc, setCurrentSrc] = useState(null)

  // review state
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // slides for header card
  const slides = useMemo(() => {
    if (!course) return []
    const list = []
    const demo = course?.thumbnails?.demoLink
    const embed = toEmbedUrl(demo)
    if (embed) list.push({ type: 'video', src: embed })
    const imgs = course?.thumbnails?.images || []
    imgs.forEach((src) => list.push({ type: 'image', src }))
    return list
  }, [course])

  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    setSlideIndex(0)
  }, [course])

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/api/course/getcourse-by-id/${id}`, { withCredentials: true })
        const c = res.data?.courseData
        setCourse(c)
        const ml = await axios.get(`${baseUrl}/api/course/modules-with-lessons/${id}`, { withCredentials: true })
        const mods = ml.data?.modules || []
        setModules(mods)
        // auto pick first lesson when enrolled
        const firstModule = mods.find(m => Array.isArray(m.lessons) && m.lessons.length > 0)
        const firstLesson = firstModule?.lessons?.sort((a,b)=>Number(a.number)-Number(b.number))[0]
        if (firstLesson) {
          setCurrentLesson(firstLesson)
          setCurrentSrc(toEmbedUrl(firstLesson.videoUrl))
        }
      } catch (err) {
        navigate('/allCourses')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetch()
  }, [id, navigate])

  useEffect(() => {
    if (!userData?._id) return
    if (!isEnrolled && !loading) {
      // toast.info('Please enroll to watch this course')
      navigate(`/mycourse/${id}`)
    }
  }, [isEnrolled, loading, navigate, id, userData])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <ClipLoader color='#fff' />
      </div>
    )
  }

  if (!course) return null

  const openLesson = (lesson) => {
    const src = toEmbedUrl(lesson?.videoUrl)
    setCurrentLesson(lesson)
    setCurrentSrc(src)
  }

  const submitReview = async (e) => {
    e.preventDefault()
    if (!isEnrolled) {
      toast.info('Enroll to add a review')
      return
    }
    if (!rating) {
      toast.info('Please select a rating')
      return
    }
    try {
      setSubmitting(true)
      await axios.post(
        `${baseUrl}/api/course/add-review`,
        { courseId: id, rating, comment },
        { withCredentials: true }
      )
      toast.success('Review added')
      setRating(5)
      setHoverRating(0)
      setComment('')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen w-full bg-[#0b0f14] text-gray-100'>
      <Nav />

      <div className='max-w-7xl mx-auto px-4 pt-24 pb-12'>
        {/* Header media card (slider) */}
        <div className='relative w-full rounded-2xl overflow-hidden border border-gray-800 bg-[#0f1318] shadow-lg'>
          <div className='relative w-full aspect-video'>
            {slides.length > 0 ? (
              slides[slideIndex].type === 'video' ? (
                <iframe
                  key={`video-${slideIndex}`}
                  src={slides[slideIndex].src}
                  className='w-full h-full'
                  title='Course Demo'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                />
              ) : (
                <img
                  key={`img-${slideIndex}`}
                  src={slides[slideIndex].src}
                  alt={course.title}
                  className='w-full h-full object-cover'
                />
              )
            ) : (
              <div className='w-full h-full flex items-center justify-center text-gray-400'>No media</div>
            )}

            {slides.length > 1 && (
              <>
                <button
                  onClick={() => setSlideIndex((p) => (p - 1 + slides.length) % slides.length)}
                  className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg ring-1 ring-white/40 backdrop-blur-sm'
                  aria-label='Previous'
                >
                  ‹
                </button>
                <button
                  onClick={() => setSlideIndex((p) => (p + 1) % slides.length)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg ring-1 ring-white/40 backdrop-blur-sm'
                  aria-label='Next'
                >
                  ›
                </button>
                <div className='absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2'>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full ${i === slideIndex ? 'bg-white' : 'bg-white/30'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Player + Curriculum */}
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left: Player */}
          <div className='lg:col-span-2'>
            <div className='w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-800'>
              {currentSrc ? (
                <iframe
                  key={currentSrc}
                  src={currentSrc}
                  className='w-full h-full'
                  title={currentLesson ? `Lesson ${currentLesson.number}: ${currentLesson.name}` : 'Lesson Player'}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                  Select a lesson to start watching.
                </div>
              )}
            </div>
            {currentLesson?.lessonDetails && (
              <div className='mt-3 text-sm text-gray-300'>{currentLesson.lessonDetails}</div>
            )}
          </div>

          {/* Right: Modules/Lessons */}
          <div className='space-y-6'>
            <div className='rounded-xl overflow-hidden border border-gray-800 bg-[#0f1318]'>
              <div className='px-4 py-3 border-b border-gray-800'>
                <h2 className='text-lg font-semibold text-white'>Course Curriculum</h2>
                <div className='text-xs text-gray-400'>{modules.reduce((a,m)=>a+(m.lessons?.length||0),0)} lessons</div>
              </div>
              <div>
                {modules.length > 0 ? (
                  modules.map((m) => (
                    <details key={m._id} open className='group'>
                      <summary className='w-full cursor-pointer list-none flex justify-between items-center px-4 py-3 bg-[#141a21] hover:bg-[#1a2230] text-gray-200'>
                        <span className='font-medium'>Module {m.number}: {m.name}</span>
                        <div className='flex items-center gap-3 text-xs text-gray-400'>
                          <span>{m.lessons?.length || 0} lessons</span>
                          <span className='inline-block transition-transform group-open:rotate-90'>›</span>
                        </div>
                      </summary>
                      <div className='p-4 space-y-3 bg-[#0f1318]'>
                        {(m.lessons || []).sort((a,b)=>Number(a.number)-Number(b.number)).map((l) => (
                          <button
                            key={l._id}
                            onClick={() => openLesson(l)}
                            className='w-full text-left flex items-start justify-between py-2 border-b border-gray-800 last:border-b-0 hover:bg-white/5 rounded px-2'
                          >
                            <div>
                              <div className='font-medium text-gray-100'>Lesson {l.number}: {l.name}</div>
                              <div className='text-sm text-gray-400'>{l.lessonDetails}</div>
                            </div>
                            <div className='text-blue-400 text-sm'>Play ›</div>
                          </button>
                        ))}
                      </div>
                    </details>
                  ))
                ) : (
                  <div className='p-6 text-gray-500'>No modules added yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className='mt-10 w-full lg:w-[70%]'>
          <div className='bg-[#0f1318] border border-gray-800 rounded-2xl p-5'>
            <h3 className='text-lg font-semibold text-white mb-4'>Add your review</h3>
            <form onSubmit={submitReview} className='space-y-4'>
              {/* Stars */}
              <div className='flex items-center gap-2'>
                {[1,2,3,4,5].map((s) => (
                  <button
                    type='button'
                    key={s}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(s)}
                    className='focus:outline-none'
                    aria-label={`Rate ${s}`}
                  >
                    <FaStar className={`${(hoverRating || rating) >= s ? 'text-yellow-400' : 'text-gray-500'} text-2xl`} />
                  </button>
                ))}
                <span className='ml-2 text-sm text-gray-400'>{rating ? `${rating}/5` : 'Select rating'}</span>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Write your feedback (optional)'
                className='w-full bg-black/40 text-gray-100 border border-gray-700 rounded-xl px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600'
                rows={4}
              />

              <button
                type='submit'
                disabled={!isEnrolled || submitting}
                className={`px-5 py-2 rounded-xl font-medium ${!isEnrolled ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              {!isEnrolled && (
                <div className='text-xs text-gray-400'>You need to enroll to add a review.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchCourse
