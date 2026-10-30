"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Smartphone,
  Globe,
  Server,
  Cloud,
  Check,
  Copy,
  ChevronRight,
  Code2,
  FileCode,
  ShieldCheck,
  ExternalLink,
  Terminal,
  Zap,
  Info,
  Radio,
  Cpu,
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<
    "flutter" | "react" | "node" | "api" | "free-hosting"
  >("flutter");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live Token Testing Bench State
  const [testAppId, setTestAppId] = useState("app_omni_live_demo_01");
  const [testAppSecret, setTestAppSecret] = useState("sec_omni_super_secret_key_99");
  const [testRoom, setTestRoom] = useState("flutter-room-101");
  const [testUser, setTestUser] = useState("Developer");
  const [isTestingToken, setIsTestingToken] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [testError, setTestError] = useState<string | null>(null);

  const handleTestToken = async () => {
    setIsTestingToken(true);
    setTestError(null);
    setTestResult(null);
    try {
      const res = await fetch("https://video-saas-1-2ldd.onrender.com/api/v1/rtc/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: testAppId.trim(),
          appSecret: testAppSecret.trim(),
          roomId: testRoom.trim(),
          participantName: testUser.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
      setTestResult(data);
    } catch (err: any) {
      setTestError(err.message || "Failed to generate token");
    } finally {
      setIsTestingToken(false);
    }
  };

  const copyCode = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900 pt-20">
      {/* Top Docs Banner */}
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Developer Documentation & SDK Center
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  v1.2 Stable
                </span>
              </div>
              <p className="text-xs text-slate-500">
                End-to-end integration guides, SDK source code, and zero-cost hosting setup.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Get Your API Keys</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Documentation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Integration Guides
            </div>

            <button
              onClick={() => setActiveSection("flutter")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "flutter"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Flutter (Android & iOS)</span>
            </button>

            <button
              onClick={() => setActiveSection("react")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "react"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>React & Next.js (Web)</span>
            </button>

            <button
              onClick={() => setActiveSection("node")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "node"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Server className="w-4 h-4 text-emerald-600" />
              <span>Node.js Backend Gateway</span>
            </button>

            <button
              onClick={() => setActiveSection("api")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "api"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Code2 className="w-4 h-4 text-emerald-600" />
              <span>REST API Reference</span>
            </button>

            <div className="pt-3 pb-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                Deployment & Infra
              </div>
            </div>

            <button
              onClick={() => setActiveSection("free-hosting")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "free-hosting"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Cloud className="w-4 h-4 text-teal-600" />
              <span>100% Free Hosting (No Card)</span>
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>Need API Credentials?</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Sign up in 30 seconds to generate your <code className="text-slate-200 font-mono">App ID</code>, <code className="text-slate-200 font-mono">App Secret</code>, and 10,000 free starter minutes.
            </p>
            <Link
              href="/register"
              className="inline-block w-full text-center py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-semibold transition-colors mt-1"
            >
              Create Free Account
            </Link>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-9 space-y-8">
          {/* ============================================================= */}
          {/* 1. FLUTTER INTEGRATION GUIDE */}
          {/* ============================================================= */}
          {activeSection === "flutter" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cross-Platform Mobile</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Flutter SDK Integration Guide
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Build 1-on-1 private calls or multi-user video meetings in Flutter for Android and iOS using the native LiveKit WebRTC engine. Below is the complete step-by-step setup.
                </p>
              </div>

              {/* Calling Concept Overview */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-600" />
                  Understanding Call Architecture: Who Calls Whom?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Pattern 1: Room-Based Calling</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Both participants join the same <code className="font-mono bg-white px-1 border rounded">roomName</code> (e.g. <code className="font-mono">"meeting_101"</code>). The AuraRTC SFU handles media bridging automatically. Perfect for scheduled meetings or group calls.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">Pattern 2: 1-on-1 Direct Dialing</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      User A initiates a call ➔ Generates a unique Room ID (e.g. <code className="font-mono">"call_alice_bob"</code>) ➔ Sends push notification via Firebase Cloud Messaging (FCM) to User B ➔ User B clicks "Accept" and joins that same Room ID.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 1: Dependencies */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Step 1</span>
                    <h3 className="text-base font-bold text-slate-900">Add Dependencies to pubspec.yaml</h3>
                  </div>
                  <button
                    onClick={() =>
                      copyCode(
                        "flutter-pubspec",
                        `dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0           # For exchanging AppID & Secret for WebRTC room token
  livekit_client: ^2.4.0 # High-performance WebRTC video/audio client`
                      )
                    }
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1"
                  >
                    {copiedKey === "flutter-pubspec" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "flutter-pubspec" ? "Copied" : "Copy YAML"}</span>
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0           # For exchanging AppID & Secret for WebRTC room token
  livekit_client: ^2.4.0 # High-performance WebRTC video/audio client`}</code>
                  </pre>
                </div>
              </div>

              {/* Step 2: Permissions */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Step 2</span>
                  <h3 className="text-base font-bold text-slate-900">Configure Platform Permissions</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Required for accessing hardware camera, microphone, and internet streaming.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700">Android: android/app/src/main/AndroidManifest.xml</div>
                  <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <pre>
                      <code>{`<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />`}</code>
                    </pre>
                  </div>

                  <div className="text-xs font-bold text-slate-700 pt-2">iOS: ios/Runner/Info.plist</div>
                  <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <pre>
                      <code>{`<key>NSCameraUsageDescription</key>
<string>Allow camera access for live video calls.</string>
<key>NSMicrophoneUsageDescription</key>
<string>Allow microphone access for live voice audio.</string>`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Step 3: Token Service */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Step 3</span>
                    <h3 className="text-base font-bold text-slate-900">Create Token Service (aura_rtc_service.dart)</h3>
                  </div>
                  <button
                    onClick={() =>
                      copyCode(
                        "flutter-service",
                        `import 'dart:convert';
import 'package:http/http.dart' as http;

class AuraRTCService {
  // Use http://10.0.2.2:5001 for Android Emulator or your public server domain
  static const String apiUrl = "http://localhost:5001/api/v1/rtc/token";
  static const String appId = "YOUR_APP_ID";
  static const String appSecret = "YOUR_APP_SECRET";

  static Future<Map<String, dynamic>> getCallToken({
    required String roomName,
    required String userName,
  }) async {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {
        "Content-Type": "application/json",
        "x-app-id": appId,
        "x-app-secret": appSecret,
      },
      body: jsonEncode({
        "roomName": roomName,
        "identity": "user_\${DateTime.now().millisecondsSinceEpoch}",
        "name": userName,
      }),
    );

    final data = jsonDecode(response.body);
    if (data['success'] == true) {
      return {
        "token": data['data']['token'],
        "serverUrl": data['data']['serverUrl'],
      };
    } else {
      throw Exception(data['message'] ?? "Token generation failed");
    }
  }
}`
                      )
                    }
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1"
                  >
                    {copiedKey === "flutter-service" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "flutter-service" ? "Copied" : "Copy Dart Code"}</span>
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`import 'dart:convert';
import 'package:http/http.dart' as http;

class AuraRTCService {
  // Use http://10.0.2.2:5001 for Android Emulator or your server domain
  static const String apiUrl = "http://localhost:5001/api/v1/rtc/token";
  static const String appId = "YOUR_APP_ID";
  static const String appSecret = "YOUR_APP_SECRET";

  static Future<Map<String, dynamic>> getCallToken({
    required String roomName,
    required String userName,
  }) async {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {
        "Content-Type": "application/json",
        "x-app-id": appId,
        "x-app-secret": appSecret,
      },
      body: jsonEncode({
        "roomName": roomName,
        "identity": "user_\${DateTime.now().millisecondsSinceEpoch}",
        "name": userName,
      }),
    );

    final data = jsonDecode(response.body);
    if (data['success'] == true) {
      return {
        "token": data['data']['token'],
        "serverUrl": data['data']['serverUrl'],
      };
    } else {
      throw Exception(data['message'] ?? "Token generation failed");
    }
  }
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Step 4: VideoCallScreen Widget */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Step 4</span>
                    <h3 className="text-base font-bold text-slate-900">Video Call Screen (video_call_screen.dart)</h3>
                  </div>
                  <button
                    onClick={() =>
                      copyCode(
                        "flutter-screen",
                        `import 'package:flutter/material.dart';
import 'package:livekit_client/livekit_client.dart';
import 'aura_rtc_service.dart';

class VideoCallScreen extends StatefulWidget {
  final String roomName;
  final String userName;

  const VideoCallScreen({Key? key, required this.roomName, required this.userName}) : super(key: key);

  @override
  _VideoCallScreenState createState() => _VideoCallScreenState();
}

class _VideoCallScreenState extends State<VideoCallScreen> {
  Room? _room;
  EventsListener<RoomEvent>? _listener;
  VideoTrack? _remoteVideoTrack;

  @override
  void initState() {
    super.initState();
    _connectToRoom();
  }

  Future<void> _connectToRoom() async {
    try {
      // 1. Fetch Token from AuraRTC Gateway
      final creds = await AuraRTCService.getCallToken(
        roomName: widget.roomName,
        userName: widget.userName,
      );

      // 2. Instantiate LiveKit Room
      final room = Room();
      _listener = room.createListener();

      // Listen for remote tracks
      _listener!.on<TrackSubscribedEvent>((event) {
        if (event.track is VideoTrack) {
          setState(() {
            _remoteVideoTrack = event.track as VideoTrack;
          });
        }
      });

      // 3. Connect to Media SFU
      await room.connect(creds['serverUrl'], creds['token']);

      // 4. Publish local Camera and Mic
      await room.localParticipant?.setCameraEnabled(true);
      await room.localParticipant?.setMicrophoneEnabled(true);

      setState(() {
        _room = room;
      });
    } catch (e) {
      print("Call Error: \$e");
    }
  }

  @override
  void dispose() {
    _room?.disconnect();
    _listener?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_room == null) {
      return const Scaffold(
        backgroundColor: Colors.black,
        body: Center(child: CircularProgressIndicator(color: Colors.green)),
      );
    }

    final localTrack = _room!.localParticipant?.videoTrackPublications.firstOrNull?.track as VideoTrack?;

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // 1. Fullscreen Remote Video Feed
          if (_remoteVideoTrack != null)
            VideoTrackRenderer(_remoteVideoTrack!)
          else
            const Center(
              child: Text("Waiting for participant to join...", style: TextStyle(color: Colors.white70)),
            ),

          // 2. Picture-in-Picture Local Video Feed
          if (localTrack != null)
            Positioned(
              right: 16,
              top: 48,
              width: 120,
              height: 160,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: VideoTrackRenderer(localTrack),
              ),
            ),

          // 3. Bottom End Call Button
          Positioned(
            bottom: 32,
            left: 0,
            right: 0,
            child: Center(
              child: FloatingActionButton(
                backgroundColor: Colors.red,
                onPressed: () => Navigator.pop(context),
                child: const Icon(Icons.call_end, color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    );
  }
}`
                      )
                    }
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1"
                  >
                    {copiedKey === "flutter-screen" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "flutter-screen" ? "Copied" : "Copy Screen Code"}</span>
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[450px]">
                  <pre>
                    <code>{`import 'package:flutter/material.dart';
import 'package:livekit_client/livekit_client.dart';
import 'aura_rtc_service.dart';

class VideoCallScreen extends StatefulWidget {
  final String roomName;
  final String userName;

  const VideoCallScreen({Key? key, required this.roomName, required this.userName}) : super(key: key);

  @override
  _VideoCallScreenState createState() => _VideoCallScreenState();
}

class _VideoCallScreenState extends State<VideoCallScreen> {
  Room? _room;
  EventsListener<RoomEvent>? _listener;
  VideoTrack? _remoteVideoTrack;

  @override
  void initState() {
    super.initState();
    _connectToRoom();
  }

  Future<void> _connectToRoom() async {
    try {
      final creds = await AuraRTCService.getCallToken(
        roomName: widget.roomName,
        userName: widget.userName,
      );

      final room = Room();
      _listener = room.createListener();

      _listener!.on<TrackSubscribedEvent>((event) {
        if (event.track is VideoTrack) {
          setState(() {
            _remoteVideoTrack = event.track as VideoTrack;
          });
        }
      });

      await room.connect(creds['serverUrl'], creds['token']);
      await room.localParticipant?.setCameraEnabled(true);
      await room.localParticipant?.setMicrophoneEnabled(true);

      setState(() {
        _room = room;
      });
    } catch (e) {
      print("Call Error: \$e");
    }
  }

  @override
  void dispose() {
    _room?.disconnect();
    _listener?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_room == null) {
      return const Scaffold(
        backgroundColor: Colors.black,
        body: Center(child: CircularProgressIndicator(color: Colors.green)),
      );
    }

    final localTrack = _room!.localParticipant?.videoTrackPublications.firstOrNull?.track as VideoTrack?;

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Remote Participant Video
          if (_remoteVideoTrack != null)
            VideoTrackRenderer(_remoteVideoTrack!)
          else
            const Center(child: Text("Waiting for participant...", style: TextStyle(color: Colors.white70))),

          // Floating Local Camera Window
          if (localTrack != null)
            Positioned(
              right: 16,
              top: 48,
              width: 120,
              height: 160,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: VideoTrackRenderer(localTrack),
              ),
            ),

          // Hang Up Floating Button
          Positioned(
            bottom: 32,
            left: 0,
            right: 0,
            child: Center(
              child: FloatingActionButton(
                backgroundColor: Colors.red,
                onPressed: () => Navigator.pop(context),
                child: const Icon(Icons.call_end, color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    );
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 2. REACT / NEXT.JS INTEGRATION GUIDE */}
          {/* ============================================================= */}
          {activeSection === "react" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Web & Fullstack</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  React & Next.js Web SDK Guide
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Embed video conferencing into any modern React or Next.js web application with 5 lines of declarative component code.
                </p>
              </div>

              {/* Install NPM Package */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900">1. Install WebRTC Packages</h3>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>npm install @livekit/components-react @livekit/components-styles livekit-client</code>
                </div>
              </div>

              {/* React Component Code */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">2. Meeting Room Component (MeetingRoom.tsx)</h3>
                  <button
                    onClick={() =>
                      copyCode(
                        "react-comp",
                        `"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

export default function MeetingRoom({ roomId, userName }: { roomId: string; userName: string }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const res = await fetch("http://localhost:5001/api/v1/rtc/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "YOUR_APP_ID",
          "x-app-secret": "YOUR_APP_SECRET",
        },
        body: JSON.stringify({
          roomName: roomId,
          identity: "user_" + Math.random().toString(36).substring(2, 6),
          name: userName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.data.token);
      }
    }
    getToken();
  }, [roomId, userName]);

  if (!token) return <div>Loading meeting room...</div>;

  return (
    <LiveKitRoom
      serverUrl="ws://127.0.0.1:7880"
      token={token}
      connect={true}
      video={true}
      audio={true}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}`
                      )
                    }
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1"
                  >
                    {copiedKey === "react-comp" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "react-comp" ? "Copied" : "Copy React Code"}</span>
                  </button>
                </div>

                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[400px]">
                  <pre>
                    <code>{`"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

export default function MeetingRoom({ roomId, userName }: { roomId: string; userName: string }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const res = await fetch("http://localhost:5001/api/v1/rtc/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "YOUR_APP_ID",
          "x-app-secret": "YOUR_APP_SECRET",
        },
        body: JSON.stringify({
          roomName: roomId,
          identity: "user_" + Math.random().toString(36).substring(2, 6),
          name: userName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.data.token);
      }
    }
    getToken();
  }, [roomId, userName]);

  if (!token) return <div>Connecting to AuraRTC SFU...</div>;

  return (
    <LiveKitRoom
      serverUrl="ws://127.0.0.1:7880"
      token={token}
      connect={true}
      video={true}
      audio={true}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 3. NODE.JS BACKEND INTEGRATION */}
          {/* ============================================================= */}
          {activeSection === "node" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Server className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Server-to-Server</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Node.js / Express Backend Integration
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Keep your App Secret secure on your own backend server and expose a custom meeting token route for your mobile and web clients.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900">Custom Token Generator Route (Express)</h3>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`import express from "express";

const app = express();
app.use(express.json());

// Client calls this route when joining a call
app.post("/api/get-meeting-token", async (req, res) => {
  const { roomName, userId, userName } = req.body;

  try {
    const gatewayRes = await fetch("http://localhost:5001/api/v1/rtc/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": process.env.AURARTC_APP_ID,
        "x-app-secret": process.env.AURARTC_APP_SECRET,
      },
      body: JSON.stringify({
        roomName,
        identity: userId,
        name: userName,
      }),
    });

    const data = await gatewayRes.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 4. REST API REFERENCE */}
          {/* ============================================================= */}
          {activeSection === "api" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>REST Specification</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  AuraRTC Gateway REST API
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Authenticate requests via HTTP headers: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">x-app-id</code> and <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">x-app-secret</code> (or in request body).
                </p>
              </div>

              {/* Interactive Token Generator Console */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-sm text-emerald-400">Interactive Live API Console</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Connected to Live Render Gateway</span>
                </div>
                <p className="text-xs text-slate-400">
                  Test your real App credentials or use our pre-filled live demo credentials to generate a valid WebRTC token in 1 click:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">App ID</label>
                    <input
                      type="text"
                      value={testAppId}
                      onChange={(e) => setTestAppId(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">App Secret</label>
                    <input
                      type="password"
                      value={testAppSecret}
                      onChange={(e) => setTestAppSecret(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Room Name / ID</label>
                    <input
                      type="text"
                      value={testRoom}
                      onChange={(e) => setTestRoom(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Participant Name</label>
                    <input
                      type="text"
                      value={testUser}
                      onChange={(e) => setTestUser(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleTestToken}
                  disabled={isTestingToken}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isTestingToken ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Minting Signed LiveKit Token...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Execute POST /api/v1/rtc/token</span>
                    </>
                  )}
                </button>

                {testError && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
                    ❌ Error: {testError}
                  </div>
                )}

                {testResult && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>HTTP 200 OK — Token Generated Successfully!</span>
                      <button
                        onClick={() => copyCode("test-token", testResult.token)}
                        className="text-[10px] bg-slate-800 px-2 py-1 rounded hover:bg-slate-700 text-white flex items-center gap-1"
                      >
                        {copiedKey === "test-token" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy JWT</span>
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-400 break-all bg-slate-900/80 p-2.5 rounded-lg max-h-24 overflow-y-auto">
                      {testResult.token}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      WebSocket Server URL: <span className="text-emerald-400">{testResult.wsUrl || testResult.serverUrl}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Endpoint 1 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800">
                    POST
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    /api/v1/rtc/token
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Generates an authorized WebRTC room join token and decrements usage from the project quota.
                </p>

                <div className="text-xs font-bold text-slate-700">Headers:</div>
                <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-300">
                  x-app-id: string (Required)<br />
                  x-app-secret: string (Required)<br />
                  Content-Type: application/json
                </div>

                <div className="text-xs font-bold text-slate-700 pt-1">Request Body (JSON):</div>
                <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-emerald-400">
                  {`{
  "roomName": "boardroom-alpha",      // String (Required)
  "identity": "user_unique_123",      // String (Required)
  "name": "Abhishek",                 // String (Optional)
  "canPublish": true,                 // Boolean (Default: true)
  "canSubscribe": true                // Boolean (Default: true)
}`}
                </div>

                <div className="text-xs font-bold text-slate-700 pt-1">Response (200 OK):</div>
                <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-emerald-400">
                  {`{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "serverUrl": "ws://127.0.0.1:7880",
    "roomName": "boardroom-alpha",
    "identity": "user_unique_123",
    "expiresIn": "6h"
  }
}`}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 5. 100% FREE HOSTING GUIDE (NO CREDIT CARD REQUIRED) */}
          {/* ============================================================= */}
          {activeSection === "free-hosting" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Free • Zero Credit Card Needed</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Deploy AuraRTC SaaS 100% Free (No Credit Card Ever)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Oracle Cloud asks for international credit cards and often rejects Indian cards. Here is the verified <strong>Zero Credit Card Stack</strong> to host your entire video calling platform 100% free forever.
                </p>
              </div>

              {/* Free Stack Matrix Table */}
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 font-bold text-sm text-slate-900">
                  The Zero-Card Production Stack
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100/70 text-[11px] uppercase text-slate-500 font-mono tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Layer</th>
                        <th className="px-6 py-3">Free Provider</th>
                        <th className="px-6 py-3">Credit Card?</th>
                        <th className="px-6 py-3">Free Allowance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      <tr className="hover:bg-slate-50/80">
                        <td className="px-6 py-4 font-bold text-slate-900">Database</td>
                        <td className="px-6 py-4 font-mono text-emerald-600 font-bold">MongoDB Atlas M0</td>
                        <td className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50/50">NO (Zero Card)</td>
                        <td className="px-6 py-4">512MB storage, automated backups, free forever</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="px-6 py-4 font-bold text-slate-900">Frontend Web UI</td>
                        <td className="px-6 py-4 font-mono text-emerald-600 font-bold">Vercel</td>
                        <td className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50/50">NO (Zero Card)</td>
                        <td className="px-6 py-4">100 GB bandwidth, unlimited deployments, custom domain</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="px-6 py-4 font-bold text-slate-900">Backend API Gateway</td>
                        <td className="px-6 py-4 font-mono text-emerald-600 font-bold">Render.com / Koyeb</td>
                        <td className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50/50">NO (Zero Card)</td>
                        <td className="px-6 py-4">750 free instance hours / month, automatic HTTPS</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="px-6 py-4 font-bold text-slate-900">LiveKit Media SFU</td>
                        <td className="px-6 py-4 font-mono text-emerald-600 font-bold">LiveKit Cloud Free Tier</td>
                        <td className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50/50">NO (Zero Card)</td>
                        <td className="px-6 py-4">50 GB monthly bandwidth, up to 100 concurrent callers</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step-by-Step Hosting Guide */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">How To Setup in 4 Steps:</h3>

                {/* Step 1 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                    <h4 className="font-bold text-sm text-slate-900">Get Free LiveKit Cloud SFU (No Card)</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1. Go to <a href="https://cloud.livekit.io" target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold underline">cloud.livekit.io</a> and click <strong>"Continue with GitHub"</strong> (zero payment info required).<br />
                    2. Create a project. LiveKit immediately gives you:
                  </p>
                  <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-emerald-400">
                    LIVEKIT_URL=wss://your-project.livekit.cloud<br />
                    LIVEKIT_API_KEY=APIxxxxxxxxx<br />
                    LIVEKIT_API_SECRET=secxxxxxxxxxxxxxxxxxxx
                  </div>
                  <p className="text-xs text-slate-500">
                    This gives you high-speed global WebRTC edge servers with sub-50ms latency across India and the globe without hosting any server binary yourself!
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                    <h4 className="font-bold text-sm text-slate-900">Deploy Backend API on Render.com (No Card)</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1. Sign up on <a href="https://render.com" target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold underline">render.com</a> with your GitHub account.<br />
                    2. Click <strong>"New Web Service"</strong> ➔ Select this GitHub repo ➔ Root directory: <code className="font-mono bg-slate-100 px-1">apps/api</code>.<br />
                    3. Add these Environment Variables:
                  </p>
                  <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-300">
                    PORT=5001<br />
                    MONGODB_URI=mongodb+srv://developerabhishek0929_db_user:...@cluster0.2m7c5z8.mongodb.net/omnirtc<br />
                    LIVEKIT_URL=wss://your-project.livekit.cloud<br />
                    LIVEKIT_API_KEY=your_key_from_step_1<br />
                    LIVEKIT_API_SECRET=your_secret_from_step_1<br />
                    JWT_SECRET=super_secret_production_key_1234
                  </div>
                  <p className="text-xs text-slate-500">
                    Render gives you a free live URL: <code className="font-mono text-emerald-600">https://aurartc-api.onrender.com</code>.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                    <h4 className="font-bold text-sm text-slate-900">Deploy Frontend Web App on Vercel (No Card)</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1. Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold underline">vercel.com</a> and sign in with GitHub.<br />
                    2. Import this repository ➔ Set root directory to <code className="font-mono bg-slate-100 px-1">apps/web</code>.<br />
                    3. Click <strong>Deploy</strong>. Vercel automatically builds and hosts the Next.js app on a global CDN with free HTTPS!
                  </p>
                </div>

                {/* Option 2: Cloudflare Tunnel */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-emerald-600" />
                    Alternative: Self-Host on your own Laptop with Free Cloudflare Tunnel
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you want to run the LiveKit binary on your own Mac/PC and expose it to the public internet for free without opening router ports or paying anything:
                  </p>
                  <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-emerald-400">
                    brew install cloudflare/cloudflare/cloudflared<br />
                    cloudflared tunnel --url http://localhost:7880
                  </div>
                  <p className="text-xs text-slate-500">
                    Cloudflare gives you a free HTTPS/WSS URL (e.g. <code className="font-mono">https://xyz.trycloudflare.com</code>) that directly routes into your local LiveKit server!
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
