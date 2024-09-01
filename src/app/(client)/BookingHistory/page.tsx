/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from 'react'
import Component from '../../Components/ClientComp/basket'
import Profileheader from '@/app/Components/Profileheader'
const page = () => {
  
  return (
    <div className='fix-height'>
        <Profileheader/>
        <Component/>
    </div>
  )
}

export default page