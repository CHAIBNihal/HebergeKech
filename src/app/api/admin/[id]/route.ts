import dbConn from "../../../../../Config/dbConnect";
import Admin from "@/Models/Utilisateurs/Admin";
import { NextRequest, NextResponse } from "next/server";

dbConn()
export async function PUT(req : NextRequest, {params} :  {params :{ id:string}}){
    try {
        const {id} = params
        console.log(id)
        if(!id){
            return NextResponse.json({message : "ID is not required ", success: false, status : 401});
        }

        const ClientFounded = await Admin.findById( id ).exec();
        
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
    const UpdateProfile = await Admin.findByIdAndUpdate(ClientFounded._id, newClient, {new: true } )
    if(!UpdateProfile){
        return NextResponse.json({message : "failed to upadate this profile", success: false, status : 401});
    }
    return NextResponse.json({message : "Updated Successfuly", success: false, status : 200, data : UpdateProfile});
    } catch (error) {
        
    }
}