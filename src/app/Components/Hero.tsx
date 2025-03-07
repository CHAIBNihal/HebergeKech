import React from 'react'
import SearchBare from "../Components/SearchBare"
function Hero() {
  
  return (
   
 

<section id='Home'
  className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
>


  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      LUXE LIVING ESTATES
      </h1>

      <p className="mt-4 max-w-lg sm:text-xl/relaxed font-medium">
        The best way to the best residential destination 
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <a
          href="#"
          className="block w-full rounded bg-second px-12 py-3 text-sm font-medium text-white shadow hover:bg-second hover:text-black focus:outline-none focus:ring  active:bg-second sm:w-auto"
        >
          Get Started
        </a>

        <a
          href="#"
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-second shadow hover:text-black focus:outline-none focus:ring active:text-second sm:w-auto"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
 
 
</section>
  )
}

export default Hero
