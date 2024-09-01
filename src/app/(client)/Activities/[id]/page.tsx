/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import ActItem from "@/app/Components/ClientComp/testcomplog/act"
import Calendar from '@/app/Components/CalendatAct'
import CommentaireAct from '@/app/Components/CommentaireAct'
import Profileheader from '@/app/Components/Profileheader'
const page = () => {
    const {id} = useParams()
    
  return (
    <div>
      <Profileheader />
      <ActItem id={id as string} />
      <h1 className="p-5 m-3 bg-gray-300 rounded-lg text-3xl font-semibold flex items-center justify-center text-center">
        Availability Calendar
      </h1>
      <Calendar id={id as string} />

      <CommentaireAct />
    </div>
  );
}

export default page