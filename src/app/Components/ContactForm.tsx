'use client'
import React, { useState } from 'react'

const ContactForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [click, setClick] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Empêche la page de se recharger

    // Envoyer les données à l'API
    try {
      const response = await fetch('http://localhost:3000/api/Contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, message }),
      })

      const data = await response.json()

      if (data.success) {
        setClick(true)
        
        setFirstName('')
        setLastName('')
        setEmail('')
        setMessage('')
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Error at sen', error)
    }
  }

  return (
    <section id="contact" className="bg-[#EEEDEB] rounded-lg flex flex-col mx-auto w-1/2 my-8 border-gray-400">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-8 md:px-10 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Contact Us</h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full rounded-lg border-gray-100 p-4 pe-12 text-sm shadow-sm"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full rounded-lg border-gray-100 p-4 pe-12 text-sm shadow-sm ml-1"
            />
          </div>
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-100 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <p className="my-4">Your Message here</p>
              <textarea
                className="h-[200px] w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Your Message"
              />
            </div>
          </div>
          <button type="submit" className="w-full p-2 bg-black text text-white rounded-lg">
            {click ? 'Your Message is sent successfully' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
