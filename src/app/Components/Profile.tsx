"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IUsers } from '@/Models/Utilisateurs/user';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Profile = () => {
    const { data } = useSession();
    const [user, setUser] = useState<IUsers[]>([]);
    const [showForm, setShowForm] = useState(false); // État pour afficher ou masquer le formulaire
    const [formData, setFormData] = useState<any>({}); // État pour gérer les données du formulaire

    const userId = data?.user._id;
    const UserName = data?.user.fullName;
    const email = data?.user.email;
    const router = useRouter();

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/client/RegisterClient');
            if (!response.ok) {
                throw new Error('Fetch data failed');
            }

            const res = await response.json();
            const data = res.data;

            if (!Array.isArray(data)) {
                throw new Error('Fetched data is not an array');
            }

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const allUsers = await getData();
            if (allUsers) {
                const userById = allUsers.filter(u => u._id == userId);
                setUser(userById);

                // Pré-remplir le formulaire avec les données de l'utilisateur
                if (userById.length > 0) {
                    setFormData(userById[0]);
                }
            }
        }
        fetchUser();
    }, [userId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`api/client/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update information');
            }

            const res = await response.json();
            console.log('Update successful:', res);
            setShowForm(false); // Masquer le formulaire après mise à jour
        } catch (error) {
            console.error('Error updating information:', error);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex mt-3">
            {/** Menu */}
            <div className="w-1/4 bg-white shadow-md rounded-lg p-4 mr-6">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <button className="mb-2 p-3 cursor-pointer text-gray-700 hover:bg-gray-500 rounded-lg"
                    onClick={() => router.push('/profile')}>
                    Profile
                </button> <br />
                <button className="mb-2 p-3 cursor-pointer text-gray-700 hover:bg-gray-500 rounded-lg"
                    onClick={() => router.push('/BookingHistory')}>
                    Bookings History
                </button> <br />

                <button className="mb-2 p-3 cursor-pointer text-gray-700 hover:bg-gray-500 rounded-lg" >
                    <a href="/api/auth/signout" onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}>
                        Sign Out
                    </a>
                </button>
            </div>

            {/** Contenu principal */}
            <div className="w-3/4 bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Welcome, {UserName}
                </h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <p className="mb-4 text-gray-700">Email: <span className="font-medium">{email}</span></p>
                    {user.map((u, k) => (
                        <div key={k} className="border-t border-gray-200 pt-4 mt-4">
                            <p className="text-gray-700">Phone Number: <span className="font-medium">{u.phone_number}</span></p>
                            <p className="text-gray-700">Gender: <span className="font-medium">{u.gender}</span></p>
                            <p className="text-gray-700">Situation: <span className="font-medium">{u.situation}</span></p>
                            <p className="text-gray-700">Age: <span className="font-medium">{u.age}</span></p>
                            <p className="text-gray-700">Country: <span className="font-medium">{u.contry}</span></p>
                            <button
                                className="p-2 mt-5 font-bold text-xl text-black bg-second hover:bg-transparent rounded-lg"
                                onClick={() => setShowForm(!showForm)} // Toggle formulaire
                            >
                                Update Information
                            </button>
                        </div>
                    ))}

                    {showForm && (
                        <form className="mt-6" onSubmit={handleFormSubmit}>
                            <h3 className="text-2xl mb-4">Update Your Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={formData.phone_number || ''}
                                        onChange={handleInputChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-700">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender || ''}
                                        onChange={handleInputChange}
                                        className="w-full border p-2 rounded"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-700">Situation</label>
                                    <input
                                        type="text"
                                        name="situation"
                                        value={formData.situation || ''}
                                        onChange={handleInputChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-700">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age || ''}
                                        onChange={handleInputChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        name="contry"
                                        value={formData.contry || ''}
                                        onChange={handleInputChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="mt-6 p-2 bg-blue-600 text-white rounded-lg">
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
