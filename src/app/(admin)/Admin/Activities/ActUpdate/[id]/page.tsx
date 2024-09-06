/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import style from "@/app/Components/admin/UpdateForm/ActUpdate.module.css";
import axios from "axios";
import CustomFileSelector from "@/app/Components/Images/CustomFileSelector";
import classNames from "classnames";
import ImagePreview from "@/app/Components/Images/ImagePreview";
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
const UpdateActivitie = () => {

const {id} = useParams()
    console.log("id is [", id, "]")
    const [availStart, setAvailStart] = useState<string>("");
    const [availEnd, setAvailEnd] = useState<string>("");
    const [img, setImg] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const [formData, setFormData] = useState({
      title: "",
      desc: "",
      avail: [availStart, availEnd],
      price: 0,
      Address: "",
      img: [] as string[],
    });

    //handler
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

    // Récupérer les données de l'annonce lorsque le composant se monte
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/activities/${id}`);
              
                 
                const data = await response.json();
                // console.log("Data is :",data.data.img) // Sa donne l'annonce 
                setFormData({
                    title: data.data.title,
                    desc: data.data.desc,
                    avail : [data.data.Avail[0], data.data.Avail[1]],
                    price: data.data.Price,
                    Address : data.data.Address,
                    img: data.data.img,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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
    
    console.log(img)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ActUpdate = {
          title: formData.title,
          desc: formData.desc,
          Avail: [formData.avail[0], formData.avail[1]],
          Address : formData.Address,
          Price: formData.price,
          img : []
        }

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
          ActUpdate.img = uploadedPaths;
            const response = await fetch(`http://localhost:3000/api/activities/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ActUpdate),
            });
           

            const result = await response.json();
            console.log("Résultat de la mise à jour :", result);
            console.log("Success : ",result.success)
            if (result.success) {

                // Réinitialiser le formulaire ou afficher un message de succès
                setFormData(result);
                router.push(`/Admin/Activities/${id}`)
            } else {
                // Gérer les erreurs
                console.error("Erreur lors de la mise à jour :", result.message);
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    };

    return (
      <div className={style.adForm}>
        <h1>Edit your activitie </h1>
        <form onSubmit={handleSubmit}>
          <label>Title :</label>
          <input
            placeholder="Titre de l'annonce"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description :</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows={4}
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
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

          <label>Prix :</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Prix en dirhams"
            required
          />

          <div className="flex justify-between">
            <CustomFileSelector
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileSelected}
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

          <button type="submit">Modifier</button>
        </form>
      </div>
    );
};

export default UpdateActivitie;
