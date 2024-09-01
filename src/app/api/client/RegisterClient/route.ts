import dbConn from "../../../../../Config/dbConnect";
import { NextResponse } from "next/server";
import Client from "@/Models/Utilisateurs/user";
import bcryptjs from "bcryptjs";

dbConn();

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { 
      fullName, 
      email,
      pass,
      gender,
      phone_number,
      age,
      situation, 
      contry  
    } = reqBody;

    console.log('Received request body:', reqBody);

    if (!fullName || !email || !pass || !gender || !phone_number || !age) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const clientExistByFullName = await Client.findOne({ fullName });
    if (clientExistByFullName) {
      return NextResponse.json(
        { message: "UserName already exists", success: false },
        { status: 401 }
      );
    }

    const clientExistByEmail = await Client.findOne({ email });
    if (clientExistByEmail) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 401 }
      );
    }

    const hashedPass = await bcryptjs.hash(pass, 10);
    const newClient = new Client({
      fullName,
      email,
      pass: hashedPass,
      gender,
      phone_number,
      age,
      situation,
      contry  
    });

    await newClient.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registration successful",
      },
      { status: 201 }
    );
  } catch (error:any) {
    console.error("Erreur lors de la méthode POST:", error);
    return NextResponse.json({ message: `Error: ${error.message}`, success: false, status: 500 });
  }
}


export async function GET() {
    try {
      const clientAccount = await Client.find();
      return NextResponse.json(
        { message: "Admin acoount founded ", data : clientAccount },
        { status: 200 }
      );
    } catch (error) {
      NextResponse.json(
        { message: "Error at serveur, failed to fetch data Admin account " },
        { status: 500 }
      );
    }
  }