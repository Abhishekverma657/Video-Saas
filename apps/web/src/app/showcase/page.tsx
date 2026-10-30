"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Radio,
  Zap,
  Video,
  Mic,
  MonitorUp,
  Cpu,
  ArrowRight,
  Sparkles,
  Wifi,
  Activity,
  Layers,
  Settings,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import VideoCallMockup3D from "@/components/VideoCallMockup3D";
import LatencyBenchmark from "@/components/LatencyBenchmark";

export default function ShowcasePage() {
  const [roomInput, setRoomInput] = useState("showcase-lounge");

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900 pt-24 pb-20">
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Interactive 3D Demo & Benchmarks</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Experience Real-Time Video{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              In 3D Perspective.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Interact with our simulated 3D multi-party conference frame, test live global edge node latency, or launch an instant live call room right now.
          </p>

          {/* Quick Room Launcher */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="p-2 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 pl-3">room/</span>
              <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="room-name"
                className="bg-transparent text-xs font-mono font-bold text-slate-900 focus:outline-none w-full"
              />
              <Link
                href={`/room/${encodeURIComponent(roomInput.trim() || "showcase-lounge")}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Launch Room</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3D Video Call Conference Mockup */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Interactive 3D Device Gyro Tilt
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Hover and drag across the screen to experience real-time 3D rotation, dynamic speaker spotlights, and visual audio waveforms.
            </p>
          </div>

          <VideoCallMockup3D />
        </motion.div>
      </section>

      {/* Latency Benchmark Engine */}
      <section id="speedtest" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LatencyBenchmark />
        </motion.div>
      </section>

      {/* Developer Quality of Experience Diagnostic Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              QoE Engine Diagnostics
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Under-The-Hood Performance Metrics
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              How AuraRTC monitors packet loss, jitter buffers, and bitrate adaptation continuously on every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Packet Loss Concealment (PLC)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">Active</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Opus FEC and NetEQ algorithms synthesize lost audio packets up to 30% network packet drop without audible clipping.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Adaptive Jitter Buffer</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">Dynamic</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Auto-tunes buffer depth between 20ms and 80ms based on cellular 4G/5G mobile tower handoffs and Wi-Fi congestion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Dynamic Resolution Scaling</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">Simulcast</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Seamlessly shifts between 1080p, 720p, 360p, and 180p without renegotiation or WebRTC ICE restart hiccups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-2xl font-bold">Want to see the code behind this?</h3>
            <p className="text-xs text-slate-400">
              Check out our line-by-line Flutter, React, and Node.js implementation guides.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Open SDK Documentation
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              Get API Keys
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
