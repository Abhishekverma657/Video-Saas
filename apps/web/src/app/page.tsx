"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Video,
  Shield,
  Zap,
  Users,
  Mic,
  MonitorUp,
  FileVideo,
  Cpu,
  ArrowRight,
  Sparkles,
  Radio,
  Layers,
  Code2,
  CheckCircle2,
  Smartphone,
  Globe,
} from "lucide-react";
import ThreeHeroCanvas from "@/components/ThreeHeroCanvas";
import VideoCallMockup3D from "@/components/VideoCallMockup3D";
import LatencyBenchmark from "@/components/LatencyBenchmark";
import ArchitectureViewer from "@/components/ArchitectureViewer";
import HowItWorks from "@/components/HowItWorks";
import CodeSnippets from "@/components/CodeSnippets";
import PricingCalculator from "@/components/PricingCalculator";

export default function Home() {
  const [quickRoom, setQuickRoom] = useState("lounge-01");

  return (
    <div className="relative min-h-screen bg-[#fbfcfd] text-slate-900 overflow-hidden">
      {/* ================= HERO SECTION WITH 3D CANVAS ================= */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Interactive Three.js Background Canvas */}
        <div className="absolute inset-0 max-h-[700px] pointer-events-none -z-10 overflow-hidden opacity-75">
          <ThreeHeroCanvas />
        </div>

        {/* Ambient Radial Accent */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-emerald-400/10 via-teal-400/5 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/90 text-xs font-bold text-emerald-800 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>LiveKit SFU Cloud Engine &bull; Sub-150ms Global Mesh</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
            Real-Time Video, Voice & Live Streaming.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Built for Global Scale.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The modern CPaaS alternative to Agora and Twilio. Integrate HD multi-party video conferencing, livestreaming, and room management into Flutter, React, and native apps in under 10 lines of code.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 hover:-translate-y-0.5"
            >
              <Cpu className="w-4 h-4 text-emerald-200" />
              <span>Get Free API Keys (1,000 Mins)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/room/demo-lounge"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 hover:border-emerald-300 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-soft hover:-translate-y-0.5"
            >
              <Video className="w-4 h-4 text-emerald-600" />
              <span>Launch Live Call Room</span>
            </Link>
          </div>

          {/* Instant Room Jump Box */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="p-2 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-sm flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 pl-3">room/</span>
              <input
                type="text"
                value={quickRoom}
                onChange={(e) => setQuickRoom(e.target.value)}
                placeholder="room-name"
                className="bg-transparent text-xs font-mono font-bold text-slate-900 focus:outline-none w-full"
              />
              <Link
                href={`/room/${encodeURIComponent(quickRoom.trim() || "lounge-01")}`}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* Metric Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-slate-200/80">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">&lt; 150ms</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Global Media Latency</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">98% Dynacast</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Bandwidth Savings</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">99.99% SLA</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Carrier-Grade Reliability</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">100% White-Label</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Full Brand Customization</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3D MULTI-PARTY VIDEO CALL SHOWCASE ================= */}
      <section id="showcase" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Interactive 3D Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Realistic Multi-Party Video Experience
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Move your cursor across the device frame to test 3D gyro tilt, active speaker spotlighting, and audio waves in real time.
          </p>
        </div>

        {/* 3D Component with Active Human Video Feeds */}
        <VideoCallMockup3D />
      </section>

      {/* ================= REAL-TIME LATENCY BENCHMARKS ================= */}
      <LatencyBenchmark />

      {/* ================= CARRIER-GRADE FEATURES GRID ================= */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Enterprise Feature Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Everything You Need To Build Video Into Any Product
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            From 1-on-1 private telehealth consultations to 100-person live classroom broadcasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Multi-Party Video Conferencing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selective Forwarding Unit (SFU) delivers multi-user video grids with active speaker spotlighting and automatic layout switching.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Simulcast & Dynacast Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clients publish multiple resolution layers. SFU automatically drops resolution or pauses offscreen participant feeds to preserve mobile battery.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Audio 3A & Noise Cancellation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built-in Acoustic Echo Cancellation (AEC), Automatic Gain Control (AGC), and deep learning noise suppression for pristine studio voice quality.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <MonitorUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">HD Screen Sharing & Audio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stream full desktop, browser tabs, or application windows with 60 FPS motion handling and system audio passthrough.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero-Trust E2EE Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              DTLS-SRTP and WebRTC End-to-End Encryption (E2EE) ensure calls cannot be intercepted by any third party or rogue network.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cross-Platform Native SDKs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official SDK libraries for Flutter, React, Next.js, React Native, Swift iOS, and Kotlin Android with seamless parity.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW DEVELOPERS INTEGRATE ================= */}
      <HowItWorks />

      {/* ================= ARCHITECTURE VIEWER ================= */}
      <ArchitectureViewer />

      {/* ================= SDK CODE SNIPPETS ================= */}
      <CodeSnippets />

      {/* ================= PRICING CALCULATOR ================= */}
      <PricingCalculator />

      {/* ================= FINAL 3D CTA BANNER ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-14 text-white overflow-hidden shadow-2xl border border-slate-700/80">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              Ready To Launch?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Start Building Real-Time Video in 10 Minutes.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Register now to receive your instant Developer App ID, App Secret, and 1,000 monthly minutes. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
              >
                <span>Create Free Developer Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/docs"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors border border-white/20 flex items-center justify-center gap-2"
              >
                <span>Read Developer Docs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <span className="font-bold text-slate-900">AuraRTC SaaS Platform</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/docs" className="hover:text-emerald-600 transition-colors">
              Documentation
            </Link>
            <Link href="/dashboard" className="hover:text-emerald-600 transition-colors">
              Developer Console
            </Link>
            <Link href="/admin/login" className="hover:text-emerald-600 transition-colors">
              Admin Portal
            </Link>
            <Link href="https://github.com/Abhishekverma657/Video-Saas" target="_blank" className="hover:text-emerald-600 transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
