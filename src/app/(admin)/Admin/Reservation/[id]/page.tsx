"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IResa } from '@/Models/Resa';
import style from "@/app/Components/admin/Resa/singleResa/singlresa.module.css";



const title = [
    { name: "Title Announcement" },
    { name: "Start Date" },
    { name: "End Date" },
    { name: "Client Name" },
    { name: "Guest Number" },
    { name: "Total Price" },
];

const SingleReservation = () => {
    const [data, setData] = useState<IResa | null>(null);
    const { id } = useParams();
    const router = useRouter();
    
    const handleValidate = () => {
        router.push("/Admin/Reservation");
        console.log("Réservation validée");
    };
    console.log('[ id : ', id, ']')
    const handleDelete = async(id:any)=>{
        try {
          const res = await fetch(`/api/Bookings/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            console.log("Activities  deleted ");
           router.push("/Admin/Reservation");
          } else {
            console.error("Erreur lors de la suppression");
          }
          
        } catch (error) {
          
        }
      
      }
    useEffect(() => {
        const getDataAct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/Bookings/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch with this URL!");
                }
                const result = await res.json();
                console.log("Result Resa detail ",result)
                if (result.success && result.data) {
                    setData(result.data);
                } else {
                    throw new Error("Failed to fetch reservation data");
                }
            } catch (error) {
                console.error("Failed to fetch with this API!", error);
            }
        };

        getDataAct();
    }, [id]);

    if (!data) {
        return <p>Loading...</p>;
    }

    const titleToDisplay = data.activityId ? data.activityId.title : data.LogId?.title || 'Unknown';

    return (
        <div className={style.container}>
            <div className={style.detailContainer}>
                <div className={style.resaTitle}>
                    <h1>Reservation: {id}</h1>
                </div>
                <div className={style.detail}>
                    <div className={style.title}>
                        {title.map((index) => (
                            <p key={index.name}>{index.name}</p>
                        ))}
                    </div>
                    <div className={style.infos}>
                        <p>{titleToDisplay}</p>
                        <p> {new Date(data.startDate).toLocaleDateString()}</p>
                        <p> {new Date(data.endDate).toLocaleDateString()}</p>
                        <p>{data.fullName}</p>
                        <p> {data.guestNum}</p>
                        <p> {data.totalPrice}</p>
                    </div>
                </div>
            </div>
            <div className={style.buttonContainer}>
                <button onClick={handleValidate} className={style.buttonValidate}>Back</button>

                <button  onClick={() => {
                      handleDelete(data?._id);
                    }} className={style.buttonDelete}>Delete</button>
            </div>
        </div>
    );
};

export default SingleReservation;
