/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react';
import style from "@/app/Components/admin/Activite/SingleAct.module.css";
import Image from 'next/image';
import Link from "next/link";
import {  useParams } from 'next/navigation';
import { IListLog } from '@/Models/Annonces/ListingLog';
import { format } from 'path';

const thead = [
  { name: "Title" },
  { name: "Description" },
  { name: "Availibility" },
  { name: "Address" },
  { name: "Created At:" },
  { name: "Updated At" },
  { name: "Price" }
];

const showLogById = () => {
  const [data, setData] = useState<IListLog | null>(null);

  const { id } = useParams();

  const handleValidate = () => {
    console.log("Réservation validée");
  };

 
  

  useEffect(() => {
    const getDataById = async () => {
      try {
        const res = await fetch(`/api/Logement/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch with this URL!!");
        }

        const result = await res.json();
       
        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error("Failed to fetch logement data");
        }
      } catch (error) {
        console.error("Failed to fetch with this API!", error);
      }
    };

    getDataById();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <Image className={style.image} src={`/${data.img[0]}`} alt='AnnonceImage' width={500} height={500} />
      <div className={style.infosContainer}>
        <div className={style.infoItem}>
          <h1>Title:</h1> <p>{data.title}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Description:</h1> <p>{data.desc}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Availibility:</h1> 
          {data.Avail && data.Avail.length === 2 ? (
            <p>{`${data.Avail[0].toString().split('T')[0]} to ${data.Avail[1].toString().split('T')[0]}`}</p>
          ) : (
            <p>Not available</p>
          )}
        </div>
        
        <div className={style.infoItem}>
          <h1>Created At:</h1> <p>{new Date(data.created_At).toLocaleDateString()}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Updated At:</h1> <p>{new Date(data.updated_At).toLocaleDateString()}</p>
        </div>
        <div className={style.infoItem}>
          <h1>Price:</h1> <p>{data.Price} MAD</p>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Link href={`/Admin/Advertisement/UpdateAdv/${data._id}`}>
          <button onClick={handleValidate} className={style.buttonValidate}>Update</button>
        </Link>
        <button  className={style.buttonDelete}>Delete</button>
      </div>
    </div>
  );
};
export default showLogById;
