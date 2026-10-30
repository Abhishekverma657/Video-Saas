import mongoose, { Document, Schema } from "mongoose";

export interface IIncomingCall {
  callerPhone: string;
  callerName: string;
  roomId: string;
  serverUrl: string;
  token: string;
  status: "ringing" | "connected" | "declined" | "ended";
  createdAt: Date;
}

export interface IPhoneUser extends Document {
  phone: string;
  name: string;
  passwordHash: string;
  avatarUrl: string;
  isOnline: boolean;
  lastActive: Date;
  incomingCall?: IIncomingCall;
  createdAt: Date;
  updatedAt: Date;
}

const IncomingCallSchema = new Schema<IIncomingCall>(
  {
    callerPhone: { type: String, required: true },
    callerName: { type: String, required: true },
    roomId: { type: String, required: true },
    serverUrl: { type: String, required: true },
    token: { type: String, required: true },
    status: {
      type: String,
      enum: ["ringing", "connected", "declined", "ended"],
      default: "ringing",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PhoneUserSchema = new Schema<IPhoneUser>(
  {
    phone: { type: String, required: true, unique: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    isOnline: { type: Boolean, default: true },
    lastActive: { type: Date, default: Date.now },
    incomingCall: { type: IncomingCallSchema, default: null },
  },
  { timestamps: true }
);

export const PhoneUser = mongoose.model<IPhoneUser>("PhoneUser", PhoneUserSchema);
