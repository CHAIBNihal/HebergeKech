import LogAnnonce from "@/Models/Annonces/ListingLog"
import dbConn from "../../../../../Config/dbConnect";
import { NextResponse } from "next/server";
dbConn()

export async function GET(req : Request ){
    try {
        const id = req.url.split('Logement/')[1].toString()
        console.log(id)


        const LogOne = await LogAnnonce.findOne({_id : id}); 
        // console.log(LogOne);
   
      return   NextResponse.json({message:'Logement founded ', status:200, success:true, data : LogOne});

    } catch (error : any) {
        return NextResponse.json({message: 'failed to fond this user '}, error )
    }
}


export async function PUT(req: Request) {
    try {
        // Vérifiez que la méthode est bien PUT
        if (req.method !== 'PUT') {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
        }

        // Extraire l'id de l'URL
        const id = req.url.split('Logement/')[1]?.toString();
        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        // Chercher le logement par ID
        const idLogement = await LogAnnonce.findOne({ _id: id });
        if (!idLogement) {
            return NextResponse.json({ message: "No annonce with this ID" }, { status: 404 });
        }

        // Lire le corps de la requête
        let LogItem;
        try {
            LogItem = await req.json();
        } catch (error) {
            return NextResponse.json({ message: "Invalid JSON input" }, { status: 400 });
        }

        if (!LogItem) {
            return NextResponse.json({ message: "No data to send" }, { status: 400 });
        }

        // Mettre à jour le logement
        const updatedLogAnn = await LogAnnonce.findByIdAndUpdate(idLogement._id, LogItem, { new: true });
        if (!updatedLogAnn) {
            return NextResponse.json({ message: "Log not found" }, { status: 404 });
        }

        return NextResponse.json({message : "Founded successfuly ", success:true, data : updatedLogAnn},{status:200}  );
    } catch (error: any) {
        return NextResponse.json({ message: "Error in Server", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        // Vérifiez que la méthode est bien DELETE
        if (req.method !== 'DELETE') {
            console.log("Method not allowed");
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
        }

        // Extraire l'id de l'URL
        const id = req.url.split('Logement/')[1]?.toString();
        if (!id) {
            console.log("ID is required");
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        // Chercher et supprimer le logement par ID
        const deletedLogAnn = await LogAnnonce.findByIdAndDelete(id);
        if (!deletedLogAnn) {
            console.log("No annonce with this ID");
            return NextResponse.json({ message: "No annonce with this ID" }, { status: 404 });
        }

        console.log("Delete successful", deletedLogAnn);
        return NextResponse.json({ message: "Logement deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.log("Error in Server", error.message);
        return NextResponse.json({ message: "Error in Server", error: error.message }, { status: 500 });
    }
}



