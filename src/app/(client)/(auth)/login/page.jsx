"use client";

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const page = () => {
  const router = useRouter();
  const handleLog = async (data) => {
    const res = await signIn("client-login", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "http://localhost:3000/Rooms",
    });
  
    if (res?.error) {
      console.log("Invalid Credentials!");
      alert('Invalid Credentials!');
    } else {
      alert('Login successful!');
      window.location.href = res.url || "/Rooms";
    }
  };
  



  return (
  

<section className="relative flex flex-wrap lg:h-screen lg:items-center bg-white mt-8">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font- sm:text-3xl">Login in</h1>

      <p className="mt-4 text-gray-500">
       <strong>
       Launch an Unforgettable Experience
       </strong>
      </p>
    </div>

    <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={(e)=>{
        e.preventDefault();
        handleLog({
          email : e.target.email.value, 
          password : e.target.password.value
        });
      }}>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-[#DD761C] p-4 pe-12 text-sm shadow-sm"
            name='password'
            placeholder="Enter password"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          No account?
          <a className="underline" href="/Register">Sign up</a>
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
      alt=""
      src="/kech.jpg"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>

  )
}

export default page