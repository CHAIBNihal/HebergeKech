import React from 'react'

const About = () => {
  return (
    <section   id='about-section'>
      
    <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
      
        <div className="relative z-10 lg:py-16">
          <div className="relative h-64 sm:h-80 lg:h-full rounded-lg ">
          { /* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              alt=""
              src="/riad.jpg"
              className="absolute inset-0 h-full w-full object-cover rounded-lg  "
            />
          </div>
        </div>
  
        <div className="relative flex items-center">
          <span
            className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16"
          ></span>
  
          <div className="p-8 sm:p-16 lg:p-24">
            <h2 className="text-2xl font-bold sm:text-3xl">
                  How We Are 
            </h2>
  
            <p className="mt-4 text-gray-600">
            We are pleased to present our proposal for a specialized service in the promotion and reservation
            of exceptional real estate heritage.
            Our company, <strong>LUXE LIVING ESTATES</strong>, is an experienced agency in the field of promotion and
            reservation of historical, cultural, and architectural venues. We have successfully worked with
            several establishments similar to yours, highlighting their unique assets and attracting an
            international clientele.
            </p>
  
            <a
              href="/login"
              className="mt-8 inline-block rounded border border-second bg-second px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-indigo-500"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default About