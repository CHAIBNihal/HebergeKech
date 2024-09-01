import Admin from "@/Models/Utilisateurs/Admin";
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
        const findAdmin = await Admin.findOne({ email });
        // console.log("admin founded is ", findAdmin);
        if (!findAdmin) {
            return NextResponse.json({ message: "The email required is not valid" }, { status: 400 });
        }

        const validPass = await bcryptjs.compare(password, findAdmin.pass);
        if (!validPass) {
            return NextResponse.json({ message: "The password is not valid" }, { status: 400 });
        }

        // Stocker les identités d'utilisateur en token
        const dataToken = {
            id: findAdmin._id,
            fullName: findAdmin.fullName,
            email: findAdmin.email
        };

        const token = jwt.sign(dataToken, process.env.NEXTAUTH_SECRET!, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token, 
            user: {
              _id: findAdmin._id,
              fullName: findAdmin.fullName,
              email: findAdmin.email, 
              role : findAdmin.role

            }
            
          }, { status: 201 });
          

        response.cookies.set("admin-token", token, { httpOnly: true });
        console.log("Cookie admin-token défini :", response.cookies.get("admin-token"));
        return response;

    } catch (error) {
        return NextResponse.json({ message: "Error at server", error }, { status: 500 });
    }
}

export async function GET(req:Request) {
    const admins = await Admin.find({}).sort({_id: -1});
    let data = JSON.stringify(admins);
    console.log(admins)
    return new Response(data, {status:200})
}