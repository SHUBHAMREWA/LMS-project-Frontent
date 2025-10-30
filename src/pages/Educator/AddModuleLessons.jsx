import React, { useState } from 'react'
import Nav from '../../component/Nav'
import { useSelector } from 'react-redux'
import { getEducatorCourse } from '../../customHooks/getEducatorCourse'
import axios from 'axios'
import { baseUrl } from '../../App'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { AiOutlineBook, AiOutlineVideoCamera } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const AddModuleLessons = () => {
  // Get educator courses from Redux
  getEducatorCourse()
  const { educatorCourseData } = useSelector(state => state.educatorCourseData)
  const navigate = useNavigate()

  // State

  // State
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const [showModuleForm, setShowModuleForm] = useState(false)
  const [showLessonForm, setShowLessonForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Module states
  const [moduleName, setModuleName] = useState("")
  const [moduleNumber, setModuleNumber] = useState("")

  // Lesson states
  const [selectedModuleId, setSelectedModuleId] = useState("")
  const [lessonName, setLessonName] = useState("")
  const [lessonNumber, setLessonNumber] = useState("")
  const [lessonDetails, setLessonDetails] = useState("")
  const [videoUrl, setVideoUrl] = useState("")

  // Modules and lessons data for display
  const [modules, setModules] = useState([])
  const [lessons, setLessons] = useState([])

  // Normalize courses list (supports array or single object)
  const coursesList = Array.isArray(educatorCourseData)
    ? educatorCourseData
    : (educatorCourseData ? [educatorCourseData] : [])

  // Currently selected course object
  const currentCourse = coursesList.find((c) => c._id === selectedCourseId)

  // Slider state for course media
  const [slideIndex, setSlideIndex] = useState(0)

  // Helper: Convert YouTube URL to embed form
  const toYouTubeEmbed = (url) => {
    if (!url) return null
    try {
      const ytShort = url.match(/^https?:\/\/youtu\.be\/([\w-]{11})/)
      if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`
      const ytWatch = url.match(/[?&]v=([\w-]{11})/)
      if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`
      const ytEmbed = url.match(/^https?:\/\/(www\.)?youtube\.com\/embed\/([\w-]{11})/)
      if (ytEmbed) return url
      return url
    } catch {
      return url
    }
  }

  const slides = (() => {
    const list = []
    const demo = currentCourse?.thumbnails?.demoLink
    const embed = toYouTubeEmbed(demo)
    if (embed) list.push({ type: 'video', src: embed })
    const imgs = currentCourse?.thumbnails?.images || []
    imgs.forEach((src) => list.push({ type: 'image', src }))
    return list
  })()

  // Handle course selection
  const handleCourseSelect = async (courseId) => {
    setSelectedCourseId(courseId)
    // reset module/lesson selection when course changes
    setSelectedModuleId("")
    setLessons([])
    setShowModuleForm(false)
    setShowLessonForm(false)
    setSlideIndex(0)
    
    // Fetch modules for selected course
    if (courseId) {
      await fetchModules(courseId)
    }
  }

  // Fetch modules for a course
  const fetchModules = async (courseId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/course/get-modules/${courseId}`, {
        withCredentials: true
      })  
       
      // console.log(response.data.moduleData)
      if (response.data.success) {
        setModules(response.data.moduleData || [])
      }
    } catch (error) {
      console.log("Error fetching modules:", error)
      setModules([])
    }
  }

  // Fetch lessons for a module
  const fetchLessons = async (moduleId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/course/get-lessons/${moduleId}`, {
        withCredentials: true
      })
      
      console.log( "this is lesson data" ,response.data.lessonData)

      if (response.data.success) {
        setLessons(response.data.lessonData || [])
      }
    } catch (error) {
      console.log("Error fetching lessons:", error)
      setLessons([])
    }
  }

  // Add Module
  const handleAddModule = async () => {
    if (!moduleName || !moduleNumber) {
      return toast.error("Module name and number are required", {
        position: "top-right",
        autoClose: 2000,
      })
    }

    if (!selectedCourseId) {
      return toast.error("Please select a course first", {
        position: "top-right",
        autoClose: 2000,
      })
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${baseUrl}/api/course/add-module`,
        {
          courseId: selectedCourseId,
          name: moduleName,
          number: moduleNumber
        },
        { withCredentials: true }
      )

      if (response.data.success) {
        toast.success("Module added successfully", {
          position: "top-right",
          autoClose: 2000,
        })
        setModuleName("")
        setModuleNumber("")
        setShowModuleForm(false)
        await fetchModules(selectedCourseId)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add module", {
        position: "top-right",
        autoClose: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  // Add Lesson
  const handleAddLesson = async () => {
    if (!lessonName || !lessonNumber || !lessonDetails || !videoUrl) {
      return toast.error("All lesson fields are required", {
        position: "top-right",
        autoClose: 2000,
      })
    }

    if (!selectedModuleId) {
      return toast.error("Please select a module first", {
        position: "top-right",
        autoClose: 2000,
      })
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${baseUrl}/api/course/add-lesson`,
        {
          moduleId: selectedModuleId,
           lessonName,
          lessonNumber,
           lessonDetails,
           videoUrl
        },
        { withCredentials: true }
      )

      if (response.data.success) {
        toast.success("Lesson added successfully", {
          position: "top-right",
          autoClose: 2000,
        })
        setLessonName("")
        setLessonNumber("")
        setLessonDetails("")
        setVideoUrl("")
        setShowLessonForm(false)
        await fetchLessons(selectedModuleId)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add lesson", {
        position: "top-right",
        autoClose: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  // Delete Module
  const handleDeleteModule = async (moduleId) => {
    if (!moduleId) return
    const ok = window.confirm('Delete this module? This may remove its lessons.')
    if (!ok) return
    setLoading(true)
    try {
      const res = await axios.delete(`${baseUrl}/api/course/module-delete/${moduleId}`, { withCredentials: true })
      if (res.data?.success) {
        toast.success('Module deleted', { position: 'top-right', autoClose: 2000 })
        if (selectedModuleId === moduleId) {
          setSelectedModuleId('')
          setLessons([])
          setShowLessonForm(false)
        }
        await fetchModules(selectedCourseId)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete module', { position: 'top-right', autoClose: 2000 })
    } finally {
      setLoading(false)
    }
  }

  // Delete Lesson
  const handleDeleteLesson = async (lessonId) => {
    if (!lessonId) return
    const ok = window.confirm('Delete this lesson?')
    if (!ok) return
    setLoading(true)
    try {
      const res = await axios.delete(`${baseUrl}/api/course/lesson-delete/${lessonId}`, { withCredentials: true })
      if (res.data?.success) {
        toast.success('Lesson deleted', { position: 'top-right', autoClose: 2000 })
        await fetchLessons(selectedModuleId)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete lesson', { position: 'top-right', autoClose: 2000 })
    } finally {
      setLoading(false)
    }
  }

  // Handle module selection for lessons
  const handleModuleSelect = async (moduleId) => {
    setSelectedModuleId(moduleId)
    if (moduleId) {
      await fetchLessons(moduleId)
      setShowLessonForm(true)
    } else {
      setLessons([])
      setShowLessonForm(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#0b0f14] text-white pb-10'>
      <Nav />
      
      <div className='w-full flex justify-center items-start pt-20 px-4'>
        <div className='bg-transparent text-white w-full max-w-6xl rounded-2xl p-0 md:p-0 flex flex-col gap-6'>
          
          {/* Header */}
          <div className='text-center border-b border-gray-400 pb-4'>
            <h1 className='text-2xl md:text-4xl font-bold text-gray-300'>Add Modules & Lessons</h1>
            <p className='text-gray-400 mt-2'>Manage your course content structure</p>
          </div>

          {/* Two-column layout: Main (modules/lessons) + Right sidebar (courses) */}
          <div className='w-full flex flex-col md:flex-row gap-6'>
            {/* Main area */}
            <div className='flex-1'>
              {!selectedCourseId ? (
                <div className='w-full min-h-[200px] flex flex-col justify-center items-center text-center p-8 border border-dashed border-gray-700 rounded-2xl bg-[#141a21] text-gray-200'>
                  <h2 className='text-2xl font-semibold text-gray-400'>Select a course to customize your content</h2>
                  <p className='text-gray-500 mt-2'>Choose a course from the right panel to add modules and lessons.</p>
                </div>
              ) : (
                <>
                  {/* Course Preview (slider) */}
                  <div className='flex flex-col gap-3 mb-4'>
                    <div className='bg-[#141a21] p-4 rounded-2xl border border-gray-700 text-gray-100'>
                      <div className='flex flex-col gap-3'>
                        {/* Slider viewport */}
                        <div className='relative w-full aspect-video bg-black rounded-xl overflow-hidden'>
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
                                alt={`Slide ${slideIndex + 1}`}
                                className='w-full h-full object-cover'
                              />
                            )
                          ) : (
                            <div className='w-full h-full flex items-center justify-center text-gray-400'>No media</div>
                          )}

                          {/* Prev/Next controls */}
                          {slides.length > 1 && (
                            <>
                              <button
                                onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                                className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:cursor-pointer'
                                aria-label='Previous'
                              >
                                ‹
                              </button>
                              <button
                                onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                                className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:cursor-pointer'
                                aria-label='Next'
                              >
                                ›
                              </button>

                              {/* Dots */}
                              <div className='absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2'>
                                {slides.map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setSlideIndex(i)}
                                    className={`w-2.5 h-2.5 rounded-full ${i === slideIndex ? 'bg-white' : 'bg-white/30'} hover:cursor-pointer`}
                                    aria-label={`Go to slide ${i + 1}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Title and actions */}
                        <div className='flex items-center justify-between'>
                          <div>
                            <h3 className='text-xl font-bold text-white'>{currentCourse?.title}</h3>
                            {currentCourse?.subTitle && (
                              <p className='text-gray-400 text-sm'>{currentCourse.subTitle}</p>
                            )}
                          </div>
                          <button
                            onClick={() => navigate(`/educator/edit-course/${currentCourse?._id}`)}
                            className='bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg border border-white/20 hover:cursor-pointer'
                          >
                            Edit Course
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Module Section */}
                  <div className='flex flex-col gap-4'>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                        <AiOutlineBook className='text-2xl' /> Modules
                      </h2>
                      <button
                        onClick={() => setShowModuleForm(!showModuleForm)}
                        className='bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg flex items-center gap-2 transition border border-white/20 hover:cursor-pointer'
                      >
                        <FiPlus /> Add Module
                      </button>
                    </div>

                    {/* Add Module Form */}
                    {showModuleForm && (
                      <div className='bg-[#141a21] p-5 rounded-lg border border-gray-700 text-gray-100'>
                        <h3 className='font-semibold text-lg mb-3'>Create New Module</h3>
                        
                        <div className='flex flex-col md:flex-row gap-4'>
                          <div className='flex-1'>
                            <label className='font-semibold text-sm' htmlFor='moduleName'>Module Name</label>
                            <input
                              id='moduleName'
                              type='text'
                              value={moduleName}
                              onChange={(e) => setModuleName(e.target.value)}
                              placeholder='e.g., Introduction to React'
                              className='w-full mt-1 outline-none shadow border rounded-lg bg-[#0f1318] border-gray-700 text-white placeholder-gray-400 p-3'
                            />
                          </div>

                          <div className='w-full md:w-1/4'>
                            <label className='font-semibold text-sm' htmlFor='moduleNumber'>Module Number</label>
                            <input
                              id='moduleNumber'
                              type='number'
                              value={moduleNumber}
                              onChange={(e) => setModuleNumber(e.target.value)}
                              placeholder='1'
                              className='w-full mt-1 outline-none shadow border rounded-lg bg-[#0f1318] border-gray-700 text-white placeholder-gray-400 p-3'
                            />
                          </div>
                        </div>

                        <div className='flex gap-3 mt-4'>
                          <button
                            onClick={handleAddModule}
                            disabled={loading}
                            className='bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg transition disabled:opacity-50 hover:cursor-pointer'
                          >
                            {loading ? <ClipLoader size={18} color="#ffffff" /> : "Save Module"}
                          </button>
                          <button
                            onClick={() => setShowModuleForm(false)}
                            className='bg-transparent border border-gray-600 text-gray-200 px-6 py-2 rounded-lg transition hover:bg-gray-800 hover:cursor-pointer'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Display Modules */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {modules.length > 0 ? (
                        modules.map((module) => (
                          <div
                            key={module._id}
                            className='bg-[#141a21] p-4 rounded-lg border border-gray-700 hover:shadow-md transition cursor-pointer text-gray-100'
                            onClick={() => handleModuleSelect(module._id)}
                          >
                            <div className='flex justify-between items-start'>
                              <div>
                                <h3 className='font-bold text-lg text-white'>Module {module.number}</h3>
                                <p className='text-gray-300'>{module.name}</p>
                              </div>
                              <div className='flex items-center gap-2'>
                                <span className='bg-white/10 text-gray-200 px-2 py-1 rounded text-xs border border-gray-700'>
                                  {module.lessons?.length || 0} Lessons
                                </span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDeleteModule(module._id) }}
                                  className='text-red-400 hover:text-red-300 p-1 rounded hover:cursor-pointer'
                                  title='Delete Module'
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className='text-gray-500 col-span-2 text-center py-4'>No modules yet. Add your first module!</p>
                      )}
                    </div>
                  </div>

                  {/* Lesson Section */}
                  {selectedModuleId && showLessonForm && (
                    <div className='flex flex-col gap-4 border-t pt-6'>
                      <div className='flex justify-between items-center'>
                        <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                          <AiOutlineVideoCamera className='text-2xl' /> Lessons
                        </h2>
                      </div>

                      {/* Add Lesson Form */}
                      <div className='bg-[#141a21] p-5 rounded-lg border border-gray-700 text-gray-100'>
                        <h3 className='font-semibold text-lg mb-3'>Add New Lesson</h3>
                        
                        <div className='flex flex-col gap-4'>
                          <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex-1'>
                              <label className='font-semibold text-sm' htmlFor='lessonName'>Lesson Name</label>
                              <input
                                id='lessonName'
                                type='text'
                                value={lessonName}
                                onChange={(e) => setLessonName(e.target.value)}
                                placeholder='e.g., What is React?'
                                className='w-full mt-1 outline-none shadow border rounded-lg bg-[#0f1318] border-gray-700 text-white placeholder-gray-400 p-3'
                              />
                            </div>

                            <div className='w-full md:w-1/4'>
                              <label className='font-semibold text-sm' htmlFor='lessonNumber'>Lesson Number</label>
                              <input
                                id='lessonNumber'
                                type='number'
                                value={lessonNumber}
                                onChange={(e) => setLessonNumber(e.target.value)}
                                placeholder='1'
                                className='w-full mt-1 outline-none shadow border rounded-lg bg-[#0f1318] border-gray-700 text-white placeholder-gray-400 p-3'
                              />
                            </div>
                          </div>

                          <div>
                            <label className='font-semibold text-sm' htmlFor='lessonDetails'>Lesson Details</label>
                            <textarea
                              id='lessonDetails'
                              value={lessonDetails}
                              onChange={(e) => setLessonDetails(e.target.value)}
                              placeholder='Describe what students will learn in this lesson...'
                              rows={4}
                              className='w-full mt-1 outline-none shadow border rounded-lg bg-[#0f1318] border-gray-700 text-white placeholder-gray-400 p-3'
                            />
                          </div>

                          <div>
                            <label className='font-semibold text-sm' htmlFor='videoUrl'>Video URL</label>
                            <input
                              id='videoUrl'
                              type='url'
                              value={videoUrl}
                              onChange={(e) => setVideoUrl(e.target.value)}
                              placeholder='https://youtube.com/watch?v=...'
                              className='w-full mt-1 outline-none shadow border rounded-lg bg-[#0f1318] border-gray-700 text-white placeholder-gray-400 p-3'
                            />
                          </div>
                        </div>

                        <div className='flex gap-3 mt-4'>
                          <button
                            onClick={handleAddLesson}
                            disabled={loading}
                            className='bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg transition disabled:opacity-50 hover:cursor-pointer'
                          >
                            {loading ? <ClipLoader size={18} color="#ffffff" /> : "Save Lesson"}
                          </button>
                          <button
                            onClick={() => {
                              setShowLessonForm(false)
                              setSelectedModuleId("")
                              setLessons([])
                            }}
                            className='bg-transparent border border-gray-600 text-gray-200 px-6 py-2 rounded-lg transition hover:bg-gray-800 hover:cursor-pointer'
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      {/* Display Lessons */}
                      <div className='grid grid-cols-1 gap-3'>
                        {lessons.length > 0 ? (
                          lessons.map((lesson) => (
                            <div
                              key={lesson._id}
                              className='bg-[#141a21] p-4 rounded-lg border border-gray-700 hover:shadow-md transition'
                            >
                              <div className='flex justify-between items-start'>
                                <div className='flex-1'>
                                  <h3 className='font-bold text-lg'>Lesson {lesson.number}: {lesson.name}</h3>
                                  <p className='text-gray-300 text-sm mt-1'>{lesson.lessonDetails}</p>
                                  <a 
                                    href={lesson.videoUrl} 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    className='text-blue-400 text-sm mt-2 inline-block hover:underline'
                                  >
                                    📹 Watch Video
                                  </a>
                                </div>
                                <button
                                  onClick={() => handleDeleteLesson(lesson._id)}
                                  className='text-red-400 hover:text-red-300 p-1 rounded hover:cursor-pointer'
                                  title='Delete Lesson'
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className='text-gray-500 text-center py-4'>No lessons yet. Add your first lesson!</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right sidebar: Courses list */}
            <aside className='w-full md:w-72 lg:w-80 shrink-0 bg-[#000000] rounded-2xl p-3 border border-gray-800'>
              <h3 className='text-lg font-semibold text-gray-100 mb-3'>Your Courses</h3>
              <div className='flex flex-col gap-3'>
                {coursesList.length > 0 ? (
                  coursesList.map((course) => {
                    const selected = selectedCourseId === course._id
                    const thumb = course?.thumbnails?.images?.[0]
                    return (
                      <button
                        key={course._id}
                        onClick={() => handleCourseSelect(course._id)}
                        className={`text-left bg-[#141a21] rounded-xl border ${selected ? 'border-white' : 'border-gray-700'} hover:border-white/80 transition p-3 flex gap-3 items-center hover:cursor-pointer`}
                        title={course.title}
                      >
                        <div className='w-14 h-14 rounded-lg bg-[#0f1318] overflow-hidden border border-gray-700 shrink-0'>
                          {thumb ? (
                            <img src={thumb} alt={course.title} className='w-full h-full object-cover' />
                          ) : (
                            <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>No Img</div>
                          )}
                        </div>
                        <div className='flex-1'>
                          <div className='font-semibold text-gray-100 line-clamp-1'>{course.title}</div>
                          <div className='text-gray-400 text-sm line-clamp-1'>{course.subTitle || course.category}</div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <p className='text-gray-400'>No courses found.</p>
                )}
              </div>
            </aside>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddModuleLessons
