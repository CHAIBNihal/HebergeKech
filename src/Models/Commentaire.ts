import mongoose, {Document, Schema} from "mongoose";
import { IUsers } from "./Utilisateurs/user";
import { IListAnn } from "./Annonces/ListingAct";
import { IListLog } from "./Annonces/ListingLog";

export interface IComments extends Document {
    clientId : IUsers;
    LogId : IListLog;
    actId : IListAnn;
    Content : string;
    created_At : Date;
}


const CommentsSchema : Schema = new mongoose.Schema({

    clientId : {
        type : Schema.Types.ObjectId, 
        ref: "Client",
        required : true
    }, 

    LogId : {
        type : Schema.Types.ObjectId, 
        ref: "LogAnnonce"
    },

    actId : {
        type : Schema.Types.ObjectId,
        ref : "Activities"
    },

    Content :{
        type:String, 
        required:true,
    }, 

    created_At : {
        type: Date,
        default : Date.now()
    }


})

const Comments = mongoose.models.Comments || mongoose.model<IComments>("Comments", CommentsSchema);
export default Comments;