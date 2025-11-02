import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../component/Nav'
import { baseUrl } from '../App'
import Card from '../component/Card'
import ClipLoader from 'react-spinners/ClipLoader'

// Helper: Convert YouTube or Vimeo URL to embed URL
const toEmbedUrl = (raw) => {
  if (!raw) return null
  const url = String(raw).trim()

  try {
    // YouTube: youtu.be/ID with optional params
    const ytShort = url.match(/^https?:\/\/youtu\.be\/([\w-]{11})(?:[?#].*)?$/)
    if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`

    // YouTube: watch?v=ID (any order of params)
    const ytWatch = url.match(/[?&]v=([\w-]{11})/)
    if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`

    // YouTube: already embed
    if (/youtube\.com\/embed\//.test(url)) return url

    // Vimeo standard URL with optional path/query/hash
    const vimeoStd = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:[?#\/].*)?$/)
    if (vimeoStd) return `https://player.vimeo.com/video/${vimeoStd[1]}`

    // Vimeo manage URL (e.g., vimeo.com/manage/videos/123456789)
    const vimeoManage = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/manage\/videos\/(\d+)(?:[?#\/].*)?$/)
    if (vimeoManage) return `https://player.vimeo.com/video/${vimeoManage[1]}`

    // Vimeo: already embed
    if (/player\.vimeo\.com\/video\//.test(url)) return url

    // If none match, return null (not embeddable)
    return null
  } catch (e) {
    console.warn('Failed to parse video URL:', url, e)
    return null
  }
}

const ShowCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(null)
  const [otherCourses, setOtherCourses] = useState([])
  const [modules, setModules] = useState([])
  const [activeModuleId, setActiveModuleId] = useState('')
  const [slideIndex, setSlideIndex] = useState(0)

  // Player state
  const [playerOpen, setPlayerOpen] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [currentSrc, setCurrentSrc] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/api/course/getcourse-by-id/${id}`, { withCredentials: true })
        const c = res.data?.courseData
        setCourse(c)
        if (c?.educatorId) {
          const [oc, ml] = await Promise.all([
            axios.get(`${baseUrl}/api/course/published-by-educator/${c.educatorId}`, { withCredentials: true }),
            axios.get(`${baseUrl}/api/course/modules-with-lessons/${id}`, { withCredentials: true })
          ])
          const list = (oc.data?.courseData || []).filter((x) => x._id !== id)
          setOtherCourses(list)
          setModules(ml.data?.modules || [])
        } else {
          setOtherCourses([])
          const ml = await axios.get(`${baseUrl}/api/course/modules-with-lessons/${id}`, { withCredentials: true })
          setModules(ml.data?.modules || [])
        }
      } catch (err) {
        console.error('Fetch error:', err)
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
    const embed = toEmbedUrl(demo)
    if (embed) list.push({ type: 'video', src: embed })
    const imgs = course?.thumbnails?.images || []
    imgs.forEach((src) => list.push({ type: 'image', src }))
    return list
  }, [course])

  useEffect(() => {
    setSlideIndex(0)
  }, [course])

  // Close player and clear state
  const closePlayer = () => {
    setPlayerOpen(false)
    setCurrentLesson(null)
    setCurrentSrc(null)
  }

  // Toggle player on lesson click: re-click same lesson hides the player
  const openLesson = (lesson) => {
    if (playerOpen && currentLesson && currentLesson._id === lesson._id) {
      closePlayer()
      return
    }
    const src = toEmbedUrl(lesson?.videoUrl)
    setCurrentLesson(lesson)
    setCurrentSrc(src)
    setPlayerOpen(true)
  }

  // ESC to close player
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') closePlayer() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [playerOpen, currentLesson])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <ClipLoader color='#fff' />
      </div>
    )
  }

  if (!course) return null

  return (
    <div className='min-h-screen w-full bg-[#0b0f14] text-gray-100'>
      <Nav />

      <div className='max-w-7xl mx-auto px-4 pt-24 pb-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left: media */}
          <div className='w-full'>
            <div className='relative w-full aspect-video bg-[#0f1318] rounded-2xl overflow-hidden border border-gray-800'>
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
                    onError={(e) => {
                      console.error('Video failed to load:', e)
                    }}
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

              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent'></div>

              {slides.length > 1 && (
                <>
                  <button
                    onClick={() => setSlideIndex((p) => (p - 1 + slides.length) % slides.length)}
                    className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg ring-1 ring-white/40 backdrop-blur-sm outline-none'
                    aria-label='Previous'
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setSlideIndex((p) => (p + 1) % slides.length)}
                    className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg ring-1 ring-white/40 backdrop-blur-sm outline-none'
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

          {/* Right: summary */}
          <div className='space-y-3'>
            <h1 className='text-3xl font-semibold text-white'>{course.title}</h1>
            {course.subTitle && <p className='text-gray-300'>{course.subTitle}</p>}
            <div className='flex items-center gap-3 text-sm text-gray-400'>
              <span>0 (0 reviews)</span>
              <span>•</span>
              <span>{course.category || 'General'}</span>
            </div>

            <div className='flex items-baseline gap-3 pt-2'>
              <span className='text-3xl font-bold text-white'>₹{course.price}</span>
              {course.mrp && Number(course.mrp) > Number(course.price) && (
                <span className='text-base line-through text-gray-500'>₹{course.mrp}</span>
              )}
            </div>

            <button className='mt-4 bg-white text-black px-6 py-3 rounded-xl font-semibold'>Enroll Now</button>
          </div>
        </div>

        {/* Description + Curriculum */}
        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-2 space-y-6'>
            <section>
              <h2 className='text-xl font-semibold mb-2 text-white'>Course Description</h2>
              <p className='text-gray-300 whitespace-pre-wrap leading-relaxed'>{course.description}</p>
            </section>

            <section>
              <h2 className='text-xl font-semibold mb-3 text-white'>Course Curriculum</h2>
              <div className='rounded-xl overflow-hidden border border-gray-800 bg-[#0f1318]'>
                {modules.length > 0 ? (
                  modules.map((m) => (
                    <div key={m._id}>
                      <button
                        onClick={() => setActiveModuleId((prev) => (prev === m._id ? '' : m._id))}
                        className='w-full flex justify-between items-center p-4 bg-[#141a21] hover:bg-[#1a2230] text-gray-200'
                      >
                        <span className='font-medium'>Module {m.number}: {m.name}</span>
                        <div className='flex items-center gap-3 text-xs text-gray-400'>
                          <span>{m.lessons?.length || 0} lessons</span>
                          <span className={`inline-block transition-transform ${activeModuleId === m._id ? 'rotate-90' : ''}`}>›</span>
                        </div>
                      </button>
                      {activeModuleId === m._id && (
                        <div className='p-4 space-y-3 bg-[#0f1318]'>
                          {(m.lessons || []).sort((a, b) => Number(a.number) - Number(b.number)).map((l) => (
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
                      )}
                    </div>
                  ))
                ) : (
                  <div className='p-6 text-gray-500'>No modules added yet.</div>
                )}
              </div>
            </section>
          </div>

          <div></div>
        </div>

        {/* Other courses by educator */}
        {otherCourses && otherCourses.length > 0 && (
          <div className='mt-12'>
            <div className='flex items-center gap-3 mb-5'>
              <img
                src={course?.educator?.photoUrl || '/logo.jpg'}
                alt='Educator'
                className='w-10 h-10 rounded-full object-cover border border-gray-700'
              />
              <div>
                <h2 className='text-2xl font-semibold text-white'>
                  Other Published Courses by {course?.educator?.name || 'the Educator'}
                </h2>
                {course?.educator?.email && (
                  <div className='text-sm text-gray-400'>{course.educator.email}</div>
                )}
              </div>
            </div>
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

        {/* Backdrop (below nav), click to close on mobile */}
        {playerOpen && (
          <div
            onClick={() => {
              setPlayerOpen(false)
              setCurrentLesson(null)
              setCurrentSrc(null)
            }}
            className='fixed inset-0 top-[70px] bg-black/40 z-40 sm:block'
          />
        )}

        {/* Right slide-in player (below fixed nav) */}
        <div
          className={`fixed top-[70px] right-0 z-50 h-[calc(100vh-70px)] w-full sm:w-[480px] bg-[#0b0f14] border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ${
            playerOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
        >
          <div className='h-full flex flex-col'>
            <div className='flex items-center justify-between px-4 py-3 border-b border-gray-800 sticky top-0 bg-[#0b0f14]'>
              <div className='flex-1 pr-2'>
                <div className='text-sm text-gray-400'>Now playing</div>
                <div className='font-semibold text-white truncate'>
                  {currentLesson ? `Lesson ${currentLesson.number}: ${currentLesson.name}` : '—'}
                </div>
              </div>
              <button
                onClick={() => {
                  setPlayerOpen(false)
                  setCurrentLesson(null)
                  setCurrentSrc(null)
                }}
                className='text-gray-300 hover:text-white text-2xl leading-none'
                aria-label='Close player'
              >
                ×
              </button>
            </div>
            <div className='p-3'>
              <div className='w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-800'>
                {currentSrc ? (
                  <iframe
                    key={currentSrc}
                    src={currentSrc}
                    className='w-full h-full'
                    title='Lesson Player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    onError={(e) => {
                      console.error('Lesson video failed to load:', e)
                    }}
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-400'>
                    Video not available or embedding disabled.
                  </div>
                )}
              </div>
            </div>
            {currentLesson?.lessonDetails && (
              <div className='px-4 pb-6 text-sm text-gray-300'>{currentLesson.lessonDetails}</div>
            )}
          </div>
        </div>
        </div>
      </div>
  )
}

export default ShowCourse