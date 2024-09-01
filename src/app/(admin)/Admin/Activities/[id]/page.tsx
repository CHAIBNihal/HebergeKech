"use client"
import React, { useEffect, useState } from 'react'
import style from '@/app/Components/admin/annonce/singleann.module.css'
import Image from 'next/image';
import Link from "next/link";
import {  useParams } from 'next/navigation';
import { IListAnn } from '@/Models/Annonces/ListingAct';




const Activity = () => {
  const [data, setData] = useState<IListAnn | null>(null)
const {id} = useParams();

  const handleValidate = () => {
    // Logique pour valider la réservation
    console.log("Réservation validée");
}



useEffect(()=>{
  const getDataAct = async ()=>{
 try {
  const res = await fetch(`http://localhost:3000/api/activities/${id}`)
  if(!res.ok){
    throw new Error("Failed to fetch with this URL!!");
  }
  const result = await res.json();

  if(result.success && result.data){
    setData(result.data)
  }else {
    throw new Error("Failed to fetch logement data");
  }
} catch (error) {
  console.error("Failed to fetch with this API!", error);
}
  }
  getDataAct()
},[id])
  return (
    <div className={style.container}>
      <Image className={style.image} src={`/${data?.img[0]}`} alt='AnnonceImage' width={500} height={500} />
      <div className={style.infosContainer}>
        <div className={style.infoItem}>
          <h1>Title:</h1> <p>{data?.title}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Description:</h1> <p>{data?.desc}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Availibility:</h1> <p>{`${data?.Avail[0].toString().split('T')[0]} to ${data?.Avail[1].toString().split('T')[0]}`}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Address:</h1> <p>{data?.Address}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Created At:</h1>  <p>{data?.created_At.toString().split('T')[0]}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Updated At:</h1> <p>{data?.updated_At.toString().split('T')[0]}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Price:</h1> <p>{data?.Price}</p>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Link href={`/Admin/Activities/ActUpdate/${data?._id}`}>
                <button onClick={handleValidate} className={style.buttonValidate}>Update</button></Link>
                <button  className={style.buttonDelete}>Back</button>
            </div>
    </div>
  )
}

export default Activity
