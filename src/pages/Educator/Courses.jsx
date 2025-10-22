import React from 'react'
import { getEducatorCourse } from '../../customHooks/getEducatorCourse';
import { useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Courses = () => {  
   
    const navigate = useNavigate()

  getEducatorCourse();

  const { courseData } = useSelector(state => state.courseData);

 
console.log(courseData)

  return (

    <div className='w-[100vw] h-screen flex  items-center flex-col overflow-x-hidden bg-[#f2f4f5]' >

      <div className='w-[90%]  p-2 flex items-center justify-between  '>

        <span className='flex items-center justify-between 
          gap-3 lg:text-2xl text-xl font-bold' ><FaArrowLeft onClick={()=>navigate("/educator/dashboard") }
          className=' text-red-400 cursor-pointer' />  
          All Created Course</span>

        <button 
        onClick={()=>navigate("/educator/create-course")}
          className='text-white p-2 bg-black rounded-xl hover:bg-gray-800 cursor-pointer transition-colors'
        >
          Create Courses
        </button>


      </div>




      {/*  table for show educator Courses */}
<div className="w-[90%] ">
  <table className="w-full text-left border-collapse bg-white lg:p-5  p-0 rounded-2xl">
    <thead className="">
      <tr>
        <th className="p-2 border-b border-gray-300">Course</th>
        <th className="p-2 border-b border-gray-300">Price</th>
        <th className="p-2 border-b border-gray-300">Status</th>
        <th className="p-2 border-b border-gray-300">Action</th>
      </tr>
    </thead>

    <tbody className="bg-white">
      {courseData?.length > 0 &&
        courseData.map((el, index) => (
          <tr key={index} className="hover:bg-gray-50 transition ">
            <td className="p-2 border-b border-gray-300">{el.title}</td>
            <td className="p-2 border-b border-gray-300">{el.price}</td>
            <td className="p-2 border-b border-gray-300">
              {el.isPublished ? (
                <span className="bg-emerald-300 text-green-700 px-2 py-1 rounded">
                  Publish
                </span>
              ) : (
                <span className="bg-red-300 text-red-700 px-2 py-1 rounded">
                  Draft
                </span>
              )}
            </td>
            <td 
            onClick={()=>navigate(`/educator/edit-course/${el._id}`)}
             className=" hover:cursor-pointer p-[13px] border-b border-gray-300 
             flex justify-start items-center text-blue-700 text-2xl">  
               <RiEdit2Fill/>
               </td>
          </tr>  


        ))}
    </tbody>
  </table>
</div>




    </div>


  )
}

export default Courses