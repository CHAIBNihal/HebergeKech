import dbConn from "../../../../Config/dbConnect";
import Comments from "../../../Models/Commentaire";
import { NextRequest, NextResponse } from "next/server";
import LogAnnonce from "@/Models/Annonces/ListingLog";
import Activities from "@/Models/Annonces/ListingAct"
dbConn()

export async function POST(req: NextRequest){
try {
    const reqBody = await req.json();
    const { clientId, LogId, actId, Content } = reqBody;

    //Verifier si le champ text vide 
    if(!Content){
        return NextResponse.json({message:"The Content is required", status:401});
    }
    const newComment = await Comments.create({ clientId, LogId, actId, Content })
    if(!newComment){
        return NextResponse.json({message:"Failed to create Comment", status:400});
    }
    if (LogId) {
        await LogAnnonce.findByIdAndUpdate(
            LogId,
            { $push: { comments: newComment._id } },
            { new: true }
        );
    }

    if (actId) {
        await Activities.findByIdAndUpdate(
            actId,
            { $push: { comments: newComment._id } },
            { new: true }
        );
    }
    return NextResponse.json({message:"Comment created succusfuly ", status:200, data: newComment});
    
} catch (error) {
    return NextResponse.json({message:"Error at Serveur ", status:500});
}
}



