import dbConn from "../../../../../Config/dbConnect";
import Contact  from "@/Models/Contact";
import  {NextResponse} from "next/server";
dbConn()

export async function DELETE(req:Request, {params} : {params : {id:string}}){
    try {
        const {id} = params
        console.log("Id Comments ",id)

        if(!id){
            return NextResponse.json({message:"Required ID", status:400})
        }
        const msg = await Contact.findByIdAndDelete(id);

        if(!msg){
            return NextResponse.json({message : "Comment with this id is not found ", status : 400})
        }
        return NextResponse.json({message : "Comment deleted ", status : 200, success : true, data : msg})

    } catch (error : any) {
        return NextResponse.json({message : "failed to delted  ", tatus : 500})
    }
}