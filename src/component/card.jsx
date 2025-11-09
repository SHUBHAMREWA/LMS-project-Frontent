
import photodummy from "../assets/dummpyThumb.png"
import { useNavigate } from 'react-router-dom'
import {  FaBookOpen } from 'react-icons/fa'
import { HiOutlineArrowRight } from 'react-icons/hi'

const Card = ({ title, mrp, price, category, images, id }) => {  
   
  const navigate = useNavigate()
  const singleImage = images?.length > 0 ? images[0] : null
  const discountPercent = ((mrp - price) / mrp) * 100
  
  // Mock data for demo - you can replace with real data later
  const rating = 4.5
  const students = Math.floor(Math.random() * 5000) + 500
  const lessons = Math.floor(Math.random() * 40) + 10

  return (
    <div 
      onClick={() => navigate(`/course/${id}`)}
      className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-300 hover:-translate-y-1 flex flex-col h-full'
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className='absolute top-3 right-3 z-10 bg-black text-white px-3 py-1.5 rounded-full text-xs font-black shadow-lg'>
          {discountPercent.toFixed(0)}% OFF
        </div>
      )}

      {/* Image Container with Overlay */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img 
          src={singleImage ? singleImage : photodummy} 
          alt={title}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        {/* Gradient Overlay on Hover */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        
        {/* Quick View Button on Hover */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <button className='bg-white text-black px-6 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-gray-100 transform hover:scale-105 transition-all'>
            View Course
            <HiOutlineArrowRight className='text-lg' />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-5 space-y-3 flex-grow flex flex-col'>
        {/* Category Badge */}
        <div className='flex items-center gap-2'>
          <span className='inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-700'>
            <FaBookOpen className='text-[10px]' />
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className='font-black text-lg text-gray-900 line-clamp-2 leading-tight group-hover:text-black transition-colors flex-shrink-0'>
          {title}
        </h3>

      

        {/* Spacer to push price to bottom */}
        <div className='flex-grow'></div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-shrink-0'></div>

        {/* Price Section */}
        <div className='flex items-center justify-between flex-shrink-0'>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-black text-black'>₹{price}</span>
            {mrp > price && (
              <span className='text-sm line-through text-gray-400 font-medium'>₹{mrp}</span>
            )}
          </div>
          
          {/* Enroll Badge */}
          <div className='bg-black text-white px-4 py-2 rounded-full text-xs font-bold group-hover:bg-gray-800 transition-colors shadow-md'>
            Enroll Now
          </div>
        </div>
      </div>

      {/* Bottom Hover Accent */}
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-gray-700 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
    </div>
  )
}


export default Card
export { Card }
