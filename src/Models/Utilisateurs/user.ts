import   mongoose , { Schema, Document} from "mongoose";
// Interface User
export interface IUsers  extends Document {
    fullName:string, 
    email:string,
    pass:string,
    role:String,
    gender:string,
    phone_number : string,
    age:number,
    situation :string, 
    contry : string, 
}


const UserSchema : Schema =  new mongoose.Schema({
    fullName : {
        type:String, 
        required:true,
    }, 

    email : {
        type:String, 
        required : true, 
    }, 
    
    pass : {
        type:String, 
        required : true,
    }, 
    role : {
        type: String,
        enum: ['user'],
        default: 'user',
    },
    gender : {
        type:String, 
        required:true,
    }, 
    phone_number : {
        type:String, 
        required:true
    }, 
    age : {
        type:Number, 
        required:true
    }, 
    situation:{
        type:String, 
        required:true, 
    }, 
    contry : {
        type:String, 
        required:true, 
    }, 
    isVerified: {
        type: Boolean,
        default: false // New field with default value
    }
})

const Client = mongoose.models.Client || mongoose.model<IUsers>("Client", UserSchema);
 export default Client; 