"use client";

import { useState } from "react";
import { Zap, Globe, Shield, RefreshCw, CheckCircle2, Activity, Cpu, ArrowUpRight } from "lucide-react";

interface NodeMetric {
  city: string;
  region: string;
  code: string;
  basePing: number;
  jitter: string;
  status: "Optimal" | "Fast" | "Operational";
}

const NODES: NodeMetric[] = [
  { city: "Mumbai", region: "India / South Asia", code: "ap-south-1", basePing: 18, jitter: "0.8ms", status: "Optimal" },
  { city: "Singapore", region: "Asia-Pacific Edge", code: "ap-southeast-1", basePing: 32, jitter: "1.1ms", status: "Optimal" },
  { city: "Tokyo", region: "East Asia", code: "ap-northeast-1", basePing: 48, jitter: "1.3ms", status: "Optimal" },
  { city: "Frankfurt", region: "Europe Central", code: "eu-central-1", basePing: 96, jitter: "1.6ms", status: "Fast" },
  { city: "North Virginia", region: "US East Coast", code: "us-east-1", basePing: 122, jitter: "1.9ms", status: "Fast" },
  { city: "Oregon", region: "US West Coast", code: "us-west-2", basePing: 139, jitter: "2.1ms", status: "Operational" },
];

export default function LatencyBenchmark() {
  const [testing, setTesting] = useState(false);
  const [activeResults, setActiveResults] = useState(
    NODES.map((n) => ({ ...n, currentPing: n.basePing }))
  );
  const [packetLoss, setPacketLoss] = useState("0.00%");

  const runBenchmark = () => {
    setTesting(true);
    let count = 0;
    const interval = setInterval(() => {
      setActiveResults((prev) =>
        prev.map((item) => ({
          ...item,
          currentPing: Math.max(12, Math.round(item.basePing + (Math.random() * 8 - 4))),
        }))
      );
      count++;
      if (count > 6) {
        clearInterval(interval);
        setTesting(false);
        setPacketLoss("0.00%");
      }
    }, 250);
  };

  return (
    <section id="benchmark" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-sm">
          <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Real-Time Global Mesh Telemetry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Sub-150ms Global SFU Latency Benchmarks
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          OmniRTC routes video packets across intelligent edge nodes with zero server bottlenecks, adaptive simulcast, and automated bitrate throttling.
        </p>
      </div>

      {/* Interactive Speed Test Board */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.06)] relative overflow-hidden">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900">Active LiveKit Edge Clusters</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-100 text-emerald-800">
                Healthy
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulated UDP WebRTC round-trip time (RTT) from client to nearest cluster
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] font-medium text-slate-400">Packet Loss</div>
              <div className="text-xs font-mono font-bold text-emerald-600">{packetLoss}</div>
            </div>

            <button
              onClick={runBenchmark}
              disabled={testing}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm disabled:opacity-75"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${testing ? "animate-spin" : ""}`} />
              <span>{testing ? "Testing Route..." : "Ping Global Mesh"}</span>
            </button>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {activeResults.map((node) => (
            <div
              key={node.code}
              className="p-4 rounded-2xl bg-[#fbfcfd] border border-slate-200/80 hover:border-emerald-300 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{node.city}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {node.code}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{node.region}</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black font-mono text-emerald-600">
                    {node.currentPing}ms
                  </div>
                  <div className="text-[10px] font-medium text-slate-400">Jitter: {node.jitter}</div>
                </div>
              </div>

              {/* Progress Bar Visualizer */}
              <div className="mt-3 w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(15, (node.currentPing / 160) * 100))}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{node.status}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">Opus 48kHz HD</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guarantee Highlights */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl font-black font-mono text-slate-900">Adaptive</div>
            <div className="text-xs text-slate-500 mt-0.5">Simulcast Video</div>
          </div>
          <div>
            <div className="text-xl font-black font-mono text-emerald-600">Dynacast</div>
            <div className="text-xs text-slate-500 mt-0.5">Layer Throttling</div>
          </div>
          <div>
            <div className="text-xl font-black font-mono text-slate-900">E2EE Ready</div>
            <div className="text-xs text-slate-500 mt-0.5">AES-GCM Encryption</div>
          </div>
          <div>
            <div className="text-xl font-black font-mono text-emerald-600">WebRTC SFU</div>
            <div className="text-xs text-slate-500 mt-0.5">LiveKit Cloud Engine</div>
          </div>
        </div>
      </div>
    </section>
  );
}
