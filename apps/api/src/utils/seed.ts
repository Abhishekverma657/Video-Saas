import { User } from "../models/User.js";
import { hashPassword } from "./hash.js";

export const seedSuperAdmin = async (): Promise<void> => {
  try {
    const adminEmail = "admin@aurartc.io";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: "Super Administrator (Abhishek)",
        email: adminEmail,
        passwordHash: hashPassword("Admin@AuraRTC2026!"),
        role: "admin",
      });
      console.log(`🛡️  Super Admin account initialized: ${adminEmail}`);
    } else {
      // Ensure role is admin
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        await existingAdmin.save();
      }
    }
  } catch (error) {
    console.error("Failed to seed Super Admin:", error);
  }
};
