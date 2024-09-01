/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import style from '@/app/Components/admin/annonce/NewAdv.module.css';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { IoIosImages } from 'react-icons/io';
import { BiTrash } from 'react-icons/bi';
import axios from "axios";
import CustomFileSelector from "@/app/Components/Images/CustomFileSelector";
import classNames from "classnames";
import ImagePreview from "@/app/Components/Images/ImagePreview";

const AdForm = () => {
  const [availStart, setAvailStart] = useState<string>("");
  const [availEnd, setAvailEnd] = useState<string>("");

  const [FormLocation, setFormLocation] = useState({
    title: "",
    desc: "",
    avail: [availStart, availEnd],
    price: 0,
    wifi: false,
    pool: false,
    animalSpace: false,
    fireplace: false,
    parking: false,
    terrace: false,
    airConditioned: false,
    img: [] as string[], // Ajoutez cette ligne pour inclure les photos
    bathrooms:0,
    rooms:0,
    guests:0
  });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormLocation({ ...FormLocation, [name]: value });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "availStart") {
      setAvailStart(value);
      setFormLocation({ ...FormLocation, avail: [value, availEnd] });
    } else if (name === "availEnd") {
      setAvailEnd(value);
      setFormLocation({ ...FormLocation, avail: [availStart, value] });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormLocation({ ...FormLocation, [name]: checked });
  };

  const [img, setImg] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);
      setImg(_files);
      console.log(_files);
    }
  };

  const router = useRouter();

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const LogItem = {
      ...FormLocation,
      title: FormLocation.title,
      desc: FormLocation.desc,
      img: [],
      RoomsNumber: Number(FormLocation.rooms),
      bathRoomsNum: Number(FormLocation.bathrooms),
      guestNumber: Number(FormLocation.guests),
      Avail: FormLocation.avail,
      Wifi: Boolean(FormLocation.wifi),
      Pool: Boolean(FormLocation.pool),
      AnimalSpace: Boolean(FormLocation.animalSpace),
      fireplace: Boolean(FormLocation.fireplace),
      Price: Number(FormLocation.price),
      parking: Boolean(FormLocation.parking),
      climatise: Boolean(FormLocation.airConditioned)
    };



    try {

      const formData = new FormData();
      img.forEach((file) => formData.append("files", file));
  
      const uploadResponse = await axios.post("/api/upload", formData);
      const uploadedPaths = uploadResponse.data.paths; 
  
      // Mise à jour des chemins d'images dans l'objet ActAnn
      LogItem.img = uploadedPaths;




      const res = await fetch("/api/Logement/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(LogItem)
      });

      if (res.ok) {
        const data = await res.json();
        console.log("data created successfully", data);
        router.push('/Admin/Dashboard');
      } else {
        const errorData = await res.json();
        console.log("Data Not Created", errorData.message);
      }
    } catch (error: any) {
      console.error("Error at Data Creation ", error);
    }
  };
console.log(FormLocation.img)
  return (
    <div className={style.adForm}>
      <h1>New Logement Announcement</h1>
      <form onSubmit={HandleSubmit}>
        <label>Announcement Title</label>
        <input
          placeholder="Announcement title"
          type="text"
          name="title"
          value={FormLocation.title}
          onChange={handleChangeForm}
          required
        />

        <label>Description:</label>
        <textarea
          name="desc"
          rows={6}
          value={FormLocation.desc}
          onChange={handleChangeForm}
          required
        />

        <label className="mb-2">Add Some photos of your place</label>
        <div className="flex justify-between">
          <CustomFileSelector
            name="img"
            accept="image/*"
            onChange={handleFileSelected}
            value={FormLocation.img}
          />
          <button
            type="submit"
            className={classNames({
              "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md":
                true,
              "disabled pointer-events-none opacity-40": uploading,
            })}
            disabled={uploading}
          >
            Upload
          </button>
        </div>

       
        <ImagePreview img={img} />

        <label>Number of Rooms</label>
        <input type="number" name="rooms" value={FormLocation.rooms} onChange={handleChangeForm} />

        <label>Number of Bathrooms</label>
        <input type="number" name="bathrooms" value={FormLocation.bathrooms} onChange={handleChangeForm} />

        <label>Maximum number of guests</label>
        <input type="number" name="guests" value={FormLocation.guests} onChange={handleChangeForm} />

        <label>
          Available
          <input className="p-3 rounded-lg m-3 text-black" type="date" name="availStart" placeholder="Start Date" value={availStart} onChange={handleDateChange} />
          <input className="p-3 rounded-lg m-3 text-black" type="date" name="availEnd" placeholder="End Date" value={availEnd} onChange={handleDateChange} />
        </label>

        <label>Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Price in dirhams"
          value={FormLocation.price}
          onChange={handleChangeForm}
          required
        />

        <div className="mt-4 p-2 flex flex-col">
          <label>Wifi</label>
          <input type="checkbox" name="wifi" checked={FormLocation.wifi} onChange={handleCheckboxChange} />
          <label>Pool</label>
          <input type="checkbox" name="pool" checked={FormLocation.pool} onChange={handleCheckboxChange} />
          <label>Animal Space</label>
          <input type="checkbox" name="animalSpace" checked={FormLocation.animalSpace} onChange={handleCheckboxChange} />
          <label>Fireplace</label>
          <input type="checkbox" name="fireplace" checked={FormLocation.fireplace} onChange={handleCheckboxChange} />
          <label>Parking</label>
          <input type="checkbox" name="parking" checked={FormLocation.parking} onChange={handleCheckboxChange} />
          <label>Terrace</label>
          <input type="checkbox" name="terrace" checked={FormLocation.terrace} onChange={handleCheckboxChange} />
          <label>Air-Conditioned</label>
          <input type="checkbox" name="airConditioned" checked={FormLocation.airConditioned} onChange={handleCheckboxChange} />
        </div>

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default AdForm;
