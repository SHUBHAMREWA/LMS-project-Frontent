import React from 'react'
import aboutImg from '../assets/about.jpg'
import { FaGraduationCap, FaChalkboardTeacher, FaMedal, FaInfinity } from 'react-icons/fa'

const About = () => {
  return (
    <div className='min-h-screen w-full bg-[#ffffff] text-gray-900'>
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {/* White card container */}
        <div className='bg-white rounded-3xl shadow-xl px-6 py-8 sm:px-10 sm:py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            {/* Left: Image framed */}
            <div className='w-full'>
              <div className='rounded-2xl overflow-hidden border-8 border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]'>
                <img src={aboutImg} alt='About us' className='w-full h-full object-cover' />
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <span className='text-sm font-semibold tracking-wide text-gray-700'>About Us</span>
                <span className='h-px w-10 bg-gray-400' />
              </div>

              <h1 className='text-4xl sm:text-5xl font-extrabold text-black leading-tight'>
                We Are Maximize Your
                <br />
                Learning Growth
              </h1>

              <p className='mt-5 text-gray-600 leading-relaxed'>
                We provide a modern Learning Management System to simplify online education, track progress,
                and enhance student–instructor collaboration efficiently.
              </p>

              {/* Bullet features */}
              <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800'>
                <div className='flex items-center gap-3'>
                  <FaGraduationCap className='text-black text-lg' />
                  <span className='font-medium'>Simplified Learning</span>
                </div>
                <div className='flex items-center gap-3'>
                  <FaChalkboardTeacher className='text-black text-lg' />
                  <span className='font-medium'>Expert Trainers</span>
                </div>
                <div className='flex items-center gap-3'>
                  <FaMedal className='text-black text-lg' />
                  <span className='font-medium'>Big Experience</span>
                </div>
                <div className='flex items-center gap-3'>
                  <FaInfinity className='text-black text-lg' />
                  <span className='font-medium'>Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
