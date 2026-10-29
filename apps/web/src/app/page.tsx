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
} from "lucide-react";
import VideoCallMockup3D from "@/components/VideoCallMockup3D";
import ArchitectureViewer from "@/components/ArchitectureViewer";
import HowItWorks from "@/components/HowItWorks";
import CodeSnippets from "@/components/CodeSnippets";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fbfcfd] text-slate-900 overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Ambient Background Accents */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ultra-Low Latency Real-Time Communication Cloud</span>
          </div>

          {/* Clean Light Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Real-Time Video, Voice & Live Streaming.{" "}
            <span className="text-emerald-600">Built for Global Scale.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Carrier-grade WebRTC SFU engine powered by LiveKit, Node.js, and MongoDB Atlas.
            Sub-150ms global media latency, adaptive simulcast, and full developer control.
          </p>

          {/* Clean Solid CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-greenGlow hover:-translate-y-0.5"
            >
              <Cpu className="w-4 h-4" />
              <span>Launch Developer Console</span>
            </Link>

            <Link
              href="/room/lounge-01"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-soft hover:-translate-y-0.5"
            >
              <Video className="w-4 h-4 text-emerald-600" />
              <span>Test Live Call Room</span>
            </Link>
          </div>

          {/* Metric Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-200/80">
            <div className="p-3">
              <div className="text-2xl font-black font-mono text-emerald-600">&lt; 150ms</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Global Media Latency</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black font-mono text-slate-900">98% Dynacast</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Bandwidth Efficiency</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black font-mono text-emerald-600">99.99% SLA</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">High Availability Mesh</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black font-mono text-slate-900">100% Private</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Full Data Sovereignty</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3D REAL HUMAN VIDEO CALL SHOWCASE ================= */}
      <section id="showcase" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Interactive 3D Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Realistic Multi-Party Video Experience
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Move your mouse over the screen to explore 3D depth, live active speaker detection, and floating metrics.
          </p>
        </div>

        {/* 3D Component with Real Human Streams */}
        <VideoCallMockup3D />
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
            Carrier-Grade Features
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Comprehensive Real-Time Video, Audio & Broadcast Suite
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            From 1-on-1 private calls to 100-person interactive video classrooms, every tool is ready out of the box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="light-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Multi-Party Video Conferencing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selective Forwarding Unit (SFU) delivers multi-user video grids with active speaker spotlighting and automatic layout switching.
            </p>
          </div>

          {/* Card 2 */}
          <div className="light-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Simulcast & Dynacast Engine</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clients publish multiple resolution layers. SFU automatically drops resolution or pauses offscreen participant feeds to optimize bandwidth.
            </p>
          </div>

          {/* Card 3 */}
          <div className="light-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Audio 3A & AI Noise Cancellation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrated Acoustic Echo Cancellation (AEC), Automatic Gain Control (AGC), and deep learning noise suppression for voice clarity.
            </p>
          </div>

          {/* Card 4 */}
          <div className="light-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <MonitorUp className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Ultra-Crisp Screen Sharing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full desktop or selective application window sharing at 30/60fps 1080p with integrated system audio passthrough.
            </p>
          </div>

          {/* Card 5 */}
          <div className="light-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <FileVideo className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Cloud Recording & Egress</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Server-side compositor renders call sessions into composite MP4 videos and pushes directly to Amazon S3, Cloudflare R2, or MinIO.
            </p>
          </div>

          {/* Card 6 */}
          <div className="light-card-hover p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Developer SaaS Metering</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete API Key management (`appId` & `appSecret`), webhook session duration tracking, and automated minute deductions in MongoDB.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE SECTION ================= */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
            Under The Hood
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Distributed SFU & SaaS Architecture
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Click any layer to inspect protocol mechanics, NAT traversal, and server-side forwarding.
          </p>
        </div>

        <ArchitectureViewer />
      </section>

      {/* ================= HOW IT WORKS & INTEGRATION FLOW ================= */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
            Integration Workflow
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How It Works & How To Use It
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Get your credentials, issue secure session tokens, and mount interactive video rooms in 3 simple steps.
          </p>
        </div>

        <HowItWorks />
      </section>

      {/* ================= CODE QUICKSTART SECTION ================= */}
      <section id="code" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
            Developer Friendly
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Integrate Video Calling in 5 Lines of Code
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Clean code examples for React, Next.js, Flutter, Node.js, and REST APIs.
          </p>
        </div>

        <CodeSnippets />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">AuraRTC Platform</span>
          <span>© 2026. Enterprise WebRTC Stack.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:text-emerald-600 transition-colors">
            Developer Console
          </Link>
          <Link href="/room/demo-standup" className="hover:text-emerald-600 transition-colors">
            Live Meeting Room
          </Link>
          <Link href="/#how-it-works" className="hover:text-emerald-600 transition-colors">
            How It Works
          </Link>
        </div>
      </footer>
    </div>
  );
}
