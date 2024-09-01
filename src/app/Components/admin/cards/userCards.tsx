/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, {useState, useEffect} from 'react'
import { MdSupervisedUserCircle } from 'react-icons/md'
import styles from "./card.module.css"
import { IUsers } from '@/Models/Utilisateurs/user'


function UserCards() {
    const [isClient, setIsClient] = useState(false);
    const [users, setUsers] = useState<IUsers[]>([])
  
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/client/RegisterClient');
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
    useEffect(() => {
      setIsClient(true);
      const fetch = async()=>{
        const data = await  getData();
        if (data) {
          setUsers(data)
      }
      }
      fetch();
      
    }, [users])
  
  
    return (
      <div className={styles.container}>
        <MdSupervisedUserCircle size={24}/>
        <div className={styles.texts}>
          <span  className={styles.title}> Users</span>
          <span className={styles.number}>
            {users.length}
          </span>
        </div>
      </div>
    )
}

export default UserCards