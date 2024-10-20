"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IResa } from '@/Models/Resa';
import style from "@/app/Components/admin/Resa/singleResa/singlresa.module.css";
import jsPDF from 'jspdf';

// Chaîne Base64 de l'image (remplacez par votre propre Base64 après conversion)
const logoBase64 = 'data:image/jpeg;base64,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'; // Remplacez ici avec votre chaîne Base64

const title = [
    { name: "Title Announcement" },
    { name: "Start Date" },
    { name: "End Date" },
    { name: "Client Name" },
    { name: "Guest Number" },
    { name: "Total Price" },
];

const SingleReservation = () => {
    const [data, setData] = useState<IResa | null>(null);
    const { id } = useParams();
    const router = useRouter();
    
    const handleValidate = () => {
        router.push("/Admin/Reservation");
    };

    const handleDelete = async(id: any) => {
        try {
            const res = await fetch(`/api/Bookings/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                console.log("Reservation deleted.");
                router.push("/Admin/Reservation");
            } else {
                console.error("Error deleting reservation.");
            }
        } catch (error) {
            console.error("Failed to delete reservation.", error);
        }
    };

    useEffect(() => {
        const getDataAct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/Bookings/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch with this URL!");
                }
                const result = await res.json();
                console.log("Result Resa detail", result);
                if (result.success && result.data) {
                    setData(result.data);
                } else {
                    throw new Error("Failed to fetch reservation data");
                }
            } catch (error) {
                console.error("Failed to fetch with this API!", error);
            }
        };

        getDataAct();
    }, [id]);

    if (!data) {
        return <p>Loading...</p>;
    }

    const titleToDisplay = data.activityId ? data.activityId.title : data.LogId?.title || 'Unknown';

    const exportodf = () => {
        const doc = new jsPDF();
    
        // Dimensions et positionnement de l'image
        const imgWidth = 80; // Largeur ajustée
        const imgHeight = (imgWidth / 448) * 339; // Garder les proportions
        const pageWidth = doc.internal.pageSize.getWidth(); // Largeur de la page PDF
        const xOffset = (pageWidth - imgWidth) / 2; // Centrer horizontalement
    
        // Ajouter l'image
        doc.addImage(logoBase64, "PNG", xOffset, 10, imgWidth, imgHeight);
    
        // Ajouter le titre "LUXE LIVING ESTATES"
        const marginBottom = 10;
        const yPosition = imgHeight + 30; // Position verticale avec marge supplémentaire
    
        doc.setFontSize(18); // Augmenter la taille de la police
        doc.setFont("bold");
        doc.setTextColor(0, 0, 0); // Couleur du texte (noir)
        doc.text("LUXE LIVING ESTATES", pageWidth / 2, yPosition, { align: "center" });
    
        // Section des informations de réservation
        doc.setFillColor(192, 192, 192); // Couleur de fond (gris clair)
        doc.rect(0, imgHeight + 40, pageWidth, 20, "F"); // Rectangle de fond sous le titre
    
        // Titre de la section
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); // Couleur du texte
        doc.text("Booking Confirmation", pageWidth / 2, imgHeight + 55, { align: "center" });
    
        // Style pour la section des infos et création du tableau
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Texte noir
        doc.setFillColor(220, 240, 255); // Fond bleu clair
        doc.rect(10, imgHeight + 70, pageWidth - 20, 60, "F"); // Ajouter un fond coloré
    
        // Position du tableau
        const startX = 15;
        let startY = imgHeight + 80;
    
        if (data) {
            // Informations de réservation
            const reservationInfo = [
                { label: 'Reservation ID', value: data._id },
                { label: 'Full Name', value: data.fullName },
                { label: 'Check-in Date', value: new Date(data.startDate).toLocaleDateString() },
                { label: 'Check-out Date', value: new Date(data.endDate).toLocaleDateString() },
                { label: 'Number of Guests', value: data.guestNum }
            ];
    
            reservationInfo.forEach((item, index) => {
                // Colonne "Label"
                doc.setFont('bold');
                doc.text(`${item.label}:`, startX, startY + (index * 10));
    
                // Colonne "Valeur"
                doc.setFont('normal');
                doc.text(String(item.value), startX + 50, startY + (index * 10));
            });
    
            // Prix total
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont('bold');
            doc.text(`Total Price: ${data.totalPrice} MAD`, startX, startY + 70);
        } else {
            doc.text("No reservation data available.", startX, startY);
        }
    
        // Sauvegarder le fichier PDF
        doc.save('reservation.pdf');
    };
    
    
    

    return (
        <div className={style.container}>
            <div className={style.detailContainer}>
                <div className={style.resaTitle}>
                    <h1>Reservation: {id}</h1>
                </div>
                <div className={style.detail}>
                    <div className={style.title}>
                        {title.map((index) => (
                            <p key={index.name}>{index.name}</p>
                        ))}
                    </div>
                    <div className={style.infos}>
                        <p>{titleToDisplay}</p>
                        <p>{new Date(data.startDate).toLocaleDateString()}</p>
                        <p>{new Date(data.endDate).toLocaleDateString()}</p>
                        <p>{data.fullName}</p>
                        <p>{data.guestNum}</p>
                        <p>{data.totalPrice}</p>
                    </div>
                </div>
            </div>
            <div className={style.buttonContainer}>
                <button onClick={handleValidate} className={style.buttonValidate}>Back</button>
                <button onClick={exportodf} className={style.buttonValidate}>Export to PDF</button>
                <button onClick={() => handleDelete(data?._id)} className={style.buttonDelete}>Delete</button>
            </div>
        </div>
    );
};

export default SingleReservation;
