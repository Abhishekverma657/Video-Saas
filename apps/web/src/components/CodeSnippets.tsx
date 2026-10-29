"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Terminal, ExternalLink, ArrowRight } from "lucide-react";

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState<"react" | "flutter" | "node" | "curl">("react");
  const [copied, setCopied] = useState(false);

  const snippets = {
    react: `// 1. Install AuraRTC Web SDK
npm install @livekit/components-react livekit-client

// 2. Embed Video Conference in React / Next.js
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

export default function MeetingRoom() {
  return (
    <LiveKitRoom
      serverUrl="ws://localhost:7880"
      token={userJoinToken}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}`,
    flutter: `// 1. Add to pubspec.yaml
dependencies:
  http: ^1.2.0           # For token exchange
  livekit_client: ^2.4.0 # Real-time WebRTC audio & video engine

// 2. Fetch room token using your App ID & Secret
final res = await http.post(
  Uri.parse('http://your-api.com/api/v1/rtc/token'),
  headers: { 'x-app-id': 'YOUR_APP_ID', 'x-app-secret': 'YOUR_APP_SECRET' },
  body: jsonEncode({ 'roomName': 'meeting_101', 'identity': 'user_01' }),
);
final token = jsonDecode(res.body)['data']['token'];

// 3. Connect to AuraRTC LiveKit Room
final room = Room();
await room.connect('ws://your-server-ip:7880', token);

// 4. Publish Camera & Mic with 1 line
await room.localParticipant?.setCameraEnabled(true);
await room.localParticipant?.setMicrophoneEnabled(true);

// 5. Render live video in Flutter widget tree
// VideoTrackRenderer(remoteVideoTrack)`,
    node: `// Generate Signed WebRTC Token on Backend
import { AccessToken } from "livekit-server-sdk";

const at = new AccessToken("app_omni_live_demo_01", "sec_omni_super_secret_key_99", {
  identity: "user_rahul",
  name: "Rahul Sharma",
  ttl: "6h",
});

at.addGrant({
  roomJoin: true,
  room: "room_meeting_01",
  canPublish: true,
  canSubscribe: true,
});

const token = await at.toJwt();
console.log("WebRTC Token:", token);`,
    curl: `# Request WebRTC Join Token from AuraRTC Gateway
curl -X POST http://localhost:5001/api/v1/rtc/token \\
  -H "Content-Type: application/json" \\
  -H "x-app-id: app_omni_live_demo_01" \\
  -H "x-app-secret: sec_omni_super_secret_key_99" \\
  -d '{
    "roomName": "global-standup",
    "identity": "user_dev_01",
    "name": "Abhishek Dev"
  }'`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full light-card rounded-2xl overflow-hidden shadow-soft">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-emerald-600 mr-2" />
          {(["react", "flutter", "node", "curl"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? "bg-white text-emerald-700 border border-slate-200 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "react" ? "React / Next.js" : tab === "curl" ? "cURL API" : tab}
            </button>
          ))}
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg shadow-sm transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-6 bg-slate-950 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
        <pre>{snippets[activeTab]}</pre>
      </div>

      {/* Docs Quick Link Footer */}
      <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-400">
          Looking for Android/iOS permissions, Flutter UI widgets, or token architecture?
        </span>
        <Link
          href="/docs"
          className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
        >
          <span>Open Full Documentation & SDK Guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
