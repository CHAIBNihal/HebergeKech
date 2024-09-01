import mongoose, { Document, Schema } from "mongoose";
import { IListAnn } from "./Annonces/ListingAct";
import { IListLog } from "./Annonces/ListingLog";
import { IUsers } from "./Utilisateurs/user";

export interface IResa extends Document {
    clientId: IUsers;
    LogId: IListLog;
    activityId: IListAnn;
    startDate: Date;
    email : string;
    fullName: string;
    endDate: Date;
    Phone_Number: string;
    totalPrice: string;
    guestNum: number;
    bookedAt?: Date;
}

const ResaSchema: Schema = new mongoose.Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    LogId: {
        type: Schema.Types.ObjectId,
        ref: "LogAnnonce"
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: "Activities"
    },
    email :{
        type: String
    },
    fullName : {
        type : String
    },
    startDate: {
        type: Date,
        required: true
    },
   
    endDate: {
        type: Date
    },
    Phone_Number: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
       
    },
    guestNum: {
        type: Number,
        required: true
    },
    bookedAt: {
        type: Date,
        default: Date.now()
    }
});

const Reservation = mongoose.models.Reservation || mongoose.model<IResa>("Reservation", ResaSchema);
export default Reservation;
