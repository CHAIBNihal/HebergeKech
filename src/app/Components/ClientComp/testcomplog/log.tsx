/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { IListLog } from '@/Models/Annonces/ListingLog';
import { MdPool, MdOutlineSevereCold } from "react-icons/md";
import { FaWifi, FaPaw } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { GiCampfire } from "react-icons/gi";
import { PiTreeEvergreenFill } from "react-icons/pi";
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

interface ListRoomPageProps {
  id: string;
}

const ListRoomPage: React.FC<ListRoomPageProps> = ({ id }) => {
  const nbrImg = 5;
  const [log, setLog] = useState<IListLog | null>(null);

  const { data } = useSession();
  const clientId = data?.user._id;
  const { id: LogId } = useParams();
  const router = useRouter();
  const email = data?.user.email;
  const fullName = data?.user.fullName;

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    Phone_Number: "",
    guestNum: 1,
    totalPrice: 0,
  });

  useEffect(() => {
    if (log && formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (startDate && endDate && endDate > startDate && log.Price) {
        const timeDiff = endDate.getTime() - startDate.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const totalPrice = days * log.Price;
        setFormData(prev => ({ ...prev, totalPrice }));
      }
    }
  }, [log, formData.startDate, formData.endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/Bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, LogId, clientId, email, fullName }),
      });
      if (response.ok) {
        router.push('/Rooms');
      } else {
        console.error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    const getDataById = async () => {
      try {
        const res = await fetch(`/api/Logement/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch with this URL!!");
        }

        const result = await res.json();
        if (result.success && result.data) {
          setLog(result.data);
        } else {
          throw new Error("Failed to fetch logement data");
        }
      } catch (error) {
        console.error("Failed to fetch with this API!", error);
      }
    };

    getDataById();
  }, [id]);

  const totalPrice = formData.totalPrice || 0;
  const nights = formData.startDate && formData.endDate
    ? Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 3600 * 24))
    : 0;

  return (
    <div className="container mx-auto px-4 mt-3 mb-5">
      <h1 className="text-2xl font-semibold mb-4"> {log?.title} </h1>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-2">
          {log?.img.slice(0, nbrImg).map((i, k) => (
            <div
              key={k}
              className={`relative ${k === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img
                src={`/${i}`}
                alt="Image of the property"
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Booking Form </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                 Start Date
                </label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  name="Phone_Number"
                  value={formData.Phone_Number}
                  onChange={handleChange}
                  type="tel"
                  className="mt-1 block w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="bg-red-200 border-red-600 rounded-lg p-4 m-4">
                <label className="block text-sm font-medium text-gray-700">
                  Total Price (MAD)
                </label>
                <h1>{totalPrice} MAD For {nights} Night{nights !== 1 ? 's' : ''}</h1>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                   Number of Guest
                </label>
                <input
                  type="number"
                  name="guestNum"
                  value={formData.guestNum}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md p-2"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md"
              >
              Send
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-gray-700">
          <strong>Price</strong> {log?.Price} MAD
        </p>
        <strong>Description : </strong>
        <p className="text-gray-600 mt-4">{log?.desc}</p>
      </div>

      <div className="mt-8">
        <div className="text-gray-700 mt-2 mb-4 flex flex-col justify-between">
          <div>
            <strong>Availibility</strong>
            <h1>De {log?.Avail[0]}</h1>
            <h1>À {log?.Avail[1]}</h1>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Aminities</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>{log?.Wifi ? <FaWifi /> : ""}</p>
          <p>{log?.Pool ? <MdPool /> : ""}</p>
          <p>{log?.parking ? <LuParkingCircle /> : ""}</p>
          <p>{log?.AnimalSpace ? <FaPaw /> : ""}</p>
          <p>{log?.fireplace ? <GiCampfire /> : ""}</p>
          <p>{log?.climatise ? <MdOutlineSevereCold /> : ""}</p>
          <p>{log?.terrace ? <PiTreeEvergreenFill /> : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ListRoomPage;
