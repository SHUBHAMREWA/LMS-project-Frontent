import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Card } from './card.jsx';



const ShowCard = () => {    
 
 
       const {allCourses} = useSelector(state => state.allCourses) ;   

      const [showHomeCardCourse, setshowHomeCardCourse] = useState(null)

      useEffect(() => {
            // slice(0,6) - agar 4 courses hain toh 4 hi lega, 6 se zyada hain toh 6 lega
            let courses = allCourses.slice(0, 6);
            setshowHomeCardCourse(courses);
            }, [allCourses]); 


  return (
    <div 
     className=' mt-5 lg:mt-0 p-4 w-full  flex justify-center items-center flex-col lg:gap-8 gap-5 '
     >  
      
       <h1 className='font-bold text-3xl'>Our Latest Course</h1>
            <p className='text-center lg:text-xl text-sm' >
        Start your journey of growth and knowledge, <br />
        learn from the best teachers and mentors who guide you every step, <br />
        and build a future that reflects your true potential and passion.
        </p>  


        <div className='flex flex-wrap justify-center items-stretch gap-6 w-full max-w-7xl mx-auto'>   
            {
                  showHomeCardCourse?.length > 0 && showHomeCardCourse.map((el , index)=>{   
                     return <div key={el._id || index} className='w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-0'>
                       <Card price={el.price} 
                        title={el.title} mrp={el.mrp} category={el.category} id={el._id} images={el.thumbnails?.images} />
                     </div>
                  })
            }
        </div>

    </div>
  )
}

export default ShowCard