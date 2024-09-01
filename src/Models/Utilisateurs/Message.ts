import  mongoose, {Schema, Document }  from 'mongoose';
export interface IMessage extends Document {
    content : string; 
    created_At : Date
}

const MessageSchema: Schema<IMessage> = new Schema({
    content : {
        type: String, 
        required:true,
    }, 
    created_At : {
        type:Date, 
        required: true, 
        default: Date.now()
    }
})

export const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema );



