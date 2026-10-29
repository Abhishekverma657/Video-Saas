import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "apps/api/.env" });

const testConnection = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("Connecting to MongoDB Atlas...");
  console.log("URI host:", uri?.split("@")[1]?.split("/")[0]);

  try {
    const conn = await mongoose.connect(uri!);
    console.log("🎉 Successfully connected to MongoDB Atlas!");
    console.log("Database name:", conn.connection.name);
    console.log("Host:", conn.connection.host);
    await mongoose.disconnect();
    console.log("Disconnected cleanly.");
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
};

testConnection();
