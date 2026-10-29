import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config({ path: "apps/api/.env" });

import { User } from "../apps/api/src/models/User.js";
import { Project } from "../apps/api/src/models/Project.js";
import { RoomSession } from "../apps/api/src/models/RoomSession.js";
import { ParticipantLog } from "../apps/api/src/models/ParticipantLog.js";
import { hashPassword } from "../apps/api/src/utils/hash.js";

const seed = async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri!);
  console.log("Connected to MongoDB Atlas for seeding...");

  // Clean existing seed data
  await User.deleteMany({ email: "demo@omnirtc.io" });
  await Project.deleteMany({ appId: "app_omni_live_demo_01" });

  // 1. Create Developer User
  const user = await User.create({
    name: "Abhishek Developer",
    email: "demo@omnirtc.io",
    passwordHash: hashPassword("Password@123"),
    role: "developer",
  });
  console.log("✅ Seeded User: demo@omnirtc.io / Password@123");

  // 2. Create Project
  const project = await Project.create({
    name: "Production Video Call Suite",
    description: "Multi-party video calls with AI noise suppression and cloud recording",
    appId: "app_omni_live_demo_01",
    appSecret: "sec_omni_super_secret_key_99",
    userId: user._id,
    freeQuotaMinutes: 10000,
    totalMinutesUsed: 284,
  });
  console.log("✅ Seeded Project: app_omni_live_demo_01 / sec_omni_super_secret_key_99");

  // 3. Seed some realistic Room Sessions and Participant Logs
  const now = Date.now();
  const rooms = ["team-daily-standup", "dr-consultation-room-4", "global-investor-pitch"];

  for (let i = 0; i < rooms.length; i++) {
    const roomName = rooms[i];
    const startedAt = new Date(now - (3 - i) * 86400000 - 3600000);
    const durationMins = 35 + i * 20;
    const endedAt = new Date(startedAt.getTime() + durationMins * 60000);

    const session = await RoomSession.create({
      roomId: roomName,
      roomName,
      appId: project.appId,
      projectId: project._id,
      status: "ended",
      startedAt,
      endedAt,
      totalDurationSeconds: durationMins * 60,
      totalParticipantMinutes: durationMins * 3,
      maxConcurrentParticipants: 4,
    });

    // Create participant logs
    const participants = ["Rahul Sharma", "Priya Patel", "Vikram Singh", "Sarah Connor"];
    for (const pName of participants) {
      await ParticipantLog.create({
        participantSid: `PA_${crypto.randomBytes(4).toString("hex")}`,
        identity: `user_${pName.toLowerCase().replace(" ", "_")}`,
        name: pName,
        roomName,
        appId: project.appId,
        projectId: project._id,
        joinedAt: startedAt,
        leftAt: endedAt,
        durationSeconds: durationMins * 60,
        minutesCharged: durationMins,
      });
    }
  }

  console.log("✅ Seeded Room Sessions and Participant logs for analytics!");
  await mongoose.disconnect();
  console.log("🎉 Seeding complete.");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
