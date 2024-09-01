import dbConn from "../../../../../Config/dbConnect";
import Activities from "@/Models/Annonces/ListingAct";
import { NextResponse } from "next/server";
dbConn()

export async function GET(req:Request){
    try {
        const id = req.url.split('activities/')[1].toString()
        console.log( " Id required: ",id)
        const ActById = await Activities.findOne({_id : id});
        return NextResponse.json({message:'Activities founded', success:true, data: ActById, status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.error, success:false, status:500})
    }
}

export async function PUT(req: Request) {
    try {
        if (req.method !== 'PUT') {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
        }

        const id = req.url.split('activities/')[1];
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 405 });
        }

        const idAct = await Activities.findOne({ _id: id });

        if (!idAct) {
            return NextResponse.json({ message: "Activity with this ID not found" }, { status: 400 });
        }

        let Actreq;
        try {
            Actreq = await req.json(); 
            console.log(Actreq)
        } catch (error) {
            return NextResponse.json({ message: "Invalid JSON Input" }, { status: 405 });
        }

        if (!Actreq) {
            return NextResponse.json({ message: "The body request is required" }, { status: 405 });
        }

        const ActFounded = await Activities.findByIdAndUpdate(idAct._id, Actreq, { new: true });
        if (!ActFounded) {
            return NextResponse.json({ message: "Activity not found, please verify your ID" }, { status: 401 });
        }
console.log(ActFounded)
        return NextResponse.json({ message: "Activity updated successfully", status: 200, success: true, data: ActFounded });

    } catch (error:any) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
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
        const id = req.url.split('activities/')[1]?.toString();
        if (!id) {
            console.log("ID is required");
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        // Chercher et supprimer le logement par ID
        const deletedAct = await Activities.findByIdAndDelete(id);
        if (!deletedAct) {
            console.log("No annonce with this ID");
            return NextResponse.json({ message: "No annonce with this ID" }, { status: 404 });
        }

        console.log("Delete successful", deletedAct);
        return NextResponse.json({ message: "Logement deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.log("Error in Server", error.message);
        return NextResponse.json({ message: "Error in Server", error: error.message }, { status: 500 });
    }
}