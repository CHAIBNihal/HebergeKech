import dbConn from "../../../../../Config/dbConnect";
import Reservation from "@/Models/Resa";
import { NextResponse } from "next/server";
import LogAnnonce from "@/Models/Annonces/ListingLog";
import Activities from "@/Models/Annonces/ListingAct";
dbConn()

export async function GET(req : Request ){
    try {
        const id =  req.url.split("Bookings/")[1].toString()
        console.log("id bokking is ", id)
        
        const Booking = await Reservation.findOne({ _id : id})
        .populate({
            path: 'LogId',
            model: LogAnnonce,
            select: 'title'
          })
        .populate({
            path: 'activityId',
            model: Activities,
            select: 'title'
          })
        ;

        console.log("booking founded with this api", Booking )
        if (!Booking) {
            return NextResponse.json(
                { message: 'Aucune réservation trouvée', success: false },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                message: 'Réservation trouvée avec succès',
                success: true,
                data: {
                    ...Booking.toObject(),
                    nomLog: Booking.LogId ? Booking.LogId.title : null,
                    nomActivity: Booking.activityId ? Booking.activityId.title : null
                }
            },
            { status: 200 }
        );

    } catch (error:any) {
        return NextResponse.json({message:error.error});
    }
}


export async function DELETE(req:Request){
    try {
         // Vérifiez que la méthode est bien DELETE
         if (req.method !== 'DELETE') {
            console.log("Method not allowed");
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
        }

        // Extraire l'id de l'URL
        const id = req.url.split('Bookings/')[1]?.toString();
        if (!id) {
            console.log("ID is required");
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }
        const BookingDeleted = await Reservation.findByIdAndDelete(id);
        if (!BookingDeleted) {
            console.log("No annonce with this ID");
            return NextResponse.json({ message: "No annonce with this ID" }, { status: 404 });
        }

        return NextResponse.json({ message: "Logement deleted successfully" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: "Error in Server", error: error.message }, { status: 500 });

    }
}