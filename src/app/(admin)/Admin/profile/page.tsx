/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserProfile = () => {
  const router = useRouter();
  const { data } = useSession();
  
  const [fullName, setFullName] = useState(data?.user.fullName || '');
  const [email, setEmail] = useState(data?.user.email || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
const id = data?.user._id;
  const handleEditProfile = async () => {
    try {
      const response = await fetch(`/api/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');
      } else {
        setErrorMessage(result.message || 'Failed to update profile');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating the profile');
      setSuccessMessage('');
    }
  };

  const handleGoToDashboard = () => {
    router.push('/Admin/Dashboard');
  };

  return (
    <div className="flex gap-8 p-8 bg-gray-100 min-h-screen">
      {/* Profile Picture and Basic Info */}
      <div className="flex flex-col items-center p-8 shadow-lg rounded-lg bg-white">
        <img 
          src="https://via.placeholder.com/150?text=Admin+Avatar"
          alt="Admin avatar"
          className="rounded-full w-36 mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{fullName}</h2>
        <p className="text-gray-600">Administrator</p>
        <p className="text-gray-600">Marrakech</p>
      </div>

      {/* Detailed Info and Form */}
      <div className="p-8 shadow-lg rounded-lg bg-white flex-grow">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name:</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button 
              type="button"
              onClick={handleEditProfile} 
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
              Modifier le profil
            </button>
            <button 
              type="button"
              onClick={handleGoToDashboard} 
              className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
            >
              Revenir au dashboard
            </button>
          </div>
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
