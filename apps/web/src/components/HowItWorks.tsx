"use client";

import { useState } from "react";
import Link from "next/link";
import {
  KeyRound,
  ShieldCheck,
  Video,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Code2,
  Sparkles,
  Users,
  Radio,
  Share2,
} from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Get API Credentials",
      subtitle: "Instant Provisioning",
      icon: KeyRound,
      badge: "Step 1",
      description:
        "Create your developer account in under 30 seconds. Your workspace is automatically provisioned in MongoDB with a unique App ID, App Secret, and 10,000 free starter minutes.",
      terminalTitle: "Developer Console / API Keys",
      code: `// Issued automatically upon account creation:
const config = {
  appId: "app_7f39a0129bc48d91",
  appSecret: "sec_9a8b7c6d5e4f3a2b1c0e9d8c7b6a5f4e",
  sfuEndpoint: "ws://127.0.0.1:7880",
};`,
      actionText: "Create Free Account",
      actionLink: "/register",
    },
    {
      num: "02",
      title: "Request Room Token",
      subtitle: "Secure Server-to-Server",
      icon: ShieldCheck,
      badge: "Step 2",
      description:
        "Call the AuraRTC token endpoint from your server or backend with your App ID and Secret. The engine signs an encrypted WebRTC JWT token with participant permissions and room grant.",
      terminalTitle: "POST /api/v1/rtc/token",
      code: `// Server-side token issuance:
const response = await fetch("http://localhost:5001/api/v1/rtc/token", {
  method: "POST",
  headers: {
    "x-app-id": config.appId,
    "x-app-secret": config.appSecret,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    roomName: "boardroom-alpha",
    participantIdentity: "user_abhishek_01",
    participantName: "Abhishek",
  }),
});

const { token } = await response.json();`,
      actionText: "View Token Docs",
      actionLink: "/dashboard",
    },
    {
      num: "03",
      title: "Connect & Render Video",
      subtitle: "Zero Complex Signaling",
      icon: Video,
      badge: "Step 3",
      description:
        "Pass the room token to the AuraRTC client SDK or LiveKit WebRTC component. The client connects to the nearest SFU edge node in <150ms with automatic simulcast and speaker layout.",
      terminalTitle: "Client Component (React / Next.js)",
      code: `// Client-side video room mount:
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

export function VideoMeeting({ token }) {
  return (
    <LiveKitRoom
      serverUrl="ws://127.0.0.1:7880"
      token={token}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}`,
      actionText: "Test Room Simulator",
      actionLink: "/room/demo-lounge",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Platform Capabilities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">What It Is</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            AuraRTC Cloud is an enterprise-grade WebRTC Selective Forwarding Unit (SFU) platform delivering sub-150ms HD video calling, audio rooms, and interactive live streams.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">What It Does</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Handles multi-party video conferencing, 1-on-1 calling, PK interactive co-hosting, screen sharing, AI noise suppression, and automatic layout management out of the box.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">How It Integrates</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Embed via React, Next.js, Flutter, iOS, or Android SDKs. All signaling, STUN/TURN NAT traversal, and bandwidth adaptation are handled automatically by the server.
          </p>
        </div>
      </div>

      {/* 3-Step Interactive Process */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        {/* Step Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 rounded-2xl border transition-all relative ${
                  isSelected
                    ? "bg-emerald-50/50 border-emerald-500 shadow-sm ring-1 ring-emerald-500"
                    : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    {step.num}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900">{step.title}</div>
                <div className="text-[11px] text-slate-500 font-medium">{step.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail & Code Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Step Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{steps[activeStep].badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {steps[activeStep].title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="pt-2">
              <Link
                href={steps[activeStep].actionLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-sm group"
              >
                <span>{steps[activeStep].actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Code & Terminal Block */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-md">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    {steps[activeStep].terminalTitle}
                  </span>
                </div>
                <Code2 className="w-3.5 h-3.5 text-slate-500" />
              </div>

              <div className="p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
                  <code>{steps[activeStep].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
