import { Room, RoomEvent, VideoPresets, Track } from "livekit-client";
import { OmniRTCConfig, JoinRoomOptions, JoinTokenResponse } from "./types.js";

export * from "./types.js";
export { Room, RoomEvent, VideoPresets, Track };

export class OmniRTC {
  private config: OmniRTCConfig;
  private currentRoom: Room | null = null;

  constructor(config: OmniRTCConfig) {
    if (!config.appId || !config.appSecret) {
      throw new Error("OmniRTC: appId and appSecret are required to initialize the SDK.");
    }
    this.config = {
      ...config,
      apiUrl: config.apiUrl || "http://localhost:5001/api/v1",
    };
  }

  /**
   * Request a signed WebRTC Access Token from the OmniRTC Gateway
   */
  async getJoinToken(options: JoinRoomOptions): Promise<JoinTokenResponse> {
    const res = await fetch(`${this.config.apiUrl}/rtc/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": this.config.appId,
        "x-app-secret": this.config.appSecret,
      },
      body: JSON.stringify(options),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to obtain join token from OmniRTC Gateway.");
    }

    return data.data;
  }

  /**
   * Helper to connect to a room directly
   */
  async joinRoom(options: JoinRoomOptions): Promise<Room> {
    const tokenData = await this.getJoinToken(options);

    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    });

    await room.connect(tokenData.serverUrl, tokenData.token);
    this.currentRoom = room;

    return room;
  }

  /**
   * Leave the active room
   */
  async leaveRoom(): Promise<void> {
    if (this.currentRoom) {
      await this.currentRoom.disconnect();
      this.currentRoom = null;
    }
  }

  /**
   * Get the active room instance
   */
  getActiveRoom(): Room | null {
    return this.currentRoom;
  }
}
