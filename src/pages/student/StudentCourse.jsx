import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import useGetEnrollCourses from '../../customHooks/getEnrollCourses';
import { useNavigate } from 'react-router-dom';

const StudentCourse = () => {

     const navigate = useNavigate() ;
  const { userData } = useSelector(state => state.user);
  const { enrollCourseData } = useSelector(state => state.enrollCourseData);

  useGetEnrollCourses();

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-300 text-lg">Please log in to view your courses.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <div className="bg-zinc-950 shadow-lg rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 border border-zinc-800">
        {userData.photoUrl ? (
          <img
            src={userData.photoUrl}
            alt={userData.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-zinc-700"
          />
        ) : (
          <FaUserCircle className="w-24 h-24 text-zinc-600" />
        )}
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-white mb-1">Welcome, {userData.name}!</h1>
          <p className="text-zinc-300 text-lg">{userData.email}</p>
        </div>
      </div>

      {/* My Courses Section */}
      <h2 className="text-3xl font-bold text-white pb-2">My Enrolled Courses</h2>

      {!enrollCourseData ? (
        <div className="text-center text-xl text-zinc-400">Loading your courses...</div>
      ) : enrollCourseData.length === 0 ? (
        <div className="text-center mt-4 text-xl text-zinc-400">You haven't enrolled in any courses yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enrollCourseData.map((enrollment) => (
            <div 
             onClick={()=>navigate(`/mycourse/${enrollment.course?._id}`)}
              key={enrollment._id}
              className="bg-zinc-950 shadow-lg rounded-xl overflow-hidden border border-zinc-800 flex flex-col transform transition duration-300 hover:scale-105"
            >
              {enrollment.course?.thumbnail && enrollment.course.thumbnail.length > 0 ? (
                <div className="w-full h-48 bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={enrollment.course.thumbnail[0]}
                    alt={enrollment.course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-zinc-900 flex items-center justify-center text-zinc-400 text-sm">
                  No Thumbnail
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-white mb-2">{enrollment.course?.title || 'Course Title'}</h3>
                <p className="text-zinc-400 text-sm flex-grow mb-3">Price: ${enrollment.course?.price || 'N/A'}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300">
                  Watch now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourse;
