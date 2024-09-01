/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import styles from "@/app/Components/admin/annonce/ann.module.css"
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from "@/app/Components/admin/search/serach"
import { IListLog } from "@/Models/Annonces/ListingLog";
import { useParams, useRouter } from 'next/navigation';

const td = [
  
  { name: "Annonce Name" },
  { name: "created_At" },
  { name: "Price" },
  { name: "Disponible" },
  { name: "Actions" },
];
//Interface pour definir searchParams autant que props:
interface LogProps  {
searchParams : {
  q?:string;
}
}

const Logement = ({searchParams} : LogProps) => {
  const [isClient, setIsClient] = useState(false);
  const [dataTable, setDataTable] = useState<IListLog[]>([]);
  const { id } = useParams();
  const router = useRouter()

 // Afficher q= "valeur " => la valeur  avec searchParams.q 
console.log(searchParams.q)
const query = searchParams.q ? decodeURIComponent(searchParams.q) : "";

  const getDataTable = async () => {
    try {
      const res = await fetch("/api/Logement");
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
     
      const data: IListLog[] = await res.json() 
     
      console.log("Data fetched from API ");
    
     return data  ;
    } catch (error) {
      console.error("Error loading logement data", error);
    }
  };
  const handleDelete = async (id:any) => {
    try {
      const res = await fetch(`/api/Logement/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log("Réservation supprimée");
        router.push('/Admin/Dashboard');
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };


  useEffect(() => {
    setIsClient(true);
    
    const fetchData = async () => {
      const data = await getDataTable();
      if (data) {
        if (query) {
          const filteredData = data.filter(log => log.title.toLowerCase().includes(query.toLowerCase()));
          setDataTable(filteredData);
        } else {
          setDataTable(data);
        }
      }
    };
    fetchData();
  }, [query]);
 

 const formate = (dateSting : any)=>{
  const date = new Date(dateSting);
  return date.toISOString().split("T")[0]
 }


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder='search for an annoucement ....'   />
      </div>
      <h2 className={styles.title}>All Logement Annonces </h2>
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
          {
            dataTable.map((i, k)=>(
               <tr key={k}>
                <td>
                  {i.title}
                </td>
                <td>
                  {formate(i.created_At)}
                </td>
                <td>
                  {i.Price}
                </td>
                <td>
                  {i.Avail.map((d)=>(formate(d))).join(' to ')}
                </td>

                <td className={styles.buttons}>
                  <Link className={styles.view} href={`/Admin/Advertisement/${i._id}`}>
                  <button className={styles.btn}>
                    View
                  </button>
                  </Link>
                  <button className={styles.del} onClick={()=>{handleDelete(i._id)}}>
                    <a className={styles.btn} >
                    delete 
                    </a>
                  </button>
                </td>
               </tr>
            ))
          }
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Logement;
