"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import style from "./nav.module.css"
import { signOut } from 'next-auth/react';
import { MdSearch, MdOutlineChat, MdNotifications, MdLogout } from 'react-icons/md'
const Header = () => {
  const path = usePathname()

  return (
    <div className={style.container}>
      <div className={style.title}>{path.split("/").pop()}</div>
      <div className={style.menu}>
        <div className={style.search}>
          <MdSearch/> 
          <input type="text" placeholder='Search...' className={style.input} />
        </div>

        <div className={style.icons}>
          <a href="/Admin/Message">
          <MdOutlineChat size={20}/>
          </a>
          <MdNotifications size={20}/>
          <button >
            <a href="/api/auth/signout" onClick={(e)=>{e.preventDefault();
            signOut()
          }} >
            <MdLogout size={20}/>
            </a>
             
          </button>
         
        </div>
      </div>
    </div>
  )
}

export default Header