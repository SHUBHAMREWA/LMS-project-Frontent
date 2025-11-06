import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/logo.jpg'

const Footer = () => {
  return (
    <footer className='bg-black text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-3'>
              <img src={logo} alt='VC' className='w-10 h-10 rounded-md object-cover' />
              <span className='text-xl font-bold text-white'>Vihan Courses</span>
            </div>
            <p className='mt-4 text-sm text-gray-400 max-w-md'>
              AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link to='/home' className='hover:text-white'>Home</Link></li>
              <li><Link to='/allCourses' className='hover:text-white'>AllCourses</Link></li>
              <li><Link to='/login' className='hover:text-white'>Login</Link></li>
              <li><Link to='/profile' className='hover:text-white'>My Profile</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Categories</h3>
            <ul className='space-y-2 text-sm'>
              <li className='hover:text-white'>Web Development</li>
              <li className='hover:text-white'>App Development</li>
              <li className='hover:text-white'>AI/ML</li>
              <li className='hover:text-white'>UI/UX Designing</li>
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-white/10 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between'>
          <p>© {new Date().getFullYear()} Virtual Courses. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  )
}

export default Footer