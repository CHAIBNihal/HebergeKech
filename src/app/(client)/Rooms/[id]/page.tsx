"use client"
/* eslint-disable @next/next/no-img-element */
import { useParams } from "next/navigation";
import Comments from "@/app/Components/Comments";
import ListRoomPage from "@/app/Components/ClientComp/testcomplog/log";
import Calendar from "@/app/Components/Calendar";
import Profileheader from "@/app/Components/Profileheader";
const RoomDetail = () => {

  const {id} = useParams()

 return (
   <div>
     <Profileheader />
     <ListRoomPage id={id as string} />
     <h1 className="p-5 m-3 bg-gray-300 rounded-lg text-3xl font-semibold flex items-center justify-center text-center">
       Availability Calendar
     </h1>

     <Calendar id={id as string} />
     <Comments />
   </div>
 );
};

export default RoomDetail;
