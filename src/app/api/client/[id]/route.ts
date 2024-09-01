import dbConn from "../../../../../Config/dbConnect";
import Client from "@/Models/Utilisateurs/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Utilisé pour récupérer le token



export async function DELETE(req:Request){
    try {
        if (req.method !== 'DELETE') {
            console.log("Method not allowed");
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
        }

        // Extraire l'id de l'URL
        const id = req.url.split('client/')[1]?.toString();
        if (!id) {
            console.log("ID is required");
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        const clientDel = await Client.findByIdAndDelete(id);
        if (!clientDel) {
            console.log("No annonce with this ID");
            return NextResponse.json({ message: "No annonce with this ID" }, { status: 404 });
        }

        console.log("Delete successful", clientDel);
        return NextResponse.json({ message: "Logement deleted successfully" }, { status: 200 });
    } catch (error) {
        
    }
}

export async function GET(req : Request ){
    try {
        const id = req.url.split('client/')[1].toString()
        console.log('id', id)
        const OneClient = await Client.findOne({_id : id});
        console.log(OneClient) 
        // console.log(LogOne);
   
      return   NextResponse.json({message:'Logement founded ', status:200, success:true, data : OneClient});

    } catch (error : any) {
        return NextResponse.json({message: 'failed to fond this user '}, error )
    }
}

export async function PUT(req : NextRequest, {params} :  {params :{ id:string}}){
    try {
        const {id} = params
        console.log(id)
        if(!id){
            return NextResponse.json({message : "ID is not required ", success: false, status : 401});
        }

        const ClientFounded = await Client.findById( id ).exec();
        
    console.log("Client Founded is ",ClientFounded);
    if(!ClientFounded){
        return NextResponse.json({message : "Client by this id  is not founded ", success: false, status : 401});
    }
    let newClient;
        try {
            newClient = await req.json();
        } catch (error) {
            return NextResponse.json({ message: "Invalid JSON input" }, { status: 400 });
        }
        if(!newClient){
            return NextResponse.json({message : "No Infos to updated  ", success: false, status : 401});
        }
    const UpdateProfile = await Client.findByIdAndUpdate(ClientFounded._id, newClient, {new: true } )
    if(!UpdateProfile){
        return NextResponse.json({message : "failed to upadate this profile", success: false, status : 401});
    }
    return NextResponse.json({message : "Updated Successfuly", success: false, status : 200, data : UpdateProfile});
    } catch (error) {
        
    }
}