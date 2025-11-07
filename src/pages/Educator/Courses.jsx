import React, { useMemo, useState } from 'react'
import { getEducatorCourse } from '../../customHooks/getEducatorCourse'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa6'
import { RiEdit2Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const Courses = () => {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  // fetch educator courses
  getEducatorCourse()

  const { educatorCourseData } = useSelector((state) => state.educatorCourseData)

  const filtered = useMemo(() => {
    if (!q?.trim()) return educatorCourseData || []
    const t = q.toLowerCase()
    return (educatorCourseData || []).filter((c) => (c?.title || '').toLowerCase().includes(t))
  }, [educatorCourseData, q])

  return (
    <div className='min-h-screen w-full flex items-start flex-col bg-gradient-to-b from-slate-50 to-gray-100'>
      {/* Top bar */}
      <div className='w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10 border-b'>
        <div className='max-w-6xl mx-auto px-4 py-4 flex items-center justify-between'>
          <button
            onClick={() => navigate('/educator/dashboard')}
            className='inline-flex items-center gap-2 text-sm cursor-pointer text-slate-700 hover:text-black'
            title='Back'
          >
            <FaArrowLeft className='text-red-400' />
            <span className='font-semibold hidden sm:inline'>Back</span>
          </button>

          <div className='flex-1 flex justify-center'>
            <h1 className='text-xl sm:text-2xl font-bold text-slate-900'>Your Courses</h1>
          </div>
           <button 
           className='px-4 py-2 rounded-xl text-white bg-black hover:bg-gray-800 transition-colors mr-4'
           onClick={()=>navigate("/educator/add-modules-lessons")}
           >
             Add Modules & Lessons
           </button>
          <button
            onClick={() => navigate('/educator/create-course')}
            className='px-4 py-2 rounded-xl text-white bg-black hover:bg-gray-800 transition-colors'
          >
            Create Course
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className='w-full'>
        <div className='max-w-6xl mx-auto px-4 pt-4 pb-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between'>
          <div className='relative w-full sm:w-80'>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Search course by title...'
              className='w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-2 outline-none focus:ring-2 focus:ring-black/20 shadow-sm'
            />
          </div>
          <div className='text-sm text-slate-600'>
            Total: <span className='font-semibold text-slate-900'>{filtered?.length || 0}</span>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className='max-w-6xl mx-auto px-4 pb-8 w-full'>
          {/* Card list on small screens */}
          <div className='grid grid-cols-1 gap-4 sm:hidden'>
            {(filtered || []).map((el) => (
              <div key={el._id} className='rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <div className='text-base font-semibold text-slate-900'>{el.title}</div>
                    <div className='text-sm text-slate-600'>₹ {el.price || '-'} • {el.subTitle || ''}</div>
                    <div className='mt-2'>
                      {el.isPublished ? (
                        <span className='inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs px-2 py-1'>Publish</span>
                      ) : (
                        <span className='inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 text-xs px-2 py-1'>Draft</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/educator/edit-course/${el._id}`)}
                    className='p-2 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100'
                    title='Edit'
                  >
                    <RiEdit2Fill size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table on >= sm */}
          <div className='hidden sm:block'>
            <div className='rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm'>
              <table className='w-full text-left border-collapse'>
                <thead className='bg-slate-50 text-slate-600 text-sm'>
                  <tr>
                    <th className='p-3'>Course</th>
                    <th className='p-3'>Price</th>
                    <th className='p-3'>Status</th>
                    <th className='p-3'>Action</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-100'>
                  {(filtered || []).map((el) => (
                    <tr key={el._id} className='hover:bg-slate-50/60 transition-colors'>
                      <td className='p-3'>
                        <div className='font-semibold text-slate-900'>{el.title}</div>
                        <div className='text-xs text-slate-500'>{el.subTitle || ''}</div>
                      </td>
                      <td className='p-3 text-slate-800'>₹ {el.price || '-'}</td>
                      <td className='p-3'>
                        {el.isPublished ? (
                          <span className='inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs px-2 py-1'>Publish</span>
                        ) : (
                          <span className='inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 text-xs px-2 py-1'>Draft</span>
                        )}
                      </td>
                      <td className='p-3'>
                        <button
                          onClick={() => navigate(`/educator/edit-course/${el._id}`)}
                          className='inline-flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100'
                        >
                          <RiEdit2Fill />
                          <span className='text-sm'>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(!filtered || filtered.length === 0) && (
              <div className='text-center text-slate-500 text-sm py-6'>No courses found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
