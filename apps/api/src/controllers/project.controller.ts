import { Request, Response } from "express";
import crypto from "crypto";
import { Project } from "../models/Project.js";
import { RoomSession } from "../models/RoomSession.js";
import { ParticipantLog } from "../models/ParticipantLog.js";

export class ProjectController {
  static async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: "Project name is required." });
        return;
      }

      const project = await Project.create({
        name,
        description: description || "",
        appId: `app_${crypto.randomBytes(8).toString("hex")}`,
        appSecret: `sec_${crypto.randomBytes(16).toString("hex")}`,
        userId: req.user!.userId,
        freeQuotaMinutes: 10000,
      });

      res.status(201).json({
        success: true,
        message: "Project created successfully.",
        data: project,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to create project." });
    }
  }

  static async listProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await Project.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: projects });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to list projects." });
    }
  }

  static async getProject(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const project = await Project.findOne({ _id: projectId, userId: req.user!.userId });

      if (!project) {
        res.status(404).json({ success: false, message: "Project not found." });
        return;
      }

      const recentSessions = await RoomSession.find({ projectId: project._id })
        .sort({ createdAt: -1 })
        .limit(10);

      const recentParticipants = await ParticipantLog.find({ projectId: project._id })
        .sort({ createdAt: -1 })
        .limit(20);

      res.status(200).json({
        success: true,
        data: {
          project,
          recentSessions,
          recentParticipants,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch project details." });
    }
  }

  static async regenerateSecret(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const newSecret = `sec_${crypto.randomBytes(16).toString("hex")}`;

      const project = await Project.findOneAndUpdate(
        { _id: projectId, userId: req.user!.userId },
        { appSecret: newSecret },
        { new: true }
      );

      if (!project) {
        res.status(404).json({ success: false, message: "Project not found." });
        return;
      }

      res.status(200).json({
        success: true,
        message: "API Secret regenerated successfully.",
        data: {
          appId: project.appId,
          appSecret: project.appSecret,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to regenerate secret." });
    }
  }
}
