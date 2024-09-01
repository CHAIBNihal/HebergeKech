import React from 'react'
import styles from "./Footer.module.css"
const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>Luxury Living Estates</div>
        <div className={styles.text}>All rights reserved.</div>
    </div>
  )
}

export default Footer;