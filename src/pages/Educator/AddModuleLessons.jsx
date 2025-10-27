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

const AddModuleLessons = () => {
  // Get educator courses from Redux
  getEducatorCourse()
  const { educatorCourseData } = useSelector(state => state.educatorCourseData)

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

  // Handle course selection
  const handleCourseSelect = async (courseId) => {
    setSelectedCourseId(courseId)
    setShowModuleForm(false)
    setShowLessonForm(false)
    
    // Fetch modules for selected course
    if (courseId) {
      await fetchModules(courseId)
    }
  }

  // Fetch modules for a course
  const fetchModules = async (courseId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/module/get-modules/${courseId}`, {
        withCredentials: true
      })
      if (response.data.success) {
        setModules(response.data.modules || [])
      }
    } catch (error) {
      console.log("Error fetching modules:", error)
      setModules([])
    }
  }

  // Fetch lessons for a module
  const fetchLessons = async (moduleId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/lesson/get-lessons/${moduleId}`, {
        withCredentials: true
      })
      if (response.data.success) {
        setLessons(response.data.lessons || [])
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
        `${baseUrl}/api/module/add-module`,
        {
          courseId: selectedCourseId,
          name: moduleName,
          number: parseInt(moduleNumber)
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
        `${baseUrl}/api/lesson/add-lesson`,
        {
          moduleId: selectedModuleId,
          name: lessonName,
          number: parseInt(lessonNumber),
          lessonDetails: lessonDetails,
          videoUrl: videoUrl
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
    <div className='w-full min-h-screen bg-[#f2f4f5] pb-10'>
      <Nav />
      
      <div className='w-full flex justify-center items-start pt-20 px-4'>
        <div className='bg-white w-full max-w-6xl rounded-2xl shadow p-6 md:p-10 flex flex-col gap-6'>
          
          {/* Header */}
          <div className='text-center'>
            <h1 className='text-2xl md:text-4xl font-bold text-gray-800'>Add Modules & Lessons</h1>
            <p className='text-gray-600 mt-2'>Manage your course content structure</p>
          </div>

          {/* Course Selection */}
          <div className='flex flex-col gap-2 border-b pb-6'>
            <label className='font-semibold text-lg' htmlFor='course'>Select Course</label>
            <select
              id='course'
              value={selectedCourseId}
              onChange={(e) => handleCourseSelect(e.target.value)}
              className='w-full md:w-1/2 outline-none shadow border rounded-lg bg-gray-50 border-gray-300 p-3 text-gray-700'
            >
              <option value="">-- Select a Course --</option>
              {educatorCourseData?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Module Section */}
          {selectedCourseId && (
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                  <AiOutlineBook className='text-2xl' /> Modules
                </h2>
                <button
                  onClick={() => setShowModuleForm(!showModuleForm)}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition'
                >
                  <FiPlus /> Add Module
                </button>
              </div>

              {/* Add Module Form */}
              {showModuleForm && (
                <div className='bg-blue-50 p-5 rounded-lg border border-blue-200'>
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
                        className='w-full mt-1 outline-none shadow border rounded-lg bg-white border-gray-300 p-3'
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
                        className='w-full mt-1 outline-none shadow border rounded-lg bg-white border-gray-300 p-3'
                      />
                    </div>
                  </div>

                  <div className='flex gap-3 mt-4'>
                    <button
                      onClick={handleAddModule}
                      disabled={loading}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50'
                    >
                      {loading ? <ClipLoader size={18} color="#ffffff" /> : "Save Module"}
                    </button>
                    <button
                      onClick={() => setShowModuleForm(false)}
                      className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition'
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
                      className='bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition cursor-pointer'
                      onClick={() => handleModuleSelect(module._id)}
                    >
                      <div className='flex justify-between items-start'>
                        <div>
                          <h3 className='font-bold text-lg'>Module {module.number}</h3>
                          <p className='text-gray-600'>{module.name}</p>
                        </div>
                        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>
                          {module.lessons?.length || 0} Lessons
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 col-span-2 text-center py-4'>No modules yet. Add your first module!</p>
                )}
              </div>
            </div>
          )}

          {/* Lesson Section */}
          {selectedModuleId && showLessonForm && (
            <div className='flex flex-col gap-4 border-t pt-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                  <AiOutlineVideoCamera className='text-2xl' /> Lessons
                </h2>
              </div>

              {/* Add Lesson Form */}
              <div className='bg-green-50 p-5 rounded-lg border border-green-200'>
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
                        className='w-full mt-1 outline-none shadow border rounded-lg bg-white border-gray-300 p-3'
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
                        className='w-full mt-1 outline-none shadow border rounded-lg bg-white border-gray-300 p-3'
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
                      className='w-full mt-1 outline-none shadow border rounded-lg bg-white border-gray-300 p-3'
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
                      className='w-full mt-1 outline-none shadow border rounded-lg bg-white border-gray-300 p-3'
                    />
                  </div>
                </div>

                <div className='flex gap-3 mt-4'>
                  <button
                    onClick={handleAddLesson}
                    disabled={loading}
                    className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50'
                  >
                    {loading ? <ClipLoader size={18} color="#ffffff" /> : "Save Lesson"}
                  </button>
                  <button
                    onClick={() => {
                      setShowLessonForm(false)
                      setSelectedModuleId("")
                      setLessons([])
                    }}
                    className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition'
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Display Lessons */}
              <div className='grid grid-cols-1 gap-3'>
                {lessons.length > 0 ? (
                  lessons.map((lesson, index) => (
                    <div
                      key={lesson._id}
                      className='bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition'
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <h3 className='font-bold text-lg'>Lesson {lesson.number}: {lesson.name}</h3>
                          <p className='text-gray-600 text-sm mt-1'>{lesson.lessonDetails}</p>
                          <a 
                            href={lesson.videoUrl} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='text-blue-600 text-sm mt-2 inline-block hover:underline'
                          >
                            📹 Watch Video
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 text-center py-4'>No lessons yet. Add your first lesson!</p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AddModuleLessons
