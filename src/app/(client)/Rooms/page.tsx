'use client'
/* eslint-disable @next/next/no-img-element */
import { IListLog } from "@/Models/Annonces/ListingLog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBare from "@/app/Components/SearchBare";
import Profileheader from "@/app/Components/Profileheader";
interface RoomSearch  {
  searchParams : {
    price?:string;
  guests?:string;
  bedrooms?:string;
  }
  }
const RoomList = ({searchParams} : RoomSearch) => {
  const [LogData, setDataLog] = useState<IListLog[]>([]);
console.log("Params Searching is ",searchParams.bedrooms, searchParams.guests, searchParams.price); 
const router = useRouter();
const priceQ = searchParams.price ? decodeURIComponent(searchParams.price) : "";
const guestQ = searchParams.guests ? decodeURIComponent(searchParams.guests) : "";
const roomQ = searchParams.bedrooms ? decodeURIComponent(searchParams.bedrooms) : "";



  // CallApi : 
  const getDataTable = async () => {
    try {
      const res = await fetch("/api/Logement");
    
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const text = await res.text();
      if (!text) {
        throw new Error('No data returned from the API');
      }

      const data: IListLog[] = JSON.parse(text);
      console.log("Data fetched from API ", data);
      return data;
    } catch (error) {
      console.error("Error loading logement data", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataTable();

      if (data.length > 0) {
        const filteredData = data.filter(log => {
          const matchesPrice = priceQ ? log.Price.toString().toLowerCase().includes(priceQ.toLowerCase()) : true;
          const matchesGuests = guestQ ? log.guestNumber.toString().toLowerCase().includes(guestQ.toLowerCase()) : true;
          const matchesRooms = roomQ ? log.RoomsNumber.toString().toLowerCase().includes(roomQ.toLowerCase()) : true;

          return matchesPrice && matchesGuests && matchesRooms;
        });

        setDataLog(filteredData);
      }
    };

    fetchData();
  }, [priceQ, guestQ, roomQ]);

  return (
    <div className="fix-height container mx-auto mt-8">
      <Profileheader/>
       <SearchBare  />
      <h1 className="text-3xl mb-3 font-bold"> 
        {LogData.length}
         PROPERTIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LogData.map((room, i) => (
          <Link key={i} href={`/Rooms/${room._id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md border">
              <img
                src={`/${room.img[0]}`}
                alt="show"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold">{room.title}</h2>
                <p>Sleeps {room.guestNumber} </p>
                <p>{room.RoomsNumber} bedrooms, {room.bathRoomsNum} bathrooms</p>
                <p>{room.Price} MAD </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
