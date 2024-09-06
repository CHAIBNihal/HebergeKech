"use client"
import React, { useEffect, useState } from 'react';
import { IContact } from '@/Models/Contact';
import { TbHttpDelete } from "react-icons/tb";

const MessagesTable = () => {
  const [messages, setMessages] = useState<IContact[]>([]);

  // Fonction pour récupérer tous les messages depuis l'API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/Contact'); // Appel à votre API GET
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
        } else {
          console.error('Erreur lors de la récupération des messages:', data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id: string) => {
   
    

    try {
      const res = await fetch(`/api/Contact/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter(msg => msg._id !== id)); // Met à jour la liste sans le message supprimé
      } else {
        console.error('Erreur lors de la suppression du message:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du message:', error);
    }
  };

  return (
    <div className="fix-height container mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Messages Received</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#2e374a] text-white">
              <th className="p-4 text-left">First Name</th>
              <th className="p-4 text-left">Last Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg, k) => (
                <tr key={k} className="border-t border-gray-200 hover:bg-gray-100">
                  <td className="p-4">{msg.firstName}</td>
                  <td className="p-4">{msg.lastName}</td>
                  <td className="p-4">{msg.email}</td>
                  <td className="p-4">{msg.message} </td>
                  <td>
                    <button onClick={()=>{
                        deleteMessage(msg._id as string  )
                    }}>
                    <TbHttpDelete size={30} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesTable;
