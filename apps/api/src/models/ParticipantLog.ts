import mongoose, { Document, Schema } from "mongoose";

export interface IParticipantLog extends Document {
  participantSid: string;
  identity: string;
  name: string;
  roomName: string;
  appId: string;
  projectId: mongoose.Types.ObjectId;
  joinedAt: Date;
  leftAt?: Date;
  durationSeconds: number;
  minutesCharged: number;
  metadata?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipantLogSchema = new Schema<IParticipantLog>(
  {
    participantSid: { type: String, required: true, index: true },
    identity: { type: String, required: true },
    name: { type: String, default: "Anonymous" },
    roomName: { type: String, required: true, index: true },
    appId: { type: String, required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    joinedAt: { type: Date, default: Date.now },
    leftAt: { type: Date },
    durationSeconds: { type: Number, default: 0 },
    minutesCharged: { type: Number, default: 0 },
    metadata: { type: String, default: "" },
  },
  { timestamps: true }
);

export const ParticipantLog = mongoose.model<IParticipantLog>("ParticipantLog", ParticipantLogSchema);
