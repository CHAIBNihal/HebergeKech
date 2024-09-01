/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

const page = () => {

  const router = useRouter();

  const submitHandler = async(event)=>{
     const reqBody = {
      fullName : event.fullName,
      email : event.email,
      pass : event.pass,
      gender:event.gender,
      phone_number : event.phone_number,
      age : event.age,
      situation : event.situation, 
      contry:event.contry  
     };
     await axios
     .post('/api/client/RegisterClient', reqBody)
     .then(function(res){
      console.log(res)
      alert('account created !')
      router.push('/login')
     })
     .catch(function(error){
      alert('SomeThing went wrong...')
     })
  }


  return (
    <section className="relative flex flex-wrap mt-2 mb-48 lg:h-screen lg:items-center bg-white">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">Create an account now!</h1>
          <p className="mt-4 text-gray-500">
            <strong>Launch an Unforgettable Experience</strong>
          </p>
        </div>

        <form  className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        onSubmit={(e)=>{
          e.preventDefault();
          submitHandler({
            fullName : e.target.fullName.value, 
            email : e.target.email.value, 
            pass : e.target.pass.value,
            gender : e.target.gender.value,
            phone_number : e.target.phone_number.value,
            age : e.target.age.value,
            situation : e.target.situation.value, 
            contry : e.target.contry.value
          })
        }}>
          <div>
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <div className="relative">
              <input
              name="fullName"
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter full name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <input
              name='email'
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
           
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                type="password"
                name="pass"
                className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

            </div>
          </div>
          <div>
            <label htmlFor="gender" className="sr-only">Gender</label>
            <div className="relative">
              <select
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                name="gender"
              >
                <option value="" disabled selected>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                
              </select>
            </div>
          </div>


          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <div className="relative">
              <input
              name="phone_number"
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="age" className="sr-only">Age</label>
            <div className="relative">
              <input
                type="number"
                name="age"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter age"
              />
            </div>
          </div>

          <div>
            <label htmlFor="situation" className="sr-only">Marital Status</label>
            <div className="relative">
              <select
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                name="situation"
              >
                <option value="" disabled selected>Select marital status</option>
                <option value="single" >Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="country" className="sr-only">Country</label>
            <div className="relative">
              <input
                type="text"
                name="contry"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter country"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              You already have an account?
              <a className="underline" href="/login"> Sign in</a>
            </p>

            <button
          type="submit"
          className="inline-block rounded-lg bg-black hover:bg-transparent hover:text-black px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="kech"
          src="/kech.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default page;
