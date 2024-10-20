/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { IListAnn } from '@/Models/Annonces/ListingAct';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

interface AnnInterface {
  id?: string;
}

const ActItem: React.FC<AnnInterface> = ({ id }) => {
  const nbrImg = 5;
  const [Act, setAct] = useState<IListAnn | null>(null);
  const { data } = useSession();
  const clientId = data?.user._id;
  const { id: activityId } = useParams();
  const router = useRouter();
  const email = data?.user.email;
  const fullName = data?.user.fullName;

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    Phone_Number: '',
    totalPrice: 0,
    guestNum: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/Bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, activityId, clientId, email, fullName }),
      });

      if (response.ok) {
        router.push('/SuccesBooking');
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
        const res = await fetch(`/api/activities/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch with this URL!!');
        }

        const result = await res.json();

        if (result.success && result.data) {
          setAct(result.data);
        } else {
          throw new Error('Failed to fetch activity data');
        }
      } catch (error) {
        console.error('Failed to fetch with this API!', error);
      }
    };

    getDataById();
  }, [id]);

  useEffect(() => {
    if (Act) {
      // Calculer le totalPrice en fonctionn de Nbr d'invite et le prix de l'activite 
      const calculatedPrice = formData.guestNum * Act.Price;
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalPrice: calculatedPrice,
      }));
    }
  }, [formData.guestNum, Act]);

  return (
    <div className="container mx-auto px-4 mt-5 mb-5">
      <h1 className="text-2xl font-semibold mt-3 mb-2">{Act?.title}</h1>
      <div className="flex flex-col md:flex-row">
        {/*Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:w-2/3">
          {Act?.img.slice(0, nbrImg).map((i, k) => (
            <div
              key={k}
              className={`relative ${k === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img
                src={`/${i}`}
                alt="act"
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Book here</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  className="mt-1 block w-full border rounded-md p-2"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  className="mt-1 block w-full border rounded-md p-2"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  name="Phone_Number"
                  type="tel"
                  className="mt-1 block w-full border rounded-md p-2"
                  value={formData.Phone_Number}
                  onChange={handleChange}
                />
              </div>
              <div className="bg-red-200 border-red-600 rounded-lg p-4 m-4">
                <label className="block text-sm font-medium text-gray-700">Total Price</label>
                <p className="text-lg font-bold">{formData.totalPrice} MAD</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                <input
                  name="guestNum"
                  type="number"
                  className="mt-1 block w-full border rounded-md p-2"
                  value={formData.guestNum}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md"
              >
                Réserver
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-700">
          <strong>Rate</strong> {Act?.Price} MAD per guest
        </p>
        <strong>Description : </strong>
        <p className="text-gray-600 mt-4">{Act?.desc}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Informations about this Activity</h2>
        <div className="text-gray-700 mt-2 mb-4 flex flex-col justify-between">
          <div>
            <strong>Availability</strong>
            <h1>From {Act?.Avail[0]}</h1>
            <h1>To {Act?.Avail[1]}</h1>
          </div>
          <div>
            <strong>Address</strong>
            <h1>{Act?.Address}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActItem;
