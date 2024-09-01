import "next-auth"
import { DefaultSession } from "next-auth";
//Pour eviter l'erreur de auth/[...nextauth]/options : ou le token._id = user._id et user._id est pas exist 
declare module 'next-auth'{
    interface User{
        _id?: string,
        isVerified?:boolean 
        fullName?:string
        token?:string
        email?:string;
        role?:string;
        provider?:string
    }
    interface Session {
      user: {
        _id?: string;
        isVerified?: boolean;
        email?:string;
        fullName?: string;
        token?:string
        role?:string;
        provider?:string;
      } & DefaultSession ['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT {
        _id?: string,
        isVerified?:boolean 
        email?:string;
        fullName?:string 
        token?:string
        role?:string;
        provider?:string
    }
}