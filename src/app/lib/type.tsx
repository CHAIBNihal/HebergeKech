export  type Room =  {
    id:number,
    name: string,
    sleeps: number,
    bedrooms: number,
    baths: number,
    image: string,
    amenities: string[]
}


export type User = {
    id:number,
    name: string,
    email:string,
    phoneNumber:string,
    created_At:string,
    gender:string,
    age:string,
    FamilySituation:string,
    country:string;
}

export type Resa ={
    id:number,
    AnnoncTitle : string,
    Arrival : string,
    DateEnd : string,
    UserAccount : string,
    GusetNumber:number,
    TotalPrice:number

}
export type Act= {
    id:number,
    img : string,
    ActTitle : string,
    Desc : string,
    Disponible : string,
    Adress: string,
    created_At:string,
    Updated_At:string
    Price:number
}

export type Adver ={
    id:number,
    img : string,
    LogTitle : string,
    Desc : string,
    Disponible : string,
    Adress: string,
    created_At:string,
    Updated_At:string
    Price:number
}
import { IMessage } from "@/Models/Utilisateurs/Message";
export interface ApiResponse {
    success : boolean;
    message : string;
   
}
