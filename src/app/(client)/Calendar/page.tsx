"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { FaRegCircleUser } from "react-icons/fa6";
const Profileheader = () => {
  const {data} = useSession()
  const userName = data?.user.fullName

  return (
    <div className='flex flex-row justify-between items-center p-2 m-3'>
     <div className='text-3xl font-semibold text-gray-800'> 
       Hi {userName}
     </div>
     <div className="p-2 flex gap-2 rounded-md" >
      <h1 className="text-black ">Your Profile</h1> 
      <a href="/profile" >
      <FaRegCircleUser size={20} />

      </a>
     </div>
    
      
    </div>
  )
}

export default Profileheader