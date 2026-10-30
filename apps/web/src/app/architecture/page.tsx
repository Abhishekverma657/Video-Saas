"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  Cpu,
  Server,
  Database,
  Radio,
  Lock,
  Zap,
  Globe,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Network,
  Activity,
} from "lucide-react";
import ArchitectureViewer from "@/components/ArchitectureViewer";

export default function ArchitecturePage() {
  const architecturalPillars = [
    {
      icon: Smartphone,
      title: "1. Client SDK Tier",
      tech: "Flutter, React, iOS, Android",
      desc: "Client devices capture microphone and camera streams, encode packets via hardware H.264/VP9/AV1 codecs, and negotiate WebRTC SDP offers/answers over secure WebSockets.",
      points: [
        "Hardware-accelerated media capture",
        "Adaptive audio processing (AEC, AGC, RNNoise)",
        "Automatic reconnection on cellular Wi-Fi transitions",
      ],
    },
    {
      icon: Server,
      title: "2. CPaaS API & Auth Tier",
      tech: "Node.js, Express, TypeScript",
      desc: "Handles developer authentication, generates cryptographically signed JWT tokens with granular room permissions (publish audio, publish video, subscribe, admin), and dispatches webhooks.",
      points: [
        "HMAC SHA-256 signed access tokens",
        "Granular participant role management",
        "Webhook event queue with exponential backoff",
      ],
    },
    {
      icon: Radio,
      title: "3. LiveKit SFU Routing Engine",
      tech: "Go, Pion WebRTC, Dynacast",
      desc: "Selective Forwarding Unit (SFU) forwards individual RTP packets without re-encoding, preserving sub-150ms global latency and drastically minimizing server CPU overhead.",
      points: [
        "Selective track subscription (Dynacast)",
        "Zero transcoding overhead for lowest latency",
        "Multi-region mesh routing",
      ],
    },
    {
      icon: Database,
      title: "4. State & Persistence Tier",
      tech: "MongoDB Atlas Cloud",
      desc: "High-availability replica cluster storing API credentials, active participant session records, room logs, usage minutes metrics, and enterprise audit trails.",
      points: [
        "Sub-millisecond query indexing",
        "Enterprise network encryption in-transit and at-rest",
        "Automatic geo-replicated backups",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900 pt-24 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-800">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Infrastructure Deep-Dive</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            High-Performance WebRTC{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Media Mesh Architecture.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Discover how AuraRTC decouples media packet routing from business logic to deliver sub-150ms latency across 6 continents.
          </p>
        </motion.div>
      </section>

      {/* Interactive Architecture Topology Diagram */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <ArchitectureViewer />
      </section>

      {/* 4 Architectural Pillars Grid with Scroll Reveal */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            System Topology
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The 4 Foundational Infrastructure Tiers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {architecturalPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                    <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {pillar.tech}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Security & Cryptography Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Zero-Trust Cryptography
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                End-to-End Encryption (E2EE) Without Intermediary Trust
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                By leveraging WebRTC Insertable Streams and the WebCrypto API, audio frames and video keyframes are encrypted with client-generated AES-GCM-256 keys. Even if the SFU media server is inspected, all packet payloads remain completely unreadable ciphertext.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-mono font-bold text-slate-700">
                  DTLS-SRTP
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-mono font-bold text-slate-700">
                  AES-GCM-256
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-mono font-bold text-slate-700">
                  WebCrypto API
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 text-white font-mono text-xs space-y-3 shadow-inner">
              <div className="text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>e2ee-key-exchange.ts</span>
                <span className="text-emerald-400 text-[10px]">VERIFIED</span>
              </div>
              <pre className="text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
{`// Client-Side E2EE Frame Encryption
const keyProvider = new ExternalE2EEKeyProvider();
await keyProvider.setKey(sharedMeetingPassphrase);

const room = new Room({
  e2ee: {
    keyProvider,
    worker: new Worker('/livekit-e2ee.worker.js'),
  },
});

// Packets forwarded by SFU as encrypted ciphertext
await room.connect(livekitUrl, token);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-2xl font-bold">Ready to integrate this architecture?</h3>
            <p className="text-xs text-slate-400">
              Get started with our step-by-step Flutter, React, and Node.js SDK documentation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Open SDK Docs
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              Get Free API Keys
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
