/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

const Services = () => {
  return (
    <section id='services'>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
          <div className="grid place-content-center rounded-xl bg-[#EEEDEB] p-6 sm:p-8">
            <div className="mx-auto max-w-md text-center lg:text-left">
              <header>
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Our Services</h2>
                <p className="mt-4 text-gray-500">
                  We offer you an unforgettable experience. You will enjoy a luxury accommodation service and meet the activities in Marrakech.
                </p>
              </header>
              <Link href="#" className="mt-8 inline-block rounded border border-second bg-second px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring">
                Start Now
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 lg:py-8">
            <ul className="grid grid-cols-2 gap-4">
              <li>
               
                  <div className="group block">
                    <img
                      src="/activite.jpg"
                      alt="Activity Services"
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Activity Services
                      </h3>
                      <div className="mt-5">
                        <Link href="/Activities">
                          <div className="p-3 rounded-lg bg-black font-medium text-white">See More</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                
              </li>

              <li>
                
                  <div className="group block">
                    <img
                      src="villa.jpg"
                      alt="Logement Service"
                      className="aspect-square w-full rounded object-cover gap-5"
                    />
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Logement Service
                      </h3>
                      <div className="mt-5">
                        <Link href="/Rooms">
                          <div className="p-3 rounded-lg bg-black font-medium text-white">See More</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
