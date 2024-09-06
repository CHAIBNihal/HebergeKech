import { resend } from "@/helpers/AuthHelp/mail/route";
import {NotionMagicLinkEmail} from "../../../../emails/page"
import { ApiResponse } from "@/app/lib/type";

export async function sendVerificationEmail
(fullName:string, email:string , verifyCode:string):Promise<ApiResponse>
{
try {
    await resend.emails.send({
        from: 'dev@kechheberge.ma',
        to: email,
        subject: "User Verification ",
        react:NotionMagicLinkEmail({fullName, otp:verifyCode})
      });
    return {success:true, message : "Email sent successfuly  "}
} catch (Mailerror) {
    console.error( "Error Sending Verification ", Mailerror)
    return {success:false, message : "Failed to send Email ", 

    }
}
}