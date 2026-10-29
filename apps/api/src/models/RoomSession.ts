import mongoose, { Document, Schema } from "mongoose";

export interface IRoomSession extends Document {
  roomId: string;
  roomName: string;
  appId: string;
  projectId: mongoose.Types.ObjectId;
  status: "active" | "ended";
  startedAt: Date;
  endedAt?: Date;
  totalDurationSeconds: number;
  totalParticipantMinutes: number;
  maxConcurrentParticipants: number;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSessionSchema = new Schema<IRoomSession>(
  {
    roomId: { type: String, required: true, index: true },
    roomName: { type: String, required: true },
    appId: { type: String, required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    status: { type: String, enum: ["active", "ended"], default: "active" },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
    totalDurationSeconds: { type: Number, default: 0 },
    totalParticipantMinutes: { type: Number, default: 0 },
    maxConcurrentParticipants: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const RoomSession = mongoose.model<IRoomSession>("RoomSession", RoomSessionSchema);
