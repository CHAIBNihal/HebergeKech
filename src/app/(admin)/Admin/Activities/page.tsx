/* eslint-disable jsx-a11y/alt-text */
'use client'
import styles from "@/app/Components/admin/Activite/act.module.css"
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from "@/app/Components/admin/search/serach"
import { IListAnn } from "@/Models/Annonces/ListingAct"; 
import {  useRouter } from "next/navigation";

const td = [

  {name: "Annonce Name"},
  {name:"created_At"},
  { name: "Price" },
  { name: "Availability" },
  {name:"Address"},
  {name: "Actions"},
];

interface ActProps {
  searchParams:{q?:string;}
}

const Transaction = ({searchParams} : ActProps) => {
  const [isClient, setIsClient] = useState(false);
  const [dataAct, setDataAct] = useState<IListAnn[]>([])
  const query = searchParams.q ? decodeURIComponent(searchParams.q) : "";
const router = useRouter()

  const getData = async()=>{
    try {
      const data = await fetch('/api/activities');
      if (!data.ok) {
        throw new Error('Fetch data failed') 
      }

      const res:IListAnn[] = await data.json();
   
      return res;
    } catch (error) {
      console.error('Error ', error)
    }
  }

  const handleDelete = async (id:any) => {
    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log("Activities  deleted ");
       router.push("/Admin/Activities/");
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };


  useEffect(() => {
    setIsClient(true);
    const fetch = async()=>{
      const data = await  getData();
      if (data) {
        if(query){
          const ActFilterd = data.filter(ACT => ACT.title.toLowerCase().includes(query.toLowerCase()));
          setDataAct(ActFilterd)
        }else{
        setDataAct(data)
        }

    }
    }
    fetch();
    
  }, [query]);

  const formate = (dateSting : any)=>{
    const date = new Date(dateSting);
    return date.toISOString().split("T")[0]
   }
  console.log(dataAct)


  return (
    <div className={styles.container}>
       <div className={styles.top}>
     <Search placeholder='search for a user.... '/>
     
      </div>
      <h2 className={styles.title}>All Activities</h2>
      
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
              {dataAct.map((i, k)=>(
              <tr key= {k}>
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
                  {i.Avail.map((date)=>(formate(date))).join('  ,  ')}
                </td>

                <td>
                  {i.Address}
                </td>
                

                <td className={styles.buttons}>
                  <Link className={styles.view} href={`/Admin/Activities/${i._id}`}>
                  <button className={styles.btn} >
                    View 
                    </button>
                    </Link>
                    <button className={styles.del} onClick={()=>{handleDelete(i._id)}}>
                    
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

export default Transaction;
