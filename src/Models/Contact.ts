import mongoose, {Document, Schema} from "mongoose";

export interface IContact extends Document{
    firstName : string;
    lastName : string;
    email: string;
    message : string;
}

const contactSchema : Schema = new mongoose.Schema({

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
         required : true

    },
       
    email: {
        type : String,
         required : true

    },

    message : {
        type : String,
         required : true
    }
}
);

const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
export default Contact;
