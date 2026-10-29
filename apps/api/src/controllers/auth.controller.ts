import { Request, Response } from "express";
import crypto from "crypto";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ success: false, message: "Name, email, and password are required." });
        return;
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ success: false, message: "User with this email already exists." });
        return;
      }

      const user = await User.create({
        name,
        email,
        passwordHash: hashPassword(password),
      });

      // Automatically create a default project for the new developer
      const defaultProject = await Project.create({
        name: "My First App",
        description: "Default RTC Project",
        appId: `app_${crypto.randomBytes(8).toString("hex")}`,
        appSecret: `sec_${crypto.randomBytes(16).toString("hex")}`,
        userId: user._id,
        freeQuotaMinutes: 10000,
      });

      const token = signToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      res.status(201).json({
        success: true,
        message: "Developer account created successfully.",
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          defaultProject: {
            _id: defaultProject._id,
            id: defaultProject._id,
            name: defaultProject.name,
            description: defaultProject.description,
            appId: defaultProject.appId,
            appSecret: defaultProject.appSecret,
            status: defaultProject.status,
            freeQuotaMinutes: defaultProject.freeQuotaMinutes,
            totalMinutesUsed: defaultProject.totalMinutesUsed,
            createdAt: defaultProject.createdAt,
          },
          projects: [defaultProject],
        },
      });
    } catch (error: any) {
      console.error("Register error:", error);
      res.status(500).json({ success: false, message: error.message || "Failed to register developer." });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ success: false, message: "Email and password are required." });
        return;
      }

      const user = await User.findOne({ email });
      if (!user || !verifyPassword(password, user.passwordHash)) {
        res.status(401).json({ success: false, message: "Invalid email or password." });
        return;
      }

      const projects = await Project.find({ userId: user._id });

      const token = signToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        success: true,
        message: "Login successful.",
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          projects,
        },
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: error.message || "Failed to login." });
    }
  }

  static async me(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized." });
        return;
      }

      const user = await User.findById(req.user.userId).select("-passwordHash");
      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }

      const projects = await Project.find({ userId: user._id });

      res.status(200).json({
        success: true,
        data: {
          user,
          projects,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch profile." });
    }
  }

  static async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ success: false, message: "Email and password are required." });
        return;
      }

      const user = await User.findOne({ email });
      if (!user || !verifyPassword(password, user.passwordHash)) {
        res.status(401).json({ success: false, message: "Invalid administrator credentials." });
        return;
      }

      if (user.role !== "admin") {
        res.status(403).json({
          success: false,
          message: "Access Denied: This portal is strictly restricted to Platform Super Administrators.",
        });
        return;
      }

      const token = signToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        success: true,
        message: "Super Admin authenticated successfully.",
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error: any) {
      console.error("Admin Login error:", error);
      res.status(500).json({ success: false, message: error.message || "Admin authentication failed." });
    }
  }
}
