/* eslint-disable react/jsx-key */
"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import style from '@/app/Components/admin/annonce/NewAdv.module.css';
import { IListLog } from '@/Models/Annonces/ListingLog';
import { useParams } from 'next/navigation';
import axios from "axios";
import CustomFileSelector from "@/app/Components/Images/CustomFileSelector";
import classNames from "classnames";
import ImagePreview from "@/app/Components/Images/ImagePreview";

import Image from 'next/image';

const nbrRooms =[
    {id:1, name:"select a number of rooms "},
    { id: 2, name: "1 Room" },
    { id: 3, name: "2 Rooms" },
    { id: 4, name: "3 Rooms" },
    { id: 5, name: "4 Rooms" },
]



const UpdateAdv = () => {
  //Constantes 
  const {id} = useParams();
  console.log("[",id, "]")
  const [availStart, setAvailStart] = useState<string>("");
  const [availEnd, setAvailEnd] = useState<string>("");
  const [img, setImg] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    avail: [availStart, availEnd],
    Price: 0,
    wifi: false,
    pool: false,
    animalSpace: false,
    fireplace: false,
    parking: false,
    terrace: false,
    climatise: false,
    img: [] as string[], // Ajoutez cette ligne pour inclure les photos
    bathrooms:0,
    guestNumber:0,
    RoomsNumber:0,
  });
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "availStart") {
      setAvailStart(value);
      setFormData({ ...formData, avail: [value, availEnd] });
    } else if (name === "availEnd") {
      setAvailEnd(value);
      setFormData({ ...formData, avail: [availStart, value] });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);
      setImg(_files);
      console.log(_files);
    }
  };
 
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/Logement/${id}`);
          
             
            const data = await response.json();
            console.log("Data is :" , data.data) // Sa donne l'annonce 
            setFormData({
              title: data.data.title,
              desc: data.data.desc,
              avail: [data.data.Avail[0], data.data.Avail[0]],
              Price: data.data.Price,
              wifi: data.data.Wifi,
              pool: data.data.Pool,
              animalSpace: data.data.AnimalSpace,
              fireplace: data.data.fireplace,
              parking: data.data.parking,
              terrace: data.data.terrace,
              climatise: data.data.climatise,
              img: data.data.img, 
              bathrooms:data.data.bathRoomsNum,
              guestNumber:data.data.guestNumber,
              RoomsNumber:data.data.RoomsNumber,
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    fetchData();
}, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const LogItem = {
      ...formData,
      title: formData.title,
      desc: formData.desc,
      img: [],
      RoomsNumber: Number(formData.RoomsNumber),
      bathRoomsNum: Number(formData.bathrooms),
      guestNumber: Number(formData.guestNumber),
      Avail: formData.avail,
      Wifi: Boolean(formData.wifi),
      Pool: Boolean(formData.pool),
      AnimalSpace: Boolean(formData.animalSpace),
      fireplace: Boolean(formData.fireplace),
      Price: Number(formData.Price),
      parking: Boolean(formData.parking),
      climatise: Boolean(formData.climatise)
    };
    try {
      const data = new FormData();
          img.forEach((file) => data.append("files", file));
      
          const uploadResponse = await axios.post("/api/upload", data, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Assurez-vous que le Content-Type est correct
            },
        });
          const uploadedPaths = uploadResponse.data.paths; 
      
          // Mise à jour des chemins d'images dans l'objet ActAnn
          LogItem.img = uploadedPaths;
          const response = await fetch(`http://localhost:3000/api/Logement/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(LogItem),
        });
        const result = await response.json();
        console.log("Résultat de la mise à jour :", result);
        console.log("Success : ",result.success)
        if (result.success) {

            // Réinitialiser le formulaire ou afficher un message de succès
            setFormData(result);
            console.log(formData)
        } else {
            // Gérer les erreurs
            console.error("Erreur lors de la mise à jour :", result.message);
        }
    } catch (error) {
      
    }
    
   
  };

 

  return (
    <div className={style.adForm}>
      <h1>Update Your Logement Annoucement </h1>
      <form onSubmit={handleSubmit}>
        <label>Annoucement Title</label>
        <input
          placeholder="Annoucement title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          rows={4}
          required
        />
       {/**Availibilite date :  */}
        <label>
          Available
          <input
            className="p-3 rounded-lg m-3 text-black"
            type="date"
            name="availStart"
            placeholder="Start Date"
            value={formData.avail[0]}
            onChange={handleDateChange}
          />
          <input
            className="p-3 rounded-lg m-3 text-black"
            type="date"
            name="availEnd"
            placeholder="End Date"
            value={formData.avail[0]}

            onChange={handleDateChange}
          />
        </label>

        <label>Rooms Number : </label>
        <select
          name="RoomsNumber"
          value={formData.RoomsNumber}
          onChange={handleChange}
          required
        >
          {nbrRooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <label>Number of Bathrooms</label>
        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />

        <label>Maximum number of guests</label>
        <input type="number" name="guestNumber" value={formData.guestNumber} onChange={handleChange} />

        <label>Price:</label>
        <input
          type="number"
          name="Price"
          value={formData.Price}
          onChange={handleChange}
          placeholder="Price in dirhams"
          required
        />

        <div className="flex justify-between">
          <CustomFileSelector
            type="file"
            name="img"
            accept="image/*"
            
            onChange={handleFileSelected}
          />
         
        </div>
        {formData.img &&
          formData.img.map((i, k) => (
            <div className="grid grid-cols-12 gap-2 my-2">
              <div className="relative aspect-video col-span-4">
                <Image
                  src={`/${i}`}
                  alt="img recupreted"
                  key={k}
                  height={500}
                  width={200}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        <ImagePreview img={img} />

        <div className="mt-4 p-2 flex flex-col">
          <label>Wifi</label>
          <input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleCheckboxChange} />
          <label>Pool</label>
          <input type="checkbox" name="pool" checked={formData.pool} onChange={handleCheckboxChange} />
          <label>Animal Space</label>
          <input type="checkbox" name="animalSpace" checked={formData.animalSpace} onChange={handleCheckboxChange} />
          <label>Fireplace</label>
          <input type="checkbox" name="fireplace" checked={formData.fireplace} onChange={handleCheckboxChange} />
          <label>Parking</label>
          <input type="checkbox" name="parking" checked={formData.parking} onChange={handleCheckboxChange} />
          <label>Terrace</label>
          <input type="checkbox" name="terrace" checked={formData.terrace} onChange={handleCheckboxChange} />
          <label>Air-Conditioned</label>
         <input type="checkbox" name="airConditioned" checked={formData.climatise} onChange={handleCheckboxChange} />
        </div>

        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default UpdateAdv;
