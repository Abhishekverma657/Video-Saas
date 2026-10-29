import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async (): Promise<void> => {
  if (!ENV.MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is not defined in environment variables!");
    return;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    } as any);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    console.warn("⚠️ Continuing server execution. Please verify MONGODB_URI environment variable in Render.");
  }
};
