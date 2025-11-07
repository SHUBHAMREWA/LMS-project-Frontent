import React, { useMemo, useState } from 'react'

import  image from "../../assets/empty.jpg"
import Nav from '../../component/Nav'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { getEducatorCourse } from '../../customHooks/getEducatorCourse';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const Dashboard = () => {  

  const navigate = useNavigate()
   getEducatorCourse();
  const  {userData}  = useSelector(state=> state.user)
  const {educatorCourseData}  = useSelector(state=> state.educatorCourseData) 
  const [totalEarning , setTotalEarning] =  useState(0)

 

  console.log(userData)

  const chartData = useMemo(() => {
    const list = Array.isArray(educatorCourseData) ? educatorCourseData : []
    return list.map((c) => ({
      name: c.title?.length > 10 ? c.title.slice(0, 20) + '…' : c.title || '—',
      lessons: Number(c.lessonNumbers || 0),
      enrolled: Number(c.enrollmentNumbers || 0),
    }))
  }, [educatorCourseData])


  const totalEarnings = useMemo(()=>{  
      
      let courses = educatorCourseData?.length > 0 ? educatorCourseData : [] ;
      let total = 0 ;
      let getData = educatorCourseData?.map((e , index)=>{  
            
         total += e.enrollmentNumbers > 0 ? e.enrollmentNumbers * e.price : 0 ;
         
      })

      setTotalEarning(total)


  } , [educatorCourseData])

  return (
    <div className='w-full min-h-screen bg-[#f2f4f5]'>
      <Nav />

      <div className='w-full relative h-full mt-19 flex flex-col gap-6 items-center'>
        <span
          onClick={() => navigate("/")}
          className='absolute text-2xl lg:left-12 left-5 top-3 z-10 cursor-pointer'
        >
          <FaArrowLeft />
        </span>

        {/* Educator Details */}
        <div className='w-[95%] lg:w-[70%] relative shadow rounded-2xl mt-6 p-4 flex flex-col lg:flex-row lg:px-8 gap-4 lg:justify-start items-center bg-white'>
          <div>
            <img src={userData?.photoUrl ? userData.photoUrl :  image} alt='' className='h-24 w-24 rounded-full p-1 border-4 border-black object-cover' />
          </div>
          <div className='flex flex-col gap-1 ml-0 lg:ml-3 text-center lg:text-left'>
            <p className='font-bold text-2xl'>Welcome, {userData?.name} 👋</p>
            <p className='font-semibold text-lg'>Total Earning:  ₹{totalEarning}</p>
            <p className='text-gray-600'>{userData?.discription || 'Full Stack Developer'}</p> 
            <div 
            className='lg:flex flex-col lg:flex-row gap-1'>
            <button
              onClick={() => navigate('/educator/create-course')}
              className='mt-2 bg-black cursor-pointer text-white px-5 py-2 rounded-xl font-medium w-full lg:w-auto'
            >
              Create Courses
            </button>
            <button 
             onClick={() => navigate('/educator/courses')}
              className='mt-2 bg-black cursor-pointer text-white px-5 py-2 rounded-xl font-medium w-full lg:w-auto'
             >
                See All Course
            </button>

             <button 
             onClick={() => navigate('/educator/add-modules-lessons')}
              className='mt-2 bg-black cursor-pointer text-white px-5 py-2 rounded-xl font-medium w-full lg:w-auto'
             >
                Add Modules & Lessons
            </button>

            </div>
          </div>
        </div>

        {/* Charts */}
        <div className='w-[85%] grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Left: Course Progress (Lectures) */}
          <div className='bg-white rounded-2xl shadow p-4'>
            <h3 className='font-semibold mb-3'>Course Progress (Lectures)</h3>
            <div className='w-full h-[280px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={chartData} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis dataKey='name' tick={{ fontSize: 12 }} interval={0} angle={-10} height={40} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                  <Bar dataKey='lessons' fill='#000000' radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Students Enrollment */}
          <div className='bg-white rounded-2xl shadow p-4'>
            <h3 className='font-semibold mb-3'>Students Enrollment</h3>
            <div className='w-full h-[280px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={chartData} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis dataKey='name' tick={{ fontSize: 12 }} interval={0} angle={-10} height={40} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                  <Bar dataKey='enrolled' fill='#0f172a' radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard