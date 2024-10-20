'use client'
import React from 'react'
import styles from "./sidebar.module.css"
import { MdDashboard, MdSupervisedUserCircle } from 'react-icons/md'
import MenuLink from './menuLink/menuLink'
import { useSession } from 'next-auth/react';

interface MenuItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

interface MenuCategory {
  title: string;
  list: MenuItem[];
}

// Data
const menuItem: MenuCategory[] = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/Admin/Dashboard",
        icon: <MdDashboard />
      },
      {
        title: "Users",
        path: "/Admin/users",
        icon: <MdSupervisedUserCircle />
      },
      {
        title: "Reservation",
        path: "/Admin/Reservation",
        icon: <MdDashboard />
      },
      {
        title: "Activities",
        path: "/Admin/Activities",
        icon: <MdDashboard />
      },
      {
        title: "Accommodation ",
        path: "/Admin/Advertisement",
        icon: <MdDashboard />
      },
    ]
  },
  {
    title: "User",
    list: [
      {
        title: "Profile",
        path: "/Admin/profile"
      }
    ]
  }
];
const SideBar = () => {
  const { data } = useSession();
  const userName = data?.user.fullName
  return (
    <div className={styles.container}>
      <div className={styles.userDetail}>
        <div className={styles.username}>{userName}</div> 
        <div className={styles.userTitle}>Administrator</div>
      </div>
      <ul className={styles.list}>
      {menuItem.map((i)=>(
        <li key={i.title}>
          <span className={styles.cat}>
            {i.title}
          </span>
         {i.list.map((item)=>(
         <MenuLink item={item} key={item.title}/>
         ))}
          </li>
      ))}
      </ul>
    </div>
  )
}

export default SideBar