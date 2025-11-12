import React, { useEffect, useState, useMemo } from 'react'
import Nav from '../component/Nav'
import { useSelector } from 'react-redux'
import useGetAllCourses from '../customHooks/getAllCourses'
import { useLocation } from 'react-router-dom'

import { IoSearchSharp } from "react-icons/io5"
import { MdFilterAlt } from "react-icons/md"
import { LiaLaptopCodeSolid } from "react-icons/lia"
import { FaUikit } from "react-icons/fa6"
import { TbBrandHackerrank } from "react-icons/tb"
import { PiOpenAiLogoBold } from "react-icons/pi"
import { PiDeviceMobileFill } from "react-icons/pi"
import { SiDatastax } from "react-icons/si"
import { TbBrandGoogleAnalytics } from "react-icons/tb"
import { GiArtificialHive } from "react-icons/gi"
import { GiLaptop } from "react-icons/gi";
import { SiAmazoncloudwatch } from "react-icons/si";
import Card from '../component/card.jsx'



const AllCourses = () => {  
  
  const { allCourses } = useSelector(state => state.allCourses)
  useGetAllCourses()
  

  const location = useLocation()

  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const categories = [
    { name: "Web Devlopment", icon: <LiaLaptopCodeSolid />, color: "bg-pink-500" },
    { name: "UI/UX designing", icon: <FaUikit />, color: "bg-blue-500" },
    { name: "Ethical Hacking", icon: <TbBrandHackerrank />, color: "bg-green-500" },
    { name: "AI/ML", icon: <PiOpenAiLogoBold />, color: "bg-orange-500" },
    { name: "App Dev", icon: <PiDeviceMobileFill />, color: "bg-emerald-700" },
    { name: "Data Science", icon: <SiDatastax />, color: "bg-amber-400" },
    { name: "Data Analytics", icon: <TbBrandGoogleAnalytics />, color: "bg-red-600" },
    { name: "Ai Tools", icon: <GiArtificialHive />, color: "bg-fuchsia-700" },
    { name: "Programming Languages", icon: <GiLaptop />, color: "bg-fuchsia-500" },
    { name: "Cloud Computing", icon: <SiAmazoncloudwatch />, color: "bg-fuchsia-700" },
  ]

  // Handle category selection
  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName)
      } else {
        return [...prev, categoryName]
      }
    })
  }

  // Filter courses based on search and selected categories
  // Sync search from query param (?search=...)
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('search') || ''
    setSearchKeyword(q)
  }, [location.search])

  const filteredCourses = useMemo(() => {
    if (!allCourses || allCourses.length === 0) return []

    let filtered = allCourses

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course => 
        selectedCategories.includes(course.category)
      )
    }

    // Filter by search keyword
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase()
      filtered = filtered.filter(course => 
        course.title?.toLowerCase().includes(keyword) ||
        course.subTitle?.toLowerCase().includes(keyword) ||
        course.description?.toLowerCase().includes(keyword) ||
        course.category?.toLowerCase().includes(keyword)
      )
    }

    return filtered
  }, [allCourses, selectedCategories, searchKeyword])

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
    setSearchKeyword('')
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100'>
      <Nav />

      {/* Header Section - Black & White Premium */}
      <div className='w-full bg-gradient-to-br from-black via-gray-900 to-black mt-[70px] shadow-2xl relative overflow-hidden'>
        {/* Subtle pattern overlay */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0' style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)' }}></div>
        </div>
        <div className='max-w-7xl mx-auto px-4 py-12 lg:py-16 relative z-10'>
          <h1 className='text-3xl lg:text-5xl font-black text-white mb-3 tracking-tight'>
            Explore All Courses
          </h1>
          <p className='text-gray-300 text-lg lg:text-xl font-medium tracking-wide'>
            Discover the perfect course to boost your skills and career
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-6 flex gap-6'>
        
        {/* Left Sidebar - Filter Section (Desktop) */}
        <div className='hidden lg:block w-80 shrink-0'>
          <div className='sticky top-24 bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 backdrop-blur-sm hover:shadow-3xl transition-shadow'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-black flex items-center gap-2 text-black'>
                <MdFilterAlt className='text-3xl' />
                Filters
              </h2>
              {selectedCategories.length > 0 && (
                <button 
                  onClick={clearFilters}
                  className='text-xs font-bold text-white bg-black px-3 py-1.5 rounded-full hover:bg-gray-800 hover:scale-110 transition-all'
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search with AI Input */}
            <div className='relative mb-6 group'>
              <input
                type='text'
                placeholder='Search with AI...'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className='w-full px-4 py-3 pl-11 rounded-2xl border-2 border-gray-300 focus:border-black focus:ring-4 focus:ring-gray-200 outline-none transition-all shadow-sm hover:shadow-md bg-white font-medium'
              />
              <IoSearchSharp className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-black transition-colors' />
            </div>

            <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5'></div>

            <h3 className='text-xs font-black text-gray-500 mb-4 uppercase tracking-wider'>Categories</h3>

            {/* Category Checkboxes */}
            <div className='space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar'>
              {categories.map((category, index) => (
                <label 
                  key={category.name}
                  className='flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group border-2 border-transparent hover:border-gray-200'
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <input
                    type='checkbox'
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryToggle(category.name)}
                    className='w-5 h-5 rounded accent-black cursor-pointer'
                  />
                  <div className={`${category.color} p-2.5 rounded-xl text-white text-lg shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all`}>
                    {category.icon}
                  </div>
                  <span className='text-sm font-bold text-gray-700 group-hover:text-black transition-colors'>{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Courses Grid */}
        <div className='flex-1'>
          
          {/* Mobile Filter Button & Search */}
          <div className='lg:hidden mb-4 space-y-3'>
            <div className='relative group'>
              <input
                type='text'
                placeholder='Search courses...'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className='w-full px-4 py-3 pl-11 rounded-2xl border-2 border-gray-300 bg-white focus:border-black focus:ring-4 focus:ring-gray-200 outline-none shadow-md font-medium'
              />
              <IoSearchSharp className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-black transition-colors' />
            </div>
            
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className='w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-95'
            >
              <MdFilterAlt className='text-xl' />
              Filter by Category {selectedCategories.length > 0 && `(${selectedCategories.length})`}
            </button>

            {/* Mobile Filter Dropdown */}
            {showMobileFilter && (
              <div className='bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-4 animate-slideDown'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-black text-lg text-black'>Categories</h3>
                  {selectedCategories.length > 0 && (
                    <button 
                      onClick={clearFilters}
                      className='text-xs font-bold text-white bg-black px-3 py-1.5 rounded-full hover:bg-gray-800'
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className='space-y-2'>
                  {categories.map((category) => (
                    <label 
                      key={category.name}
                      className='flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all hover:scale-[1.02] border-2 border-transparent hover:border-gray-200'
                    >
                      <input
                        type='checkbox'
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => handleCategoryToggle(category.name)}
                        className='w-5 h-5 rounded accent-black'
                      />
                      <div className={`${category.color} p-2 rounded-lg text-white shadow-md`}>
                        {category.icon}
                      </div>
                      <span className='text-sm font-bold text-gray-700'>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Count & Active Filters */}
          <div className='mb-6 bg-white backdrop-blur rounded-2xl p-5 shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-shadow'>
            <div className='flex flex-wrap items-center gap-3'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-black text-black'>
                  {filteredCourses.length}
                </span>
                <span className='text-gray-600 font-bold text-sm'>
                  {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
                </span>
              </div>
              
              {selectedCategories.length > 0 && (
                <>
                  <div className='h-6 w-px bg-gray-300'></div>
                  <div className='flex flex-wrap gap-2'>
                    {selectedCategories.map(cat => (
                      <span 
                        key={cat}
                        className='bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-xl transition-all hover:scale-105 hover:bg-gray-800'
                      >
                        {cat}
                        <button
                          onClick={() => handleCategoryToggle(cat)}
                          className='ml-1 hover:text-gray-300 font-black text-base'
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn'>
              {filteredCourses.map((course, index) => (
                <div 
                  key={course._id}
                  className='transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  
                  <Card
                    id={course._id}
                    title={course.title}
                    price={course.price}
                    mrp={course.mrp}
                    category={course.category}
                    images={course.thumbnails?.images}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-white backdrop-blur rounded-3xl border-2 border-dashed border-gray-300 shadow-xl'>
              <div className='text-7xl mb-6 animate-bounce filter grayscale'>🔍</div>
              <h3 className='text-3xl font-black text-black mb-3 tracking-tight'>
                No Courses Found
              </h3>
              <p className='text-gray-600 text-lg mb-6 max-w-md mx-auto font-medium'>
                {selectedCategories.length > 0 || searchKeyword 
                  ? 'Try adjusting your filters or search term to discover more courses'
                  : 'No courses available at the moment. Check back soon!'}
              </p>
              {(selectedCategories.length > 0 || searchKeyword) && (
                <button
                  onClick={clearFilters}
                  className='bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:bg-gray-800 active:scale-95'
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllCourses
