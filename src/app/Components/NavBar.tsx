"use client"
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';

import React from "react";
import Logo from "../../../public/logo.jpg"
import User from "../../../public/User.svg"
import Menu from "../../../public/Menu.svg"
import Image from "next/image";
import { useState } from "react";

const linksNav = [
  
  {name:"About Us", lien:"about-section"},
  {name:"Services", lien:"services"},
  {name:"Contact Us ", lien:"contact"},
]
function NavBar() {

  const [isClick, setisClick] = useState(false)
const toogleNavbar = ()=>{
  setisClick(!isClick);
}
  return (
    <>

    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
             <Image src={Logo} alt="Logo"  height={50} width={55}/>
            </div>
          </div>
          <div className="hidden md:block ">
            
            <div className="ml-4 flex items-center space-x-4">
            <a href="/" className="text-black hover:text-second p-2 cursor-pointer">Home</a>
              {
                linksNav.map((index, e)=>(
                
                  <ScrollLink smooth={true} to={index.lien} duration={800} className="text-black hover:text-second p-2 cursor-pointer" key={e} href={index.lien}>{index.name}</ScrollLink>
                  
                ))
              }
             <button className=" flex justify-between items-center  p-3 w-auto text-black rounded-lg bg-second hover:bg-transparent" >
             <a href="/login">Login</a>
             </button>
             <button className=" flex justify-between items-center  p-3 w-auto text-black rounded-lg bg-second hover:bg-transparent">
             <a href="/Register">Register</a>
             </button>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-black
             md:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
             onClick={toogleNavbar}>
              {
                isClick ? (
                  <svg className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24 "
            stroke="currentColor"
          >
          <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
            />
            
    </svg>
                ):(
                  <svg className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24 "
            stroke="currentColor"
          >
            <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7  6h7"
            />
            
           </svg>
                )
              }
             </button>
          </div>
        </div>
      </div>
      {
        isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
            <a href="/" className="block rounded-lg text-black hover:text-second hover:bg-black  p-2 cursor-pointer">Home</a>
            {
                linksNav.map((index, e)=>(
                  <ScrollLink smooth={true} to={index.lien} duration={800} className="block text-black hover:text-second hover:bg-black  rounded-lg p-2 cursor-pointer" key={e} >{index.name}</ScrollLink>
                ))
              }
            </div>
          </div>
        )
      }
    </nav>
    </>
  );

}


export default NavBar;
