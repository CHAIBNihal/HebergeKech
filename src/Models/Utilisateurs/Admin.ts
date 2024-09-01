import   mongoose , { Schema, Document} from "mongoose";
// Interface User
export interface IAdmin  extends Document {
    fullName:string, 
    email:string,
    pass:string,
    role:string, 
    verifyCode:string, 
    verifyCodeExpiry : Date,
    isVerified:boolean , 
    forgotPasswordToken :String,
    forgotPasswordExpiry: Date,

    
    
}

// Schema de la BD === Equivalent 
const AdminSchema: Schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "please use a valid email address"],
    },

    pass: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    verifyCode: {
      type: String,
      required: true,
    },
    verifyCodeExpiry: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // New field with default value
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin  || mongoose.model<IAdmin>("Admin", AdminSchema);

 export default Admin; 