"use client";

import React from "react";
import { FaUser, FaLock } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import "@/app/Components/admin/authAdmin/Login.css";
import axios from 'axios';
const AuthAdmin = () => {
  const router = useRouter();


const submitHandler  = async(event)=>{

  const requestBody = {
    fullName : event.fullName,
    email: event.email,
    pass: event.pass,
  };
  console.log(requestBody);


  await axios
  .post('/api/admin/createAdmin',requestBody )
  .then(function(res){
    console.log(res);
    alert('account created !' )
    router.push('/authAdmin/LoginAdmin')
  })
  .catch(function(error){
    alert('Something went wrong...');
    
  })
}
  return (
    <div>
      <div className="wrapper">
        <form onSubmit={(e)=>{
          e.preventDefault();
          submitHandler({
            fullName : e.target.fullName.value, 
            email : e.target.email.value, 
            pass : e.target.pass.value
          })
        }}>
          <h1>Admin Register</h1>

          <div className="input-box">
            <input type="text" name="fullName" placeholder="Username...." />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="email" name="email"  placeholder='Email@gmail.com' />
            <MdOutlineAlternateEmail className='icon' />
        </div>
          <div className="input-box">
            <input type="password" name="pass" placeholder="Password...." />
            <FaLock className="icon" />
          </div>

          
          <button type="submit">Register</button>

          <div className="register-link">
            <p>
              Do you have an account?<a href="/authAdmin/LoginAdmin">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthAdmin;
