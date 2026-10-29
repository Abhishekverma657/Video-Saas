"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video,
  MonitorUp,
  MessageSquare,
  PhoneOff,
  Users,
  ShieldCheck,
  Signal,
  Sparkles,
  Heart,
  Volume2,
} from "lucide-react";

export default function VideoCallMockup3D() {
  const [activeTab, setActiveTab] = useState<"group" | "livestream" | "oneonone">("group");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Mouse 3D tilt tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 6, y: -4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle 3D tilt
    const rotX = -(y / rect.height) * 12 + 4;
    const rotY = (x / rect.width) * 16 - 2;
    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 5, y: -3 });
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab("group")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === "group"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
          }`}
        >
          Group Video Conference
        </button>
        <button
          onClick={() => setActiveTab("livestream")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === "livestream"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
          }`}
        >
          Interactive Live Streaming & PK
        </button>
        <button
          onClick={() => setActiveTab("oneonone")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === "oneonone"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
          }`}
        >
          1-on-1 Ultra-HD Private Call
        </button>
      </div>

      {/* 3D Perspective Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="perspective-container relative w-full flex items-center justify-center"
      >
        {/* Main 3D Floating Window */}
        <div
          className="preserve-3d w-full bg-slate-950 rounded-2xl md:rounded-3xl border-[6px] md:border-[10px] border-slate-900 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.35)] transition-transform duration-200 ease-out overflow-visible relative"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* Top Window Header */}
          <div className="bg-slate-900 px-4 md:px-6 py-3 border-b border-slate-800 flex items-center justify-between rounded-t-xl text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="font-semibold text-white ml-2 text-xs">
                {activeTab === "group"
                  ? "⚡ Global Product Review Standup"
                  : activeTab === "livestream"
                  ? "🔴 Live Gaming Showdown (12.4k Viewers)"
                  : "🔒 Dr. Sharma - Patient Consultation"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                1080p 60fps
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                SRTP Secured
              </span>
            </div>
          </div>

          {/* ================= CALL VIDEO VIEWPORT ================= */}
          <div className="p-3 md:p-5 bg-slate-950 min-h-[420px] md:min-h-[500px] flex flex-col justify-between relative overflow-hidden">
            {/* Grid Layouts according to Active Tab */}
            {activeTab === "group" && (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 flex-1">
                {/* Tile 1: Active Speaker (Real human photo from high-res Unsplash) */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20 group">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    alt="Sarah Connor"
                    className="w-full h-48 md:h-64 object-cover object-top"
                  />
                  {/* Active Speaker Ring Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-emerald-500/40 text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
                    <span className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-emerald-400 rounded wave-bar-1" />
                      <span className="w-0.5 bg-emerald-400 rounded wave-bar-2" />
                      <span className="w-0.5 bg-emerald-400 rounded wave-bar-3" />
                      <span className="w-0.5 bg-emerald-400 rounded wave-bar-4" />
                    </span>
                    <span>Sarah (Speaking)</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white text-[11px]">
                    Product Lead
                  </div>
                </div>

                {/* Tile 2: Rahul Sharma (Engineer) */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                    alt="Rahul Sharma"
                    className="w-full h-48 md:h-64 object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] flex items-center gap-1.5">
                    <Mic className="w-3 h-3 text-emerald-400" />
                    <span>Rahul Sharma</span>
                  </div>
                </div>

                {/* Tile 3: Priya Patel (Designer) */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Priya Patel"
                    className="w-full h-48 md:h-64 object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] flex items-center gap-1.5">
                    <Mic className="w-3 h-3 text-emerald-400" />
                    <span>Priya Patel</span>
                  </div>
                </div>

                {/* Tile 4: Alex Chen (DevOps) */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
                    alt="Alex Chen"
                    className="w-full h-48 md:h-64 object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] flex items-center gap-1.5">
                    <Mic className="w-3 h-3 text-emerald-400" />
                    <span>Alex Chen</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "livestream" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {/* Host Stream */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border-2 border-emerald-500">
                  <img
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80"
                    alt="Host"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Host 1 (Co-Host PK)
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-xs">
                    Marcus Vance • 7.8k Likes
                  </div>
                </div>

                {/* Co-Host Battle Partner */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border-2 border-emerald-500">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
                    alt="Co-Host"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Host 2 (PK Partner)
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-xs">
                    Elena Rostova • 6.2k Likes
                  </div>
                </div>
              </div>
            )}

            {activeTab === "oneonone" && (
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex-1">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor Consultation"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Dr. Sharma (Cardiologist) • HD Video Active</span>
                </div>

                {/* Picture in Picture Self Preview */}
                <div className="absolute bottom-4 right-4 w-32 md:w-44 h-24 md:h-32 rounded-lg overflow-hidden border-2 border-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Patient Self View"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white">
                    You (Patient)
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Meeting Controls Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-full text-white transition-colors ${
                    isMuted ? "bg-rose-600 hover:bg-rose-500" : "bg-slate-800 hover:bg-slate-700"
                  }`}
                  title={isMuted ? "Unmute Mic" : "Mute Mic"}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  onClick={() => setIsCameraOff(!isCameraOff)}
                  className={`p-2.5 rounded-full text-white transition-colors ${
                    isCameraOff ? "bg-rose-600 hover:bg-rose-500" : "bg-slate-800 hover:bg-slate-700"
                  }`}
                  title={isCameraOff ? "Turn Video On" : "Turn Video Off"}
                >
                  <Video className="w-4 h-4" />
                </button>

                <button className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                  <MonitorUp className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Leave Call */}
              <button className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors">
                <PhoneOff className="w-3.5 h-3.5" />
                <span>Leave</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= 3D FLOATING POPOUT WIDGETS ================= */}
        {/* Floating Card 1: Top Left Ultra Low Latency */}
        <div
          className="hidden md:flex absolute -top-6 -left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200/90 shadow-floating text-slate-800 items-center gap-3 animate-float"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <Signal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Latency: 58ms</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-[11px] text-slate-500 font-mono">0.0% Loss • Dynacast Active</p>
          </div>
        </div>

        {/* Floating Card 2: Top Right AI Noise Cancellation */}
        <div
          className="hidden md:flex absolute -top-6 -right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200/90 shadow-floating text-slate-800 items-center gap-3 animate-float"
          style={{ transform: "translateZ(45px)", animationDelay: "1.5s" }}
        >
          <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">AI Noise Cancelled</div>
            <p className="text-[11px] text-slate-500 font-mono">-35dB Keyboard/Fan noise cut</p>
          </div>
        </div>

        {/* Floating Card 3: Bottom Left Live Floating Reaction */}
        <div
          className="hidden md:flex absolute -bottom-6 -left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-floating text-slate-800 items-center gap-2"
          style={{ transform: "translateZ(35px)" }}
        >
          <span className="text-lg">👏</span>
          <span className="text-xs font-semibold text-slate-700">Alex clapped</span>
          <span className="text-lg ml-1">🔥</span>
        </div>
      </div>
    </div>
  );
}
