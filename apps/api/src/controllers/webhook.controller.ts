import { Request, Response } from "express";
import { WebhookReceiver } from "livekit-server-sdk";
import { ENV } from "../config/env.js";
import { RoomSession } from "../models/RoomSession.js";
import { ParticipantLog } from "../models/ParticipantLog.js";
import { Project } from "../models/Project.js";

const receiver = new WebhookReceiver(ENV.LIVEKIT_API_KEY, ENV.LIVEKIT_API_SECRET);

export class WebhookController {
  static async handleLiveKitWebhook(req: Request, res: Response): Promise<void> {
    try {
      const rawBody = (req as any).rawBody || JSON.stringify(req.body);
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).send("Unauthorized Webhook Request");
        return;
      }

      // Verify and receive the webhook event
      const event = await receiver.receive(rawBody, authHeader);
      console.log(`📡 LiveKit Webhook Event: [${event.event}] for Room: [${event.room?.name}]`);

      const roomName = event.room?.name;
      if (!roomName) {
        res.status(200).send("OK");
        return;
      }

      // Find the associated active RoomSession
      const session = await RoomSession.findOne({ roomId: roomName, status: "active" });

      switch (event.event) {
        case "room_started": {
          console.log(`🎬 Room Started: ${roomName}`);
          break;
        }

        case "participant_joined": {
          const participant = event.participant;
          if (participant && session) {
            await ParticipantLog.create({
              participantSid: participant.sid,
              identity: participant.identity,
              name: participant.name || participant.identity,
              roomName,
              appId: session.appId,
              projectId: session.projectId,
              joinedAt: new Date(Number(participant.joinedAt) * 1000 || Date.now()),
              metadata: participant.metadata || "",
            });
            console.log(`👤 Participant Joined: ${participant.identity} in ${roomName}`);
          }
          break;
        }

        case "participant_left": {
          const participant = event.participant;
          if (participant && session) {
            const log = await ParticipantLog.findOne({
              participantSid: participant.sid,
              leftAt: { $exists: false },
            });

            if (log) {
              const leftAt = new Date();
              const durationSeconds = Math.max(1, Math.round((leftAt.getTime() - log.joinedAt.getTime()) / 1000));
              const minutesCharged = Math.ceil(durationSeconds / 60);

              log.leftAt = leftAt;
              log.durationSeconds = durationSeconds;
              log.minutesCharged = minutesCharged;
              await log.save();

              // Atomically increment project usage minutes in MongoDB
              await Project.findByIdAndUpdate(session.projectId, {
                $inc: { totalMinutesUsed: minutesCharged },
              });

              // Increment room session participant minutes
              session.totalParticipantMinutes += minutesCharged;
              await session.save();

              console.log(
                `👋 Participant Left: ${participant.identity}. Duration: ${durationSeconds}s (${minutesCharged} min charged).`
              );
            }
          }
          break;
        }

        case "room_finished": {
          if (session) {
            session.status = "ended";
            session.endedAt = new Date();
            session.totalDurationSeconds = Math.max(
              1,
              Math.round((session.endedAt.getTime() - session.startedAt.getTime()) / 1000)
            );
            await session.save();
            console.log(`🏁 Room Finished: ${roomName}. Total Duration: ${session.totalDurationSeconds}s`);
          }
          break;
        }

        default:
          break;
      }

      res.status(200).send("OK");
    } catch (error: any) {
      console.error("Webhook processing error:", error.message);
      res.status(500).send("Webhook Error");
    }
  }
}
