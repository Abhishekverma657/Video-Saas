import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5001,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URI: process.env.MONGODB_URI || "",
  LIVEKIT_URL: process.env.LIVEKIT_URL || "ws://127.0.0.1:7880",
  LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY || "API_MASTER_KEY",
  LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET || "SECRET_OMNIRTC_MASTER_KEY_2026",
  JWT_SECRET: process.env.JWT_SECRET || "OMNIRTC_JWT_SUPER_SECRET_KEY_89746352",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};
