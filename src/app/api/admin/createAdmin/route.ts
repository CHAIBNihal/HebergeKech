import { NextRequest, NextResponse } from "next/server";
import dbConn from "../../../../../Config/dbConnect";
import Admin from "@/Models/Utilisateurs/Admin";
import { sendVerificationEmail } from "@/helpers/AuthHelp/mailVerification/sendMailVerification";
import { resend } from "@/helpers/AuthHelp/mail/route";
import bcryptjs from "bcryptjs";

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const host = process.env.HOST;
dbConn();

//Create admin user


const resendApi = resend

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { fullName, email, pass } = reqBody;
console.log(resendApi)
    console.log('Received request body:', reqBody);

    if (!fullName || !email || !pass) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // Chercher si l'utilisateur par leur username et si leur compte est déjà vérifié
    const existingAdminVerifiedByUserName = await Admin.findOne({
      fullName,
      isVerified: true,
    });

    console.log('Existing admin by username:', existingAdminVerifiedByUserName);

    if (existingAdminVerifiedByUserName) {
      return NextResponse.json(
        { message: "UserName already taken", success: false },
        { status: 500 }
      );
    }

    

    // Chercher un admin avec leur email
    const existAdminByEmail = await Admin.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 90000).toString();

    console.log('Existing admin by email:', existAdminByEmail);

    if (existAdminByEmail) {
      if (existAdminByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPass = await bcryptjs.hash(pass, 10);
        existAdminByEmail.pass = hashedPass;
        existAdminByEmail.verifyCode = verifyCode;
        existAdminByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existAdminByEmail.save();

        console.log('Updated existing admin:', existAdminByEmail);
      }
    } else {
      const hashedPass = await bcryptjs.hash(pass, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newAdmin = new Admin({
        fullName,
        email,
        pass: hashedPass,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });

      await newAdmin.save();

      console.log('Created new admin:', newAdmin);

      const emailRes = await sendVerificationEmail(fullName, email, verifyCode);
      if (!emailRes) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to send email",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: "User registration successful, please verify your email",
        },
        { status: 201 }
      );
    }
   
  } catch (error: any) {
    console.error('Error creating admin account:', error);
    return NextResponse.json(
      { message: "Failed to create an admin account" },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const AdminAccount = await Admin.find();
    return NextResponse.json(
      { message: "Admin acoount founded ", AdminAccount },
      { status: 200 }
    );
  } catch (error) {
  return  NextResponse.json(
      { message: "Error at serveur, failed to fetch data Admin account " },
      { status: 500 }
    );
  }
}
