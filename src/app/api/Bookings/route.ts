import Reservation from "@/Models/Resa";
import dbConn from "../../../../Config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
 

dbConn(); 

export async function POST(req: NextRequest) {
    try {
       

        const reqBody = await req.json();
        const { LogId, activityId,clientId, email, fullName, startDate , endDate,Phone_Number, totalPrice, guestNum } = reqBody;

        // Vérifier si les champs obligatoires sont remplis
        if (!startDate || !guestNum) {
            return NextResponse.json({ message: "Les champs obligatoires ne sont pas remplis" }, { status: 400 });
        }

        


        const newBooking = await Reservation.create({
            LogId,
            activityId,
            clientId,
            email, 
            fullName,
            startDate,
            endDate,
            Phone_Number,
            totalPrice,
            guestNum
        });

        return NextResponse.json({ message: "Réservation créée avec succès", data: newBooking }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}



// Get All Booking 
export async function GET(){
    try {
        const Bookings = await Reservation.find()
        
        return NextResponse.json(
            { message: "Booking   founded ", data :  Bookings },
            { status: 200 }
          );
        
    } catch (error: any) {
        return NextResponse.json({message : error.error}, {status : 500})
    }
}


