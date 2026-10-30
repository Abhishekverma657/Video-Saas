"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Zap,
  Mic,
  MonitorUp,
  Shield,
  Smartphone,
  Globe,
  Radio,
  FileVideo,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
  Headphones,
  Sliders,
  Webhook,
  Activity,
  XCircle,
} from "lucide-react";

export default function FeaturesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features = [
    {
      icon: Users,
      title: "Selective Forwarding Unit (SFU)",
      subtitle: "Multi-party mesh without peer-to-peer CPU bottlenecks",
      desc: "Each client sends only 1 uplink video stream. The LiveKit SFU distributes audio/video tracks to hundreds of subscribers, reducing mobile CPU load by up to 85% compared to mesh WebRTC.",
      tags: ["SFU Routing", "Sub-150ms", "Active Speaker"],
      color: "emerald",
    },
    {
      icon: Zap,
      title: "Dynacast & Simulcast Engine",
      subtitle: "Smart adaptive bitrate across poor network connections",
      desc: "Automatically detects viewer screen sizes and throttles resolution. If a participant is minimized or offscreen, their video subscription is automatically paused to conserve mobile data and battery.",
      tags: ["Simulcast", "Dynacast", "Adaptive Bitrate"],
      color: "teal",
    },
    {
      icon: Lock,
      title: "Zero-Trust End-to-End Encryption",
      subtitle: "Enterprise cryptographic privacy powered by WebCrypto",
      desc: "Video frames and audio buffers are encrypted on the publishing device before leaving the browser/app. Keys are negotiated peer-to-peer; the SFU server cannot inspect payload data.",
      tags: ["E2EE", "DTLS-SRTP", "AES-GCM-256"],
      color: "indigo",
    },
    {
      icon: Headphones,
      title: "AI Noise Suppression & Spatial Audio",
      subtitle: "Studio-grade voice isolation and acoustic echo cancellation",
      desc: "Deep learning models eliminate background noises like dogs barking, keyboard clicks, and HVAC hum in real time. Full 3D spatial audio positioning delivers natural conversational immersion.",
      tags: ["RNNoise", "AEC & AGC", "3D Spatial Audio"],
      color: "cyan",
    },
    {
      icon: MonitorUp,
      title: "4K Screen Sharing & System Audio",
      subtitle: "Crystal-clear presentation and remote collaboration",
      desc: "Stream crisp text, high-framerate 60 FPS motion videos, or whole desktop displays with low latency. Includes full system audio passthrough and cursor coordinate tracking.",
      tags: ["4K Resolution", "60 FPS", "Tab & Window"],
      color: "amber",
    },
    {
      icon: FileVideo,
      title: "Server-Side Composite Recording (Egress)",
      subtitle: "Export MP4 video files directly to S3 / Google Cloud Storage",
      desc: "Record multi-party conferences as a single merged MP4 video file or individual participant audio/video tracks. Supports instant RTMP livestreaming out to YouTube, Twitch, or custom CDN.",
      tags: ["Egress MP4", "S3 & GCS Sync", "RTMP Stream"],
      color: "rose",
    },
    {
      icon: Webhook,
      title: "Real-Time Webhooks & Server Events",
      subtitle: "Automate room lifecycles and trigger billing meters",
      desc: "Receive instant cryptographic HTTP webhook callbacks on `participant_joined`, `participant_left`, `room_started`, and `egress_ended` to synchronize with your core backend database.",
      tags: ["HMAC Signatures", "Sub-50ms Event Delivery", "REST API"],
      color: "violet",
    },
    {
      icon: Sliders,
      title: "100% White-Label & Custom UI Theming",
      subtitle: "Complete visual freedom with headless hooks or styled components",
      desc: "Build completely custom video calling UIs using headless SDK hooks (`useTracks`, `useParticipants`) or drop in production-ready prebuilt components customized with your brand colors.",
      tags: ["Headless UI", "Custom CSS", "Brand Watermarks"],
      color: "emerald",
    },
  ];

  const comparisons = [
    {
      feature: "Global SFU Latency",
      aurartc: "< 150ms Global Mesh",
      agora: "300ms - 500ms",
      twilio: "Deprecated / Legacy",
      daily: "200ms - 350ms",
    },
    {
      feature: "E2EE Encryption",
      aurartc: "Native Built-in (AES-256)",
      agora: "Complex Add-on",
      twilio: "Not Available",
      daily: "Experimental",
    },
    {
      feature: "Flutter & Mobile SDK",
      aurartc: "First-Class Native SDK",
      agora: "Heavy C++ Wrapper",
      twilio: "End of Life",
      daily: "Web-view Fallback",
    },
    {
      feature: "Pricing Transparency",
      aurartc: "$0.0015 / min flat",
      agora: "$0.0039 + High Bandwidth fees",
      twilio: "Discontinued",
      daily: "$0.0040 / min",
    },
    {
      feature: "Self-Host / Cloud Choice",
      aurartc: "Cloud or On-Premise",
      agora: "Proprietary Cloud Lock-in",
      twilio: "Lock-in",
      daily: "Cloud Only",
    },
    {
      feature: "Dynacast Bandwidth Savings",
      aurartc: "Up to 98% Reduction",
      agora: "Basic Simulcast",
      twilio: "No Dynacast",
      daily: "Standard",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900 pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Carrier-Grade Real-Time Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Engineered For Low Latency,{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Built For Developers.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything your engineering team needs to embed audio, video, screen-sharing, and interactive broadcasting into Flutter, React, iOS, and Android applications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Get Free API Key</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/showcase"
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 font-bold text-xs shadow-xs transition-all"
            >
              <span>Try Interactive 3D Demo</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid with Scroll Reveal */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200/80 hover:border-emerald-300 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800/80 mt-0.5">
                      {feat.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {feat.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/60 text-[10px] font-mono text-slate-600 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Comparison Matrix: AuraRTC vs Legacy CPaaS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Benchmark Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Why Engineers Choose AuraRTC Over Agora & Twilio
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              No proprietary vendor lock-in, modern open WebRTC standards, and predictable pricing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Feature / Capability</th>
                  <th className="py-3.5 px-4 text-emerald-700 bg-emerald-50/60 rounded-t-xl font-black">
                    AuraRTC Cloud
                  </th>
                  <th className="py-3.5 px-4">Agora RTC</th>
                  <th className="py-3.5 px-4">Twilio Video</th>
                  <th className="py-3.5 px-4">Daily.co</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 bg-emerald-50/40 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.aurartc}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{row.agora}</td>
                    <td className="py-3.5 px-4 text-rose-500 font-semibold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{row.twilio}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{row.daily}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to test in your own application?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get your free API credentials in 30 seconds and test our live room with up to 1,000 monthly minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/register"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
            >
              Get Free API Keys
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              Explore SDK Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
