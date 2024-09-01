import React from 'react'
import Image from "next/image"
import styles from "./right.module.css"
import Link from 'next/link'
const RightSide = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt='' fill/>
        </div>
        <div className={styles.texts}>
          <span className={styles.title}>Create New Annoucement </span>
          <p className={styles.desc}>Post an Accommodation Announcement</p>
          <button className="p-3 flex items-center gap-3 bg-blue-300 text-black border-none rounded-md cursor-pointer w-max">
          <a href="/Admin/Advertisement/NewAdv"> Click to create</a>
          </button>

        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt='' fill/>
        </div>
        <div className={styles.texts}>
          <span className={styles.title}> </span>
          <p className={styles.desc}>Post an Announcement activity </p>
          <button className="p-3 flex items-center gap-3 bg-blue-300 text-black border-none rounded-md cursor-pointer w-max" > <a href="/Admin/Activities/NewActivitie"> Click to create</a>
         </button>

        </div>
      </div>
    </div>
  )
}

export default RightSide