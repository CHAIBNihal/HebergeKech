import dbConn from "../../../../Config/dbConnect";
import Contact  from "@/Models/Contact";
import  {NextResponse} from "next/server";
dbConn()
export async function POST(req : Request){
    try {
        const reqBody = req.json();
        const {firstName, lastName, email, message} = await  reqBody;
        if(!firstName || !lastName || !email || !message ){
            return NextResponse.json({message : 'Field is required ',  success: false , status : 401})
        }
        const newMessage = await Contact.create(
            {firstName, lastName, email, message }
        )
        if(!newMessage){
            return NextResponse.json({message : 'Failed to create message', success:false, status : 400});
        }
        console.log(newMessage);
        return NextResponse.json({message : "Message send succesfuly ", success :true, status :200  })

    } catch (error:any) {
        return NextResponse.json({message : error.error, success :false, status :500  })
    }
}
export async function GET(){
    try {
        const AllMessage = await Contact.find();
        return NextResponse.json({
            message : 'All message founded', 
            success : true, 
            status : 200, 
            data : AllMessage
        })
    } catch (error:any) {
        return NextResponse.json({message :error.error, success : false, status:500 })
    }
}
