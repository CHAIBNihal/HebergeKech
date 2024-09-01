import mongoose, { Document, Schema } from "mongoose";
import { IComments } from "../Commentaire";

export interface IListAnn extends Document {
  title: string;
  desc: string;
  img: Array<string>;
  Address: string;
  created_At: Date;
  updated_At: Date;
  Avail: Array<string>;
  Price: number;
  comments: IComments[];
}

const ActivitySchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
  updated_At: {
    type: Date,
    default: Date.now,
  },

  Avail: {
    type: [String],
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const Activities = mongoose.models.Activities ||  mongoose.model<IListAnn>("Activities", ActivitySchema);
export default Activities;
