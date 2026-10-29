import { Request, Response } from "express";
import { LiveKitService } from "../services/livekit.service.js";
import { RoomSession } from "../models/RoomSession.js";
import { ParticipantLog } from "../models/ParticipantLog.js";
import { Project } from "../models/Project.js";
import { ENV } from "../config/env.js";

export class RTCController {
  /**
   * Generates a signed WebRTC Access Token for a user to join a room.
   * Authenticated via `requireApiKey` (validates `appId` and `appSecret`).
   */
  static async getToken(req: Request, res: Response): Promise<void> {
    try {
      const roomName = req.body.roomName || req.body.roomId;
      const identity = req.body.identity || req.body.participantName;
      const name = req.body.name || req.body.participantName || identity;
      const { canPublish, canSubscribe, canPublishData } = req.body;
      const project = req.project!; // Attached by requireApiKey middleware

      if (!roomName || !identity) {
        res.status(400).json({
          success: false,
          message: "roomName (or roomId) and identity (or participantName) are required parameters.",
        });
        return;
      }

      // 1. Generate LiveKit WebRTC Token
      const token = await LiveKitService.createToken({
        roomName,
        identity,
        name: name || identity,
        canPublish: canPublish ?? true,
        canSubscribe: canSubscribe ?? true,
        canPublishData: canPublishData ?? true,
        ttl: "6h",
      });

      // 2. Track or update RoomSession in MongoDB
      let session = await RoomSession.findOne({
        roomId: roomName,
        appId: project.appId,
        status: "active",
      });

      if (!session) {
        session = await RoomSession.create({
          roomId: roomName,
          roomName,
          appId: project.appId,
          projectId: project._id,
          status: "active",
          startedAt: new Date(),
        });
      }

      res.status(200).json({
        success: true,
        token,
        wsUrl: ENV.LIVEKIT_URL,
        serverUrl: ENV.LIVEKIT_URL,
        roomName,
        data: {
          token,
          serverUrl: ENV.LIVEKIT_URL,
          wsUrl: ENV.LIVEKIT_URL,
          roomName,
          identity,
          name: name || identity,
          appId: project.appId,
          expiresIn: "6h",
        },
      });
    } catch (error: any) {
      console.error("RTC getToken error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to generate RTC token.",
      });
    }
  }

  /**
   * List active rooms for a project
   */
  static async getActiveRooms(req: Request, res: Response): Promise<void> {
    try {
      const project = req.project!;
      const livekitRooms = await LiveKitService.listRooms();

      // Filter rooms that belong to this project's active sessions
      const activeSessions = await RoomSession.find({
        appId: project.appId,
        status: "active",
      });

      const activeRoomIds = new Set(activeSessions.map((s) => s.roomId));
      const filteredRooms = livekitRooms.filter((r) => activeRoomIds.has(r.name));

      res.status(200).json({
        success: true,
        data: filteredRooms,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch active rooms." });
    }
  }

  /**
   * Project Analytics & Minute usage breakdown
   */
  static async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const project = req.project!;

      const totalSessions = await RoomSession.countDocuments({ projectId: project._id });
      const totalParticipants = await ParticipantLog.countDocuments({ projectId: project._id });

      const usageHistory = await ParticipantLog.aggregate([
        { $match: { projectId: project._id } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$joinedAt" } },
            dailyMinutes: { $sum: "$minutesCharged" },
            sessionsCount: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 30 },
      ]);

      res.status(200).json({
        success: true,
        data: {
          appId: project.appId,
          freeQuotaMinutes: project.freeQuotaMinutes,
          totalMinutesUsed: project.totalMinutesUsed,
          remainingMinutes: Math.max(0, project.freeQuotaMinutes - project.totalMinutesUsed),
          totalSessions,
          totalParticipants,
          usageHistory,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch analytics." });
    }
  }
}
