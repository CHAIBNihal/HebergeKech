import mongoose, { Document, Schema } from "mongoose";
import { IComments } from "../Commentaire";

export interface IListLog extends Document {
  title: string;
  desc: string;
  img: Array<string>;
  created_At: Date;
  updated_At: Date;
  RoomsNumber: number;
  bathRoomsNum: number;
  guestNumber: number;
  Avail: Array<string>;
  Wifi: boolean;
  Pool: boolean;
  AnimalSpace: boolean;
  terrace: boolean;
  fireplace: boolean;
  Price: number;
  parking: boolean;
  climatise: boolean;
  comments: IComments[];
}

const LogementSchema: Schema = new mongoose.Schema({
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
  created_At: {
    type: Date,
    default: Date.now,
  },
  updated_At: {
    type: Date,
    default: Date.now,
  },
  RoomsNumber: {
    type: Number,
    required: true,
  },
  bathRoomsNum: {
    type: Number,
    required: true,
  },
  guestNumber: {
    type: Number,
    required: true,
  },
  Avail: {
    type: [String],
    required: true,
  },
  Wifi: {
    type: Boolean,
    default: false,
  },
  Pool: {
    type: Boolean,
    default: false,
  },
  AnimalSpace: {
    type: Boolean,
    default: false,
  },
  terrace: {
    type: Boolean,
    default: false,
  },
  fireplace: {
    type: Boolean,
    default: false,
  },
  Price: {
    type: Number,
    required: true,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  climatise: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const LogAnnonce = mongoose.models.LogAnnonce || mongoose.model<IListLog>("LogAnnonce", LogementSchema);
export default LogAnnonce;
