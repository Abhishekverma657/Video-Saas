import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { RoomSession } from "../models/RoomSession.js";
import { ParticipantLog } from "../models/ParticipantLog.js";
import { LiveKitService } from "../services/livekit.service.js";

export class AdminController {
  /**
   * Super Admin Overview Stats across the whole platform
   */
  static async getOverview(req: Request, res: Response): Promise<void> {
    try {
      const totalUsers = await User.countDocuments();
      const totalProjects = await Project.countDocuments();
      const totalSessions = await RoomSession.countDocuments();
      const totalParticipants = await ParticipantLog.countDocuments();

      // Aggregate total minutes used across all projects
      const minuteAgg = await Project.aggregate([
        { $group: { _id: null, totalMinutes: { $sum: "$totalMinutesUsed" } } },
      ]);
      const totalGlobalMinutes = minuteAgg[0]?.totalMinutes || 0;

      // Active live rooms currently on LiveKit
      const activeRooms = await LiveKitService.listRooms();

      res.status(200).json({
        success: true,
        data: {
          totalUsers,
          totalProjects,
          totalSessions,
          totalParticipants,
          totalGlobalMinutes,
          activeRoomsCount: activeRooms.length,
          serverHealth: {
            status: "healthy",
            engine: "LiveKit SFU 1.13.11",
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
          },
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch admin stats." });
    }
  }

  /**
   * List all registered developers and their projects
   */
  static async listAllDevelopers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });

      const developersWithProjects = await Promise.all(
        users.map(async (u) => {
          const projects = await Project.find({ userId: u._id });
          return {
            user: u,
            projects,
          };
        })
      );

      res.status(200).json({
        success: true,
        data: developersWithProjects,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to list developers." });
    }
  }

  /**
   * Suspend or Activate a Project
   */
  static async toggleProjectStatus(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const { status } = req.body;

      if (!["active", "suspended"].includes(status)) {
        res.status(400).json({ success: false, message: "Invalid status. Must be 'active' or 'suspended'." });
        return;
      }

      const project = await Project.findByIdAndUpdate(projectId, { status }, { new: true });
      if (!project) {
        res.status(404).json({ success: false, message: "Project not found." });
        return;
      }

      res.status(200).json({
        success: true,
        message: `Project status updated to ${status}.`,
        data: project,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to update project status." });
    }
  }

  /**
   * Adjust quota minutes for a project
   */
  static async updateProjectQuota(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const { freeQuotaMinutes } = req.body;

      if (typeof freeQuotaMinutes !== "number" || freeQuotaMinutes < 0) {
        res.status(400).json({ success: false, message: "freeQuotaMinutes must be a positive number." });
        return;
      }

      const project = await Project.findByIdAndUpdate(
        projectId,
        { freeQuotaMinutes },
        { new: true }
      );

      if (!project) {
        res.status(404).json({ success: false, message: "Project not found." });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Project quota updated successfully.",
        data: project,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to update quota." });
    }
  }
}
