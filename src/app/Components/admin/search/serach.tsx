"use client "
import React from 'react'
import styles from "./search.module.css"
import { MdSearch } from 'react-icons/md'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'


//----------------Debut ---------------------

const Serach = ({placeholder}: {placeholder:string}) => {
  //Constant
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const replace = useRouter()


  const handlSearch =  (term:string)=>{
    const params = new URLSearchParams(searchParams.toString()); 
    if(term.trim() === " "){
   params.delete('q')
  }else{
    params.set('q', term);
  }
  replace.push(`${pathname}?${params.toString()}`);
  
  }
 

  return (
    <div className={styles.container}>
    
      <MdSearch/>
      <input type="search" placeholder={placeholder} className={styles.input} 
      onChange={(e)=>{handlSearch(e.target.value)}}
      
       defaultValue={decodeURIComponent(searchParams.get('q')?.toString() || "")}
      />
    </div>
  )
}

export default Serach