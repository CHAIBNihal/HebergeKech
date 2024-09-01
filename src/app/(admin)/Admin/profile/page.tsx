/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


import React from 'react';

const UserProfile = () => {
const router = useRouter();
  
  const handleEditProfile = () => {
 console.log("Hi Edit your profile ")
  };

  const handleGoToDashboard = () => {
    router.push('/Admin/Dashboard')
  };
  
  const {data} = useSession();
  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      {/* Profile Picture and Basic Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
      }}>
        <img 
           src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
           alt="avatar"
           className="rounded-circle"
           style={{ width: '150px' }}
        />
        <h2>{data?.user.fullName}</h2>
        <p> Administrator </p>
        <p>Marrakech</p>
      </div>

   
      <div style={{
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        flexGrow: 1,
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Full Name: </strong> {data?.user.fullName}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Email: </strong> {data?.user.email}
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Address: </strong> Address for luxury Living Estate
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button 
          onClick={handleEditProfile} 
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Modifier le profil
        </button>
        <button 
          onClick={handleGoToDashboard} 
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#6c757d',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Revenir au dashboard
        </button>
      </div>
      </div>
     
    </div>
  );
};

export default UserProfile;


