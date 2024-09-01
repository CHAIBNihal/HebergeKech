
import dbConn from "../../../../../Config/dbConnect";
import Comments from "@/Models/Commentaire";
import { NextRequest, NextResponse } from "next/server";
import LogAnnonce from "@/Models/Annonces/ListingLog";
import Activities from "@/Models/Annonces/ListingAct";
import Client from "@/Models/Utilisateurs/user";
dbConn();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'ID de l\'annonce manquant', status: 400 });
    }

    try {
        let annonce;

        // Rechercher l'annonce en tant que logement ou activité
        annonce = await LogAnnonce.findById(id).exec();

        if (!annonce) {
            annonce = await Activities.findById(id).exec();
        }

        if (!annonce) {
            return NextResponse.json({ message: 'Annonce non trouvée', status: 404 });
        }

        // Récupérer les commentaires associés à l'annonce (logement ou activité)
        const comments = await Comments.find({
            $or: [
              { LogId: id }, // Cherche les commentaires associés à un logement
              { actId: id }  // Cherche les commentaires associés à une activité
            ]
          }).populate({
            path: 'clientId',
            model: Client,
            select: 'fullName'
          });
          

        return NextResponse.json({ message: 'Commentaires récupérés avec succès', success: true, status: 200, data: comments });
    } catch (error:any) {
        console.error("Erreur serveur:", error); // Log the error
        return NextResponse.json({ message: 'Erreur serveur', error: error.message, status: 500 });
    }
}

export async function DELETE(req:Request, {params} : {params : {id:string}}){
    try {
        const {id} = params
        console.log("Id Comments ",id)

        if(!id){
            return NextResponse.json({message:"Required ID", status:400})
        }
        const findComment = await Comments.findByIdAndDelete(id);

        if(!findComment){
            return NextResponse.json({message : "Comment with this id is not found ", status : 400})
        }
        return NextResponse.json({message : "Comment deleted ", status : 200, success : true, data : findComment})

    } catch (error : any) {
        return NextResponse.json({message : "failed to delted  ", tatus : 500})
    }
}