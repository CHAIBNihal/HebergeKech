import dbConn from "../../../../Config/dbConnect";
import LogAnnonce from "@/Models/Annonces/ListingLog";
// Connecter à la base de données
dbConn();

//create a logement annonce 
export async function POST(req: Request) {
    try {
        const LogItem = await req.json();
        console.log("LogItem received:");

        // Validation basique des données
        if (!LogItem.title || !LogItem.desc || !LogItem.img || !LogItem.Price) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }

        const NewLogAnn = await LogAnnonce.create(LogItem);
        console.log("NewLogAnn created");

        return new Response(JSON.stringify({ NewLogAnn }), { status: 201 });
    } catch (error:any) {
        console.error("Error in Server:", error);
        return new Response(JSON.stringify({ message: "Error in Server", error: error.message }), {
            status: 500,
        });
    }
}
//Get All Logement annonce created 
export async function GET() {
    try {
        const listings = await LogAnnonce.find();
        return new Response(JSON.stringify(listings), { status: 200 });
    } catch (error:any) {
        console.error("Error in GET:", error);
        return new Response(JSON.stringify({ message: "Error in Server", error: error.message }), {
            status: 500,
        });
    }
}




