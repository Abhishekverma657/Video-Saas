"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Sliders,
  Play,
  Layers,
  Sparkles,
  Palette,
  Volume2,
  Lock,
} from "lucide-react";

type DocSection =
  | "quickstart"
  | "flutter"
  | "react"
  | "node"
  | "customize"
  | "token-bench"
  | "api"
  | "free-hosting";

function DocsContent() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<DocSection>("quickstart");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const section = searchParams.get("section") as DocSection;
    if (
      section &&
      [
        "quickstart",
        "flutter",
        "react",
        "node",
        "customize",
        "token-bench",
        "api",
        "free-hosting",
      ].includes(section)
    ) {
      setActiveSection(section);
    }
  }, [searchParams]);

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
                Line-by-line SDK tutorials, UI customization guides, and interactive token playground.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection("token-bench")}
              className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Token Playground</span>
            </button>
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Get API Keys</span>
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
              Getting Started
            </div>

            <button
              onClick={() => setActiveSection("quickstart")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "quickstart"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Architecture & Concepts</span>
            </button>

            <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Client & Backend SDKs
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

            <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Customization & Theming
            </div>

            <button
              onClick={() => setActiveSection("customize")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "customize"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Palette className="w-4 h-4 text-indigo-600" />
                <span>UI Theming & Customization</span>
              </div>
              <span className="px-1.5 py-0.2 text-[9px] bg-indigo-100 text-indigo-800 rounded font-bold font-mono">
                Guide
              </span>
            </button>

            <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Testing & API
            </div>

            <button
              onClick={() => setActiveSection("token-bench")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeSection === "token-bench"
                  ? "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Interactive Token Playground</span>
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
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 space-y-2.5 text-xs shadow-md">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>Need API Credentials?</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Sign up to receive your instant <code className="text-slate-200 font-mono">App ID</code>, <code className="text-slate-200 font-mono">App Secret</code>, and 1,000 monthly minutes.
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
          {/* 0. QUICKSTART & ARCHITECTURE */}
          {/* ============================================================= */}
          {activeSection === "quickstart" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Platform Architecture</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  How AuraRTC Video Calling Works
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Unlike peer-to-peer WebRTC where participants send video directly to each other (overloading mobile CPU after 3 users), AuraRTC uses a high-performance **Selective Forwarding Unit (SFU)** mesh.
                </p>
              </div>

              {/* 3-Step Flow Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm font-mono">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Client Requests Call</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Flutter app or Web client asks your backend: <em>"I want to join Room: meeting_101 with Name: Alice"</em>.
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm font-mono">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Backend Mints JWT Token</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your Node.js API uses your <code className="font-mono text-emerald-700">App Secret</code> to sign a secure WebRTC JWT token with room permissions.
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-sm font-mono">
                    3
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Direct SFU Connection</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Client passes JWT to LiveKit Cloud (<code className="font-mono text-[11px]">wss://...</code>). Video tracks immediately connect with sub-150ms latency!
                  </p>
                </div>
              </div>

              {/* Next step CTA */}
              <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-900 text-white">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">Ready to build your client app?</h4>
                  <p className="text-xs text-slate-400">Choose your preferred framework below to see step-by-step code.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSection("flutter")}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    Flutter Guide →
                  </button>
                  <button
                    onClick={() => setActiveSection("react")}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                  >
                    React Guide →
                  </button>
                </div>
              </div>
            </div>
          )}

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
                  Flutter SDK Integration Guide (Android & iOS)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Build 1-on-1 private video calls or multi-user conference meetings in Flutter using the official <code className="font-mono text-emerald-700 font-bold">livekit_client</code> package.
                </p>
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
  livekit_client: ^2.4.0 # High-performance WebRTC video/audio client
  permission_handler: ^11.3.1 # For requesting camera & mic permissions`
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
  livekit_client: ^2.4.0 # High-performance WebRTC video/audio client
  permission_handler: ^11.3.1 # For requesting camera & mic permissions`}</code>
                  </pre>
                </div>
              </div>

              {/* Step 2: Permissions */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Step 2</span>
                  <h3 className="text-base font-bold text-slate-900">Configure Platform Permissions</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Required for hardware camera, microphone, and internet streaming.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700">Android: android/app/src/main/AndroidManifest.xml</div>
                  <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <pre>
                      <code>{`<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
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
  // Use public Render backend or localhost:5001 (10.0.2.2 for Android Emulator)
  static const String apiUrl = "https://video-saas-1-2ldd.onrender.com/api/v1/rtc/token";
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
      },
      body: jsonEncode({
        "appId": appId,
        "appSecret": appSecret,
        "roomId": roomName,
        "participantName": userName,
      }),
    );

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      return {
        "token": json["data"]["token"],
        "serverUrl": json["data"]["serverUrl"],
      };
    } else {
      throw Exception("Failed to get WebRTC token: \${response.body}");
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
                    <span>{copiedKey === "flutter-service" ? "Copied" : "Copy Service"}</span>
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`import 'dart:convert';
import 'package:http/http.dart' as http;

class AuraRTCService {
  // Public Render backend or your custom domain
  static const String apiUrl = "https://video-saas-1-2ldd.onrender.com/api/v1/rtc/token";
  static const String appId = "YOUR_APP_ID";
  static const String appSecret = "YOUR_APP_SECRET";

  static Future<Map<String, dynamic>> getCallToken({
    required String roomName,
    required String userName,
  }) async {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: { "Content-Type": "application/json" },
      body: jsonEncode({
        "appId": appId,
        "appSecret": appSecret,
        "roomId": roomName,
        "participantName": userName,
      }),
    );

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      return {
        "token": json["data"]["token"],
        "serverUrl": json["data"]["serverUrl"],
      };
    } else {
      throw Exception("Failed to get token: \${response.body}");
    }
  }
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Step 4: Full Video Call Screen */}
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
  bool _isMicMuted = false;
  bool _isCamOff = false;

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

      final room = Room(
        roomOptions: const RoomOptions(
          adaptiveStream: true,
          dynacast: true,
          defaultCameraCaptureOptions: CameraCaptureOptions(
            maxFrameRate: 30,
            params: VideoParametersPresets.h720_169,
          ),
        ),
      );

      final listener = room.createListener();

      listener
        ..on<TrackSubscribedEvent>((event) {
          if (event.track is VideoTrack) {
            setState(() {
              _remoteVideoTrack = event.track as VideoTrack;
            });
          }
        })
        ..on<TrackUnsubscribedEvent>((event) {
          if (event.track is VideoTrack) {
            setState(() {
              _remoteVideoTrack = null;
            });
          }
        });

      await room.connect(creds["serverUrl"], creds["token"]);
      await room.localParticipant?.setCameraEnabled(true);
      await room.localParticipant?.setMicrophoneEnabled(true);

      setState(() {
        _room = room;
        _listener = listener;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Error: \$e")));
    }
  }

  @override
  void dispose() {
    _listener?.dispose();
    _room?.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_room == null) {
      return const Scaffold(
        backgroundColor: Colors.black,
        body: Center(child: CircularProgressIndicator(color: Colors.emerald)),
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
            const Center(
              child: Text("Waiting for participant to join...", style: TextStyle(color: Colors.white70)),
            ),

          // Local Picture-in-Picture Video
          if (localTrack != null && !_isCamOff)
            Positioned(
              right: 16,
              top: 50,
              width: 110,
              height: 160,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: VideoTrackRenderer(localTrack),
              ),
            ),

          // Floating Controls Bar
          Positioned(
            bottom: 30,
            left: 20,
            right: 20,
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.15),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                    icon: Icon(_isMicMuted ? Icons.mic_off : Icons.mic, color: Colors.white),
                    onPressed: () async {
                      final newVal = !_isMicMuted;
                      await _room!.localParticipant?.setMicrophoneEnabled(!newVal);
                      setState(() => _isMicMuted = newVal);
                    },
                  ),
                  IconButton(
                    icon: Icon(_isCamOff ? Icons.videocam_off : Icons.videocam, color: Colors.white),
                    onPressed: () async {
                      final newVal = !_isCamOff;
                      await _room!.localParticipant?.setCameraEnabled(!newVal);
                      setState(() => _isCamOff = newVal);
                    },
                  ),
                  FloatingActionButton(
                    backgroundColor: Colors.red,
                    onPressed: () => Navigator.pop(context),
                    child: const Icon(Icons.call_end, color: Colors.white),
                  ),
                ],
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
                    <span>{copiedKey === "flutter-screen" ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[420px]">
                  <pre>
                    <code>{`// Connect & Render Video in Flutter
final room = Room(roomOptions: const RoomOptions(adaptiveStream: true, dynacast: true));
final listener = room.createListener();

listener.on<TrackSubscribedEvent>((event) {
  if (event.track is VideoTrack) {
    setState(() => _remoteVideoTrack = event.track as VideoTrack);
  }
});

await room.connect(serverUrl, token);
await room.localParticipant?.setCameraEnabled(true);
await room.localParticipant?.setMicrophoneEnabled(true);`}</code>
                  </pre>
                </div>
              </div>

              {/* Next step CTA */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-indigo-50 border border-indigo-200">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-indigo-900">Want to customize the Flutter UI?</h4>
                  <p className="text-xs text-indigo-700">Learn how to change colors, add watermarks, and build 2x2 grids.</p>
                </div>
                <button
                  onClick={() => setActiveSection("customize")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                >
                  Customization Guide →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 2. REACT & NEXT.JS WEB SDK GUIDE */}
          {/* ============================================================= */}
          {activeSection === "react" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Web & Full-Stack</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  React & Next.js Web SDK Guide
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Easily embed video calling into React, Next.js (App or Pages router), or Remix using pre-built styled components or headless custom hooks.
                </p>
              </div>

              {/* Step 1: Install packages */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900">Step 1: Install Dependencies</h3>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`npm install @livekit/components-react @livekit/components-styles livekit-client`}</code>
                  </pre>
                </div>
              </div>

              {/* Step 2: Pre-Built UI Component */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Option A</span>
                    <h3 className="text-base font-bold text-slate-900">Instant Pre-Built Video Conference</h3>
                  </div>
                  <button
                    onClick={() =>
                      copyCode(
                        "react-prebuilt",
                        `"use client";

import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

export default function MeetingRoom({ token, serverUrl }: { token: string; serverUrl: string }) {
  return (
    <div className="h-screen w-screen">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        data-lk-theme="default"
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}`
                      )
                    }
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1"
                  >
                    {copiedKey === "react-prebuilt" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "react-prebuilt" ? "Copied" : "Copy React Code"}</span>
                  </button>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`"use client";

import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

export default function MeetingRoom({ token, serverUrl }: { token: string; serverUrl: string }) {
  return (
    <div className="h-screen w-screen">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        data-lk-theme="default"
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Option B: Headless Custom UI */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase font-mono">Option B</span>
                  <h3 className="text-base font-bold text-slate-900">Completely Custom Headless UI (Hooks)</h3>
                  <p className="text-xs text-slate-500">
                    Use <code className="font-mono text-emerald-700">useTracks()</code> to render custom video tiles with your own Tailwind CSS.
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`import { useTracks, VideoTrack } from "@livekit/components-react";
import { Track } from "livekit-client";

function CustomVideoGrid() {
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {tracks.map((trackRef) => (
        <div key={trackRef.publication.trackSid} className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-800">
          <VideoTrack trackRef={trackRef} className="w-full h-full object-cover" />
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 text-white rounded text-xs font-bold">
            {trackRef.participant.name || trackRef.participant.identity}
          </span>
        </div>
      ))}
    </div>
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
                  <span>Server-to-Server Gateway</span>
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
    const gatewayRes = await fetch("https://video-saas-1-2ldd.onrender.com/api/v1/rtc/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appId: process.env.AURARTC_APP_ID,
        appSecret: process.env.AURARTC_APP_SECRET,
        roomId: roomName,
        participantName: userName || userId,
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
          {/* 4. UI CUSTOMIZATION & THEMING MASTERCLASS */}
          {/* ============================================================= */}
          {activeSection === "customize" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-semibold border border-indigo-200">
                  <Palette className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Theming & Brand White-Labeling</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  How To Customize Video Call UIs
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Step-by-step instructions on customizing UI layouts, brand primary colors, floating control bars, participant grids, and logo watermarks in Flutter and React.
                </p>
              </div>

              {/* 1. Flutter Custom Floating Control Bar */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Flutter Customization</span>
                    <h3 className="text-base font-bold text-slate-900">Custom Floating Glassmorphic Action Bar</h3>
                  </div>
                  <button
                    onClick={() =>
                      copyCode(
                        "flutter-controls",
                        `Widget buildCustomControls({
  required bool isMuted,
  required bool isCamOff,
  required VoidCallback onToggleMic,
  required VoidCallback onToggleCam,
  required VoidCallback onSwitchCamera,
  required VoidCallback onEndCall,
}) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
    decoration: BoxDecoration(
      color: Colors.black.withOpacity(0.4),
      borderRadius: BorderRadius.circular(30),
      border: Border.all(color: Colors.white.withOpacity(0.15)),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.3),
          blurRadius: 15,
          offset: const Offset(0, 5),
        ),
      ],
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Mic Toggle
        IconButton(
          icon: Icon(isMuted ? Icons.mic_off : Icons.mic, color: isMuted ? Colors.redAccent : Colors.white),
          onPressed: onToggleMic,
        ),
        const SizedBox(width: 8),
        // Camera Toggle
        IconButton(
          icon: Icon(isCamOff ? Icons.videocam_off : Icons.videocam, color: isCamOff ? Colors.redAccent : Colors.white),
          onPressed: onToggleCam,
        ),
        const SizedBox(width: 8),
        // Flip Camera
        IconButton(
          icon: const Icon(Icons.flip_camera_ios, color: Colors.white),
          onPressed: onSwitchCamera,
        ),
        const SizedBox(width: 16),
        // End Call Pill
        GestureDetector(
          onTap: onEndCall,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.redAccent,
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Row(
              children: [
                Icon(Icons.call_end, color: Colors.white, size: 18),
                SizedBox(width: 6),
                Text("Leave", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
              ],
            ),
          ),
        ),
      ],
    ),
  );
}`
                      )
                    }
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1"
                  >
                    {copiedKey === "flutter-controls" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "flutter-controls" ? "Copied" : "Copy Controls"}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Replace the default controls with a sleek glassmorphic pill bar with front/rear camera flip and custom colored icons:
                </p>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[350px]">
                  <pre>
                    <code>{`// Custom Glassmorphic Controls Bar in Flutter
Widget buildCustomControls({
  required bool isMuted,
  required bool isCamOff,
  required VoidCallback onToggleMic,
  required VoidCallback onToggleCam,
  required VoidCallback onSwitchCamera,
  required VoidCallback onEndCall,
}) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
    decoration: BoxDecoration(
      color: Colors.black.withOpacity(0.4),
      borderRadius: BorderRadius.circular(30),
      border: Border.all(color: Colors.white.withOpacity(0.15)),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        IconButton(icon: Icon(isMuted ? Icons.mic_off : Icons.mic), onPressed: onToggleMic),
        IconButton(icon: Icon(isCamOff ? Icons.videocam_off : Icons.videocam), onPressed: onToggleCam),
        IconButton(icon: const Icon(Icons.flip_camera_ios), onPressed: onSwitchCamera),
        // End Call
        ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: Colors.red), onPressed: onEndCall, child: const Text("Leave")),
      ],
    ),
  );
}`}</code>
                  </pre>
                </div>
              </div>

              {/* 2. Flutter Custom Video Grid */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <span className="text-xs font-bold text-emerald-600 uppercase font-mono">Flutter Layout</span>
                <h3 className="text-base font-bold text-slate-900">Custom Multi-Party 2x2 Grid or Speaker Spotlight</h3>
                <p className="text-xs text-slate-500">
                  Render participants in an adaptive responsive grid with rounded corners and live speaking indicators:
                </p>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`// Dynamic Participant Grid with Speaking Glow Indicator
Widget buildParticipantGrid(List<Participant> participants) {
  return GridView.builder(
    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: participants.length <= 2 ? 1 : 2,
      childAspectRatio: 1.0,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
    ),
    itemCount: participants.length,
    itemBuilder: (context, index) {
      final p = participants[index];
      final videoTrack = p.videoTrackPublications.firstOrNull?.track as VideoTrack?;

      return Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            // Glowing border when participant is talking!
            color: p.isSpeaking ? Colors.emerald : Colors.white12,
            width: p.isSpeaking ? 3 : 1,
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: videoTrack != null
              ? VideoTrackRenderer(videoTrack)
              : Center(child: Text(p.name, style: const TextStyle(color: Colors.white))),
        ),
      );
    },
  );
}`}</code>
                  </pre>
                </div>
              </div>

              {/* 3. React / Web Theming Overrides */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <span className="text-xs font-bold text-indigo-600 uppercase font-mono">Web / React Theming</span>
                <h3 className="text-base font-bold text-slate-900">CSS Variable Theming Overrides</h3>
                <p className="text-xs text-slate-500">
                  Override default LiveKit styles by adding these custom CSS variables to your <code className="font-mono">globals.css</code>:
                </p>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`/* Custom White-Label Theme for LiveKit Web Components */
:root {
  --lk-bg: #0b0f19;                     /* Meeting room backdrop */
  --lk-accent-bg: #10b981;              /* Primary brand color (Emerald) */
  --lk-control-bar-bg: rgba(15, 23, 42, 0.75); /* Glassmorphic dock */
  --lk-border-radius: 16px;             /* Video tile corner rounding */
  --lk-participant-border-radius: 14px;
}

/* Custom Watermark Overlay */
.lk-video-conference::after {
  content: "YOUR BRAND LOGO";
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 5. INTERACTIVE LIVE TOKEN GENERATOR BENCH */}
          {/* ============================================================= */}
          {activeSection === "token-bench" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Real-Time Live Testing</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Interactive Live API Token Bench
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Test your real credentials or execute with pre-filled demo keys to generate signed WebRTC JWT tokens directly against our live production API server.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-sm text-emerald-400">Endpoint: POST /api/v1/rtc/token</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Target: video-saas-1-2ldd.onrender.com</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">App ID</label>
                    <input
                      type="text"
                      value={testAppId}
                      onChange={(e) => setTestAppId(e.target.value)}
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">App Secret</label>
                    <input
                      type="password"
                      value={testAppSecret}
                      onChange={(e) => setTestAppSecret(e.target.value)}
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Room ID / Name</label>
                    <input
                      type="text"
                      value={testRoom}
                      onChange={(e) => setTestRoom(e.target.value)}
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Participant Name</label>
                    <input
                      type="text"
                      value={testUser}
                      onChange={(e) => setTestUser(e.target.value)}
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleTestToken}
                  disabled={isTestingToken}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-xs text-white shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isTestingToken ? (
                    <span>Minting Live Token on Render Gateway...</span>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Execute POST /api/v1/rtc/token</span>
                    </>
                  )}
                </button>

                {testError && (
                  <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs">
                    ❌ <strong>Execution Error:</strong> {testError}
                  </div>
                )}

                {testResult && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">
                        ✅ Token Successfully Minted (HTTP 200 OK)
                      </span>
                      <button
                        onClick={() => copyCode("live-token", testResult.data?.token || "")}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1"
                      >
                        {copiedKey === "live-token" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy JWT</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto space-y-2">
                      <div>
                        <span className="text-slate-500">// WebSocket SFU Server URL</span>
                        <div className="text-slate-200">{testResult.data?.serverUrl}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">// Signed Access Token (JWT)</span>
                        <div className="break-all text-emerald-400">{testResult.data?.token}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 6. REST API REFERENCE */}
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
                  Endpoints to mint room access tokens, list active conferences, and check system health.
                </p>
              </div>

              {/* Endpoint 1 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold text-xs">
                    POST
                  </span>
                  <code className="text-xs font-mono font-bold text-slate-900">/api/v1/rtc/token</code>
                </div>
                <p className="text-xs text-slate-600">
                  Mints an authenticated room access token with specified publish and subscribe permissions.
                </p>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`curl -X POST https://video-saas-1-2ldd.onrender.com/api/v1/rtc/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "appId": "YOUR_APP_ID",
    "appSecret": "YOUR_APP_SECRET",
    "roomId": "conference-alpha",
    "participantName": "Alice"
  }'`}</code>
                  </pre>
                </div>
              </div>

              {/* Endpoint 2 */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 font-mono font-bold text-xs">
                    GET
                  </span>
                  <code className="text-xs font-mono font-bold text-slate-900">/health</code>
                </div>
                <p className="text-xs text-slate-600">
                  Returns live status of the Node.js API process, MongoDB database connectivity, and LiveKit Cloud gateway.
                </p>
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>
                    <code>{`curl -X GET https://video-saas-1-2ldd.onrender.com/health`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 7. 100% FREE HOSTING (NO CARD REQUIRED) */}
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
                  Here is the verified <strong>Zero Credit Card Stack</strong> to host your entire video calling platform 100% free forever.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                <h4 className="font-bold text-sm text-slate-900">The 4 Zero-Card Production Building Blocks:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-xs font-bold text-slate-900">1. Database: MongoDB Atlas (M0 Tier)</span>
                    <p className="text-xs text-slate-600">512MB storage, automated daily backups, free forever without entering any card info.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-xs font-bold text-slate-900">2. Backend API: Render.com</span>
                    <p className="text-xs text-slate-600">750 free hours/month, automatic HTTPS, connects to this GitHub repository directly.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-xs font-bold text-slate-900">3. Media SFU: LiveKit Cloud Free Tier</span>
                    <p className="text-xs text-slate-600">Sign in with GitHub. 50 GB monthly bandwidth, up to 100 concurrent callers, zero card needed.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-xs font-bold text-slate-900">4. Web App: Vercel</span>
                    <p className="text-xs text-slate-600">Automatic Next.js CI/CD, global edge CDN, unlimited deployments without card.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-28 text-center text-slate-500 font-mono text-xs">
          Loading Developer Documentation...
        </div>
      }
    >
      <DocsContent />
    </Suspense>
  );
}
