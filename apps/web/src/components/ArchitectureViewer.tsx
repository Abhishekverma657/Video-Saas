"use client";

import { useState } from "react";
import { Server, Shield, Video, Database } from "lucide-react";

export default function ArchitectureViewer() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 0,
      title: "1. Client SDK Layer",
      icon: Video,
      subtitle: "WebRTC Engine on Devices",
      tech: "Flutter, React, iOS, Android, WASM",
      details: [
        "Captures 1080p/720p/360p video tracks with native hardware acceleration.",
        "Audio 3A pipeline: AEC3 (Echo cancel), ANS (Noise suppression), AGC (Gain).",
        "Generates 3 simulcast layers (High, Med, Low) dynamically based on network.",
      ],
      protocols: ["SRTP", "Opus", "H.264 / VP8", "WebRTC DataChannel"],
    },
    {
      id: 1,
      title: "2. Edge & NAT Traversal",
      icon: Shield,
      subtitle: "Geo-DNS & Coturn STUN/TURN",
      tech: "Anycast Routing, UDP Port 50000-60000, TCP 443",
      details: [
        "Resolves optimal low-latency node closest to user's geographic location.",
        "STUN discovers public IP/port behind symmetric NAT.",
        "TURN over TCP/TLS 443 bypasses strict corporate and campus firewalls.",
      ],
      protocols: ["STUN (RFC 5389)", "TURN (RFC 5766)", "TLS 443", "ICE"],
    },
    {
      id: 2,
      title: "3. LiveKit SFU Core Fabric",
      icon: Server,
      subtitle: "Selective Forwarding Unit",
      tech: "Go & Rust Core, Distributed Cluster",
      details: [
        "Zero server transcoding overhead: Each client uploads 1 stream only.",
        "Dynacast: Pauses video forwarding if subscriber minimizes tile, saving 80% bandwidth.",
        "Sub-150ms global latency packet forwarding with FEC (Forward Error Correction).",
      ],
      protocols: ["WSS Signaling", "RTCP BWE", "TWCC Congestion Control"],
    },
    {
      id: 3,
      title: "4. SaaS Metering & Egress",
      icon: Database,
      subtitle: "Usage Tracking & Cloud Storage",
      tech: "Node.js Express, MongoDB Atlas, Redis, S3",
      details: [
        "LiveKit webhooks capture participant_joined and participant_left events.",
        "Atomically debits participant-minutes from project balance in MongoDB.",
        "Egress service mixes composite grid into MP4 and pushes directly to Cloud Storage.",
      ],
      protocols: ["REST JSON", "Mongoose", "HMAC Webhooks", "S3 API"],
    },
  ];

  const current = steps[activeStep];

  return (
    <div className="w-full light-card rounded-2xl p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Step Selector Buttons */}
        <div className="w-full lg:w-1/3 space-y-2.5">
          <h3 className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-3">
            Pipeline Architecture
          </h3>
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center gap-3.5 ${
                  isSelected
                    ? "bg-emerald-50 border-2 border-emerald-500 shadow-sm"
                    : "bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-slate-500">{step.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Breakdown Card */}
        <div className="w-full lg:w-2/3 bg-slate-50/70 rounded-xl p-6 border border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{current.title}</h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{current.tech}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Active Stage
            </span>
          </div>

          {/* Bullet points */}
          <div className="space-y-2.5">
            <h5 className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              Technical Details
            </h5>
            <ul className="space-y-2">
              {current.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocols badges */}
          <div className="pt-3 border-t border-slate-200">
            <h5 className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2.5">
              Network & Media Protocols
            </h5>
            <div className="flex flex-wrap gap-2">
              {current.protocols.map((proto, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-white border border-slate-200 text-slate-800"
                >
                  {proto}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
