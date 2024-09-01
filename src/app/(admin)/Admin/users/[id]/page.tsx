'use client'
import React, {useState, useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation'
import { IUsers } from '@/Models/Utilisateurs/user'
import style from "@/app/Components/admin/users/SingleUser/SingleUser.module.css"
import Link from 'next/link'

const titles = [
  { name: "Full Name" },
  { name: "Email Adress" },
  { name: "Phone Number" },
  { name: "Gender" },
  { name: "Age" },
  { name: "Family situation" },
  { name: "Country" }
]



const UserDetail = () => {
  const [userData, setUserData] = useState<IUsers | null>(null);
    const { id } = useParams();
    const router = useRouter();
    const handleValidate = () => {
        router.push("/Admin/Reservation");
        console.log("Réservation validée");
    };
    useEffect(() => {
      const getUser = async () => {
          try {
              const res = await fetch(`http://localhost:3000/api/client/${id}`);
              if (!res.ok) {
                  throw new Error("Failed to fetch with this URL!");
              }
              const result = await res.json();
              console.log(result.success)
              console.log(result.data)
              if (result.success && result.data) {
                setUserData(result.data);
              } else {
                  throw new Error("Failed to fetch reservation data");
              }
          } catch (error) {
              console.error("Failed to fetch with this API!", error);
          }
      };

      getUser();
  }, [id]);

  if (!userData) {
      return <p>Loading...</p>;
  }

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1 className='text-xl'> User name :
          <strong className='text-green-500'> {userData?.fullName}</strong>
        </h1>
      </div>
      <div className={style.form}>
        <div className={style.titles}>
          {titles.map((i) => (
            <p className='mb-3' key={i.name}>{i.name} :</p>
          ))}
        </div>
        <div className={style.infos}>
          <p>{userData?.fullName}</p>
          <p>{userData?.email}</p>
          <p>{userData?.phone_number}</p>
          <p>{userData?.gender}</p>
          <p>{userData?.age}</p>
          <p>{userData?.situation}</p>
          <p>{userData?.contry}</p>
          <Link href={'/Admin/users'}>
          <button className='bg-blue-50' >
                Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
