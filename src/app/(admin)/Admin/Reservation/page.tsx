'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from "@/app/Components/admin/search/serach"
import { IResa } from '@/Models/Resa';
import styles from "@/app/Components/admin/Resa/resa.module.css"
import {  useRouter } from "next/navigation";
const td = [
  { name: "User Name" },
  {name : "Email"},
  {name: "Arrival"},
  {name:"Date Departure"},
  { name: "Amount" },
  { name: "Actions" }
];

interface BookProps {
  searchParams:{q?:string;}
}



const Booking = ({searchParams} : BookProps) => {
  const [isClient, setIsClient] = useState(false);
  const [Book, setBook] = useState<IResa[]>([]);
  const query = searchParams.q ? decodeURIComponent(searchParams.q) : "";
  const router = useRouter();

  //Handler

  const getData = async () => {
    try {
      const response = await fetch('/api/Bookings');
      if (!response.ok) {
        throw new Error('Fetch data failed');
      }
      
      const res = await response.json();
      console.log("API response:", res);

      // Extract the data array from the response
      const data = res.data;
      
      if (!Array.isArray(data)) {
        throw new Error('Fetched data is not an array');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

const handleDelete = async(id:any)=>{
  try {
    const res = await fetch(`/api/Bookings/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      console.log("Activities  deleted ");
     router.refresh();
    } else {
      console.error("Erreur lors de la suppression");
    }
    
  } catch (error) {
    
  }

}

  useEffect(() => {
    setIsClient(true);
    const fetch = async()=>{
      const data = await  getData();
      if (data) {
        if(query){
          const ActFilterd = data.filter(ACT => ACT.fullName.toLowerCase().includes(query.toLowerCase()));
          setBook(ActFilterd)
        }else{
        setBook(data)
        }

    }
    }
    fetch();
    
  }, [query]);

  const formate = (dateSting : any)=>{
    const date = new Date(dateSting);
    return date.toISOString().split("T")[0]
   }


  return (
    <div className={styles.container}>
      {/**Search Component */}
      <div className={styles.top}>
        <Search placeholder="search for a user.... " />
      </div>

      <h2 className={styles.title}>All reservations</h2>
      {isClient && (
        <table className={styles.table}>
          <thead>
            <tr>
              {td.map((item) => (
                <td key={item.name}>{item.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {Book.map((i, k) => (
              <tr key={k}>
                <td>{i.fullName}</td>

                <td>{i.email}</td>

                <td>{formate(i.startDate)}</td>

                <td>{formate(i.endDate)}</td>

                <td>{i.totalPrice}</td>

                <td className={styles.buttons}>
                  <Link
                    className={styles.view}
                    href={`/Admin/Reservation/${i._id}`}
                  >
                    <button className={styles.btn}>View</button>
                  </Link>
                  <button
                    className={styles.del}
                    onClick={() => {
                      handleDelete(i._id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Booking;
