import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import { ENV } from "../config/env.js";

const roomService = new RoomServiceClient(
  ENV.LIVEKIT_URL.replace("ws://", "http://").replace("wss://", "https://"),
  ENV.LIVEKIT_API_KEY,
  ENV.LIVEKIT_API_SECRET
);

export interface TokenOptions {
  roomName: string;
  identity: string;
  name?: string;
  metadata?: string;
  canPublish?: boolean;
  canSubscribe?: boolean;
  canPublishData?: boolean;
  ttl?: string | number; // e.g. "6h"
}

export class LiveKitService {
  /**
   * Generates a signed WebRTC AccessToken for a participant
   */
  static async createToken(options: TokenOptions): Promise<string> {
    const at = new AccessToken(ENV.LIVEKIT_API_KEY, ENV.LIVEKIT_API_SECRET, {
      identity: options.identity,
      name: options.name || options.identity,
      metadata: options.metadata || "",
      ttl: options.ttl || "6h",
    });

    at.addGrant({
      roomJoin: true,
      room: options.roomName,
      canPublish: options.canPublish ?? true,
      canSubscribe: options.canSubscribe ?? true,
      canPublishData: options.canPublishData ?? true,
    });

    return await at.toJwt();
  }

  /**
   * List all currently active rooms on the LiveKit server
   */
  static async listRooms() {
    try {
      return await roomService.listRooms();
    } catch (error) {
      console.error("LiveKit listRooms error:", error);
      return [];
    }
  }

  /**
   * List participants in a specific active room
   */
  static async listParticipants(roomName: string) {
    try {
      return await roomService.listParticipants(roomName);
    } catch (error) {
      console.error(`LiveKit listParticipants error for room ${roomName}:`, error);
      return [];
    }
  }

  /**
   * Delete an active room and kick all participants
   */
  static async deleteRoom(roomName: string) {
    try {
      await roomService.deleteRoom(roomName);
      return true;
    } catch (error) {
      console.error(`LiveKit deleteRoom error for room ${roomName}:`, error);
      return false;
    }
  }
}
