"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Video,
  Shield,
  Zap,
  Users,
  Mic,
  MonitorUp,
  Cpu,
  ArrowRight,
  Sparkles,
  Radio,
  Layers,
  Code2,
  CheckCircle2,
  Smartphone,
  Globe,
  Sliders,
  ExternalLink,
} from "lucide-react";
import ThreeHeroCanvas from "@/components/ThreeHeroCanvas";
import VideoCallMockup3D from "@/components/VideoCallMockup3D";
import HowItWorks from "@/components/HowItWorks";
import CodeSnippets from "@/components/CodeSnippets";

export default function Home() {
  const [quickRoom, setQuickRoom] = useState("lounge-01");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/90 text-xs font-bold text-emerald-800 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>LiveKit SFU Cloud Engine &bull; Sub-150ms Global Mesh</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]"
          >
            Real-Time Video, Voice & Live Streaming.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Built for Global Scale.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            The modern CPaaS alternative to Agora and Twilio. Integrate HD multi-party video conferencing, livestreaming, and room management into Flutter, React, and native apps in under 10 lines of code.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
          >
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
          </motion.div>

          {/* Instant Room Jump Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4 max-w-md mx-auto"
          >
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
          </motion.div>

          {/* Metric Highlights Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-slate-200/80"
          >
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
          </motion.div>
        </div>
      </section>

      {/* ================= 3D SHOWCASE TEASER SECTION ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Live 3D Perspective
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                Multi-Party Video Experience
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Active speaker spotlighting, audio waveform visualizers, and simulated device gyro tilt.
              </p>
            </div>

            <Link
              href="/showcase"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 self-start md:self-end"
            >
              <span>Open Full 3D Showcase & Speed Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3D Component with Active Human Video Feeds */}
          <VideoCallMockup3D />
        </motion.div>
      </section>

      {/* ================= CORE VALUE PILLARS (SCROLL REVEAL) ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Why Developers Build With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Engineered For Performance & Flexibility
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Everything you need to ship audio/video capabilities into mobile and web apps without infrastructure headaches.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Sub-150ms Global SFU Mesh</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selective Forwarding Unit route audio/video directly to nearest edge nodes. Dynacast automatically throttles resolutions for low-bandwidth devices.
            </p>
            <Link href="/architecture" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 pt-2">
              <span>View SFU Architecture</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">First-Class Flutter & Web SDKs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Native Flutter SDK with hardware acceleration, audio management, and background calling. React & Next.js components with pre-built or headless UI options.
            </p>
            <Link href="/docs" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 pt-2">
              <span>Explore SDK Guides</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white border border-slate-200/80 hover:border-emerald-300 p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% White-Label & Customizable</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No forced watermarks or locked UI layouts. Customize colors, buttons, audio bars, video grids, and brand logos to match your product perfectly.
            </p>
            <Link href="/features" className="text-xs font-bold text-indigo-700 hover:text-indigo-800 inline-flex items-center gap-1 pt-2">
              <span>See All Platform Features</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= HOW DEVELOPERS INTEGRATE ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <HowItWorks />
      </motion.section>

      {/* ================= CODE SNIPPETS SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <CodeSnippets />
      </motion.section>

      {/* ================= PRICING TEASER CALLOUT ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/80 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
              Transparent Pricing
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              1,000 Free Minutes Every Month.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Only $0.0015/min after that. Try our interactive minutes slider to calculate exact costs for your startup or enterprise.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Calculate Your Usage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= FINAL 3D CTA BANNER ================= */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-14 text-white overflow-hidden shadow-2xl border border-slate-700/80"
        >
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
        </motion.div>
      </section>
    </div>
  );
}
