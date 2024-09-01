'use client'
/* eslint-disable @next/next/no-img-element */
import { IListAnn } from "@/Models/Annonces/ListingAct";
import Link from "next/link";
import { useEffect, useState } from "react";
import Profileheader from "@/app/Components/Profileheader";
const RoomList = () => {
  const [ActData, setActData] = useState<IListAnn[]>([]);

  // CallApi : 
  const getDataTable = async () => {
    try {
      const res = await fetch("/api/activities");

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const text = await res.text();
      if (!text) {
        throw new Error('No data returned from the API');
      }

      const data: IListAnn[] = JSON.parse(text);
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
        setActData(data);
      }
    };
    fetchData();
  }, []);

  return (
    
    <div className=" fix-height mx-3 mt-8 ">
    <Profileheader/>
      <h1 className="text-3xl font-bold mb-4"> 
        {ActData.length}
         Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ActData.map((act, i) => (
          <Link key={i} href={`/Activities/${act._id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md border">
              <img
                src={`/${act.img[0]}`}
                alt="show"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold">{act.title}</h2>
                <p>{act.Address} </p>
                <p>{act.Price} MAD</p>
               <p>From : {act.Avail[0]} To : {act.Avail[1]}</p>
              
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
