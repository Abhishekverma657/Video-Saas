export interface OmniRTCConfig {
  appId: string;
  appSecret: string;
  apiUrl?: string;
}

export interface JoinRoomOptions {
  roomName: string;
  identity: string;
  name?: string;
  canPublish?: boolean;
  canSubscribe?: boolean;
  canPublishData?: boolean;
}

export interface JoinTokenResponse {
  token: string;
  serverUrl: string;
  roomName: string;
  identity: string;
  name: string;
  appId: string;
  expiresIn: string;
}
