import React from 'react'

import { useSelector } from 'react-redux'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
       
      let {userData}  = useSelector(state => state.user)  ;
      let navigate = useNavigate()
   
       console.log( typeof userData.photoUrl) ;


  return (
    <div className='min-h-screen w-full bg-[#f2f4f5] flex items-start justify-center pt-24 pb-16'>
      <div className='relative w-[92%] lg:w-[70%] max-w-5xl bg-white rounded-3xl shadow-2xl p-6 lg:p-10 flex flex-col items-center gap-5'>
        <button
          onClick={() => navigate('/home')}
          className='absolute top-4 left-4 text-3xl lg:text-4xl p-1 rounded-full hover:bg-black hover:text-white transition-colors'
          aria-label='Back'
        >
          <IoArrowBack />
        </button>

        {userData.photoUrl ? (
          <img
            src={userData.photoUrl}
            alt='Profile'
            className='w-20 h-20 rounded-full object-cover border border-gray-200'
          />
        ) : (
          <span className='text-2xl py-3 px-6 bg-black text-white rounded-full'>
            {userData?.name?.[0]?.toUpperCase()}
          </span>
        )}

        <span className='text-gray-600'>{userData.role}</span>

        <div className='w-full lg:text-xl text-[16px] flex flex-col gap-6'>
          <div><span className='font-bold'>Name</span> : {userData?.name}</div>
          <div><span className='font-bold'>Bio</span> : {userData?.discription ?? 'Bio not Added'}</div>
          <div><span className='font-bold'>Email</span> : {userData?.email}</div>
          <div><span className='font-bold'>Phone</span> : {userData?.phone ?? 'Phone Number not Added'}</div>
        </div>

        <button
          onClick={() => navigate('/edit-profile')}
          className='mt-2 bg-black text-white px-6 py-3 text-base lg:text-2xl rounded-xl hover:bg-gray-800 transition-colors'
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default Profile