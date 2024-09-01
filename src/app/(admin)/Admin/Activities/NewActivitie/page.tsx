/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import style from "@/app/Components/admin/annonce/NewAdv.module.css";
import axios from "axios";
import CustomFileSelector from "@/app/Components/Images/CustomFileSelector";
import classNames from "classnames";
import ImagePreview from "@/app/Components/Images/ImagePreview";

const AdForm = () => {
  const [availStart, setAvailStart] = useState<string>("");
  const [availEnd, setAvailEnd] = useState<string>("");
  const [img, setImg] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [FormLocation, setFormLocation] = useState({
    title: "",
    desc: "",
    avail: [availStart, availEnd],
    price: 0,
    Address: "",
    img: [] as string[],
  });

  const handleChangeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);
      setImg(_files);
      console.log(_files);
    }
  };

  const router = useRouter();

  const HandleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    const ActAnn = {
      ...FormLocation,
      title: FormLocation.title,
      desc: FormLocation.desc,
      img: [],  
      Address: FormLocation.Address,
      Avail: FormLocation.avail,
      Price: FormLocation.price,
    };
  
    try {
      // Upload des images
      const formData = new FormData();
      img.forEach((file) => formData.append("files", file));
  
      const uploadResponse = await axios.post("/api/upload", formData);
      const uploadedPaths = uploadResponse.data.paths; 
  
      // Mise à jour des chemins d'images dans l'objet ActAnn
      ActAnn.img = uploadedPaths;
  
      // Envoi de l'objet ActAnn avec les chemins d'images à la base de données
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ActAnn),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log("Data created successfully", data);
        router.push("/Admin/Activities/NewActivitie");
      } else {
        const errorData = await res.json();
        console.log("Data Not Created", errorData.message);
      }
    } catch (error: any) {
      console.error("Error at Data Creation", error);
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

        <label className="mb-2">Add Some photos of Activity </label>

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

        <label>Address</label>
        <input
          type="text"
          name="Address"
          value={FormLocation.Address}
          onChange={handleChangeForm}
        />

        <label>
          Available
          <input
            className="p-3 rounded-lg m-3 text-black"
            type="date"
            name="availStart"
            placeholder="Start Date"
            value={availStart}
            onChange={handleDateChange}
          />
          <input
            className="p-3 rounded-lg m-3 text-black"
            type="date"
            name="availEnd"
            placeholder="End Date"
            value={availEnd}
            onChange={handleDateChange}
          />
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

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default AdForm;
