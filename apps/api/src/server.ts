import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import { seedSuperAdmin } from "./utils/seed.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import rtcRoutes from "./routes/rtc.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import phoneRoutes from "./routes/phone.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: ENV.CORS_ORIGIN === "*" ? true : ENV.CORS_ORIGIN,
    credentials: true,
  })
);

// Capture rawBody for Webhook signature verification
app.use(
  express.json({
    verify: (req: any, _res: any, buf: any) => {
      req.rawBody = buf ? buf.toString() : "";
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health Check
app.get("/health", (_req: Request, res: Response) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const mongoState = states[mongoose.connection.readyState] || "unknown";

  res.status(200).json({
    status: "ok",
    service: "OmniRTC API Gateway & Metering Engine",
    time: new Date().toISOString(),
    livekitUrl: ENV.LIVEKIT_URL,
    mongoConnection: mongoState,
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/rtc", rtcRoutes);
app.use("/api/v1/webhooks", webhookRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/phone", phoneRoutes);

// Error Handling Middleware
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server & Connect MongoDB
const startServer = async () => {
  await connectDB();
  await seedSuperAdmin();

  app.listen(ENV.PORT, () => {
    console.log(`
  🚀 OmniRTC Backend Gateway is running!
  📡 REST API:       http://localhost:${ENV.PORT}
  🔗 Health Check:   http://localhost:${ENV.PORT}/health
  🎬 LiveKit Engine: ${ENV.LIVEKIT_URL}
  📊 Environment:    ${ENV.NODE_ENV}
    `);
  });
};

startServer().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
