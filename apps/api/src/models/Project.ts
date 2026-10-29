import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  appId: string;
  appSecret: string;
  userId: mongoose.Types.ObjectId;
  status: "active" | "suspended";
  freeQuotaMinutes: number;
  totalMinutesUsed: number;
  webhookUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    appId: { type: String, required: true, unique: true, index: true },
    appSecret: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
    freeQuotaMinutes: { type: Number, default: 10000 },
    totalMinutesUsed: { type: Number, default: 0 },
    webhookUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
