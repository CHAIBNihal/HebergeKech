import React from "react";
import Hero from "../Components/Hero";
import Services from "../Components/Services";
import About from "../Components/About";
import ContactForm from "../Components/ContactForm";
export default function Home() {
  return (
    <>
    <Hero />
    <hr className="mx-auto w-1/2 h-1 bg-gray-100 mt-20"/>
    <About/>
    <hr className="mx-auto w-1/2 h-1 bg-gray-100 my-4"/>

    <Services/>
    <hr className="mx-auto w-1/2 h-1 bg-gray-100 my-4"/>

    <ContactForm/>
    </>
  );
}
