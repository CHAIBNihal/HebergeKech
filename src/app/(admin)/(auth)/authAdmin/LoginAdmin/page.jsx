"use client";

import React, {  useState } from 'react';
import { FaLock } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import "@/app/Components/admin/authAdmin/Login.css";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();

  const handleSubmit  = async (data) => {

    const resData = await signIn("admin-login", {
      email: data.email,
      password: data.password,
       callbackUrl: "/api/admin/auth",
      redirect: false,
    });
console.log(resData.error);
    if (
      resData.status === 400 ||
      resData.status === 401 ||
      resData.status === 403
    ) {
      console.log("Invalid Credentials!");
      alert('Invalid Credentials!');
    } else if (resData.status === 500) {
      console.log("Server error!");
      alert('Server error!');
    } else {
      alert('Login successful!');
      router.push('/Admin/Dashboard');
      console.log(resData);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit({
          email : e.target.email.value, 
          password : e.target.password.value
        });
      }}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" name="email" placeholder="email@gmail.com" required />
          <MdOutlineAlternateEmail className="icon" />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">SignIn</button>
        <div className="register-link">
          <p>
            You dont have an account? <a href="/authAdmin/RegisterAdmin">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
