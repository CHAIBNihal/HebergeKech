import dbConn from "../../../../Config/dbConnect";
import Activities from "@/Models/Annonces/ListingAct";
import { message } from "antd";
import { NextResponse } from "next/server";


dbConn();

export async function POST(req:Request){
    try {
          const Act = await req.json()
        console.log("data Received successfuly")


        if(!Act.title || !Act.desc || !Act.Avail || !Act.Price || !Act.img){
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        } 
            const newActivitie  = await Activities.create(Act)
            
            return new Response(JSON.stringify({ newActivitie }), { status: 201 });
    } 
    catch (error:any) {
      

        console.error("Error in Server:", error);
        return new Response(JSON.stringify({ message: "Error in Server", error: error.message }), {
            status: 500,
        });
    }
}


export async function GET(){
    try {
        const Acts = await Activities.find();
        return new Response(JSON.stringify(Acts), {status:201})
    } catch (error:any) {
        return new Response(JSON.stringify({message:"error"}))
    }
}