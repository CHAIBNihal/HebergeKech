"use client"
import React from 'react'
import { useState } from 'react'
const ContactForm = () => {
    const [click, setClick]=useState(false)

    const handClick = ()=>{
        setClick(!click);
    }
  return (


<section id="contact"
 className="bg-[#EEEDEB] rounded-lg flex flex-col mx-auto w-1/2 my-8 border-gray-400 ">
    
 
<div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-8 md:px-10 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Contact Us</h1>

    
  </div>

  <form  className="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div className="flex justify-between items-center ">
        <input type="text" placeholder='First name'   className="w-full rounded-lg border-gray-100 p-4 pe-12 text-sm shadow-sm"/>
        <input type="text" placeholder='Second name'   className="w-full rounded-lg border-gray-100 p-4 pe-12 text-sm shadow-sm ml-1"/>
    </div>
    <div>
    

      <div className="relative">
        <input
          type="email"
          className="w-full rounded-lg border-gray-100 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter email"
        />

        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </span>
      </div>
    </div>

    <div>
    

      <div className="relative">
        <p className='my-4'>Your Message here </p>
       <textarea className="h-[200px]  w-full" name="" id="" placeholder='Enter You Message '>

       </textarea>
      </div>
    
    </div>
  <button onClick={handClick} className='w-full p-2 bg-black text text-white rounded-lg'>{
    click?"Your Message is sent successfully ":" Send"
    }</button>
   

   
  </form>
</div>

</section>

  )
}

export default ContactForm