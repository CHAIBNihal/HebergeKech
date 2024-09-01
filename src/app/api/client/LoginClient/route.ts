import Client from "@/Models/Utilisateurs/user";
import dbConn from "../../../../../Config/dbConnect";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

dbConn()


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Chercher si l'utilisateur possède un compte pour se connecter
        const findClient = await Client.findOne({ email });
        // console.log("admin founded is ", findAdmin);
        if (!findClient) {
            return NextResponse.json({ message: "The email required is not valid" }, { status: 400 });
        }

        const validPass = await bcryptjs.compare(password, findClient.pass);
        if (!validPass) {
            return NextResponse.json({ message: "The password is not valid" }, { status: 400 });
        }

        // Stocker les identités d'utilisateur en token
        const dataToken = {
            id: findClient._id,
            fullName: findClient.fullName,
            email: findClient.email
        };

        const token = jwt.sign(dataToken, process.env.NEXTAUTH_SECRET!, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token, 
            user: {
              _id: findClient._id,
              fullName: findClient.fullName,
              email: findClient.email
            }
          }, { status: 201 });

        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (error) {
        return NextResponse.json({ message: "Error at server", error }, { status: 500 });
    }
}

export async function GET() {
    const clients = await Client.find({}).sort({_id: -1});
    let data = JSON.stringify(clients);
    console.log(clients)
    return new Response(data, {status:200})
}



