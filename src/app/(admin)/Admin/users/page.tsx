"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/app/Components/admin/users/users.module.css";
import Search from "@/app/Components/admin/search/serach"
import Link from 'next/link';
import { IUsers } from '@/Models/Utilisateurs/user';
import { useRouter } from 'next/navigation';
const title = [
  {name:"name"},
  {name:"email"},
  {name:"phone"},
  {name:"Country"},
  {name:"Action"},
  
]

interface BookProps {
  searchParams:{q?:string;}
}


const Users =  ({searchParams} : BookProps) => { 
    const [isClient, setIsClient] = useState(false);
    const [dataUser, setDataUser] = useState<IUsers[]>([]);
    const query = searchParams.q ? decodeURIComponent(searchParams.q) : "";
    const router = useRouter();

    //Handler 
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/client/RegisterClient');
        if (!response.ok) {
          throw new Error('Fetch data failed');
        }
        
        const res = await response.json();
        
  
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
        const res = await fetch(`/api/client/${id}`, {
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
            setDataUser(ActFilterd)
          }else{
          setDataUser(data)
          }
  
      }
      }
      fetch();
      
    }, [query]);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
     <Search placeholder='search for a user.... '/>
     
      </div>
      <div>
       { (isClient && (
        <table className={styles.table}>
          <table>
            <thead>
              <tr>
                
              {title.map((item) => (
                  <td key={item.name}>{item.name}</td>
                ))}
              </tr>
            </thead>

            <tbody>
               {
              
                
              dataUser.map((data, k)=>(<tr key={k}>
                 
                  <td >{data.fullName}</td>
                  <td >{data.email}</td>
                  <td >{data.phone_number}</td>
                  <td >{data.contry}</td>
                  <td>
                    <div className={styles.buttons}>
                   <Link href={`/Admin/users/${data?._id}`}>
                    <button className={`${styles.btn} ${styles.view}`}>
                     View
                    </button>
                  </Link>
                  
                   <button className={`${styles.btn} ${styles.del}`}
                   onClick={() => {
                    handleDelete(data?._id);
                  }}
                   >
                    Delete
                     </button>
                     </div>
                  </td>

                 
               
                </tr>))
                }
              
            </tbody>
          </table>
        </table> ))}
       
      </div>
    </div>
  )
}

export default Users;