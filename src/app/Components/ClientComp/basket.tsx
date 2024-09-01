/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IResa } from '@/Models/Resa';

const Basket = () => {
  const { data } = useSession();
  const [hist, setHist] = useState<IResa[]>([]);
  const userId = data?.user._id;

  const getData = async () => {
    try {
      const response = await fetch('/api/Bookings');
      if (!response.ok) {
        throw new Error('Fetch data failed');
      }
      
      const res = await response.json();
      console.log("API response:", res);

      // Extract the data array from the response
      const responseData = res.data;
      
      if (!Array.isArray(responseData)) {
        throw new Error('Fetched data is not an array');
      }
      
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/Bookings/${bookingId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }
      
      // Remove the deleted booking from the state
      setHist(prevHist => prevHist.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  useEffect(() => {
    const fetchBooking = async () => {
      const dataBook = await getData();
 
      if (dataBook) {
        const userBooking = dataBook.filter(book => book.clientId === userId);
        console.log(userBooking);
        setHist(userBooking);
      }
    }
    fetchBooking();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{hist.length} Booking</h1>
      <div className="flex flex-col gap-4">
        {hist.map((i, k) => (
          <div key={k} className="border p-4 rounded-lg shadow-sm bg-white">
            <p className="text-lg font-semibold">Réservé par : {i.fullName}</p>
            <p>Email : {i.email}</p>
            <p>{i.LogId ? 'Type: Hébergement' : 'Type : Activité'}</p>
            <p>Du : {new Date(i.startDate).toLocaleDateString()}</p>
            <p>Au : {new Date(i.endDate).toLocaleDateString()}</p>
            <p>Montant : {i.totalPrice} €</p>
            <button
              onClick={() => handleCancel(i?._id as string)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
            >
              Annuler la réservation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Basket;
