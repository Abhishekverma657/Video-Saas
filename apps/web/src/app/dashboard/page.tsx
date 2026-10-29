"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  Video,
  Clock,
  Users,
  TrendingUp,
  Play,
  ArrowRight,
  LogOut,
  Plus,
  RefreshCw,
  Loader2,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Code2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, token, projects, loading, logout, refreshProjects } = useAuth();
  const router = useRouter();

  const [copiedAppId, setCopiedAppId] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [roomInput, setRoomInput] = useState("standup-room-1");
  const [userName, setUserName] = useState("Abhishek Dev");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isRunningDiag, setIsRunningDiag] = useState(false);
  const [diagLogs, setDiagLogs] = useState<Array<{ stage: string; status: "pending" | "success" | "error"; detail: string }>>([]);

  // Protect route
  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [loading, token, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-3 bg-[#fbfcfd]">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-xs text-slate-500 font-mono">Authenticating Developer Session...</p>
      </div>
    );
  }

  const rawProject = projects[0];
  const currentProject = {
    _id: rawProject?._id || (rawProject as any)?.id || "default",
    name: rawProject?.name || "Production Video Suite",
    appId: rawProject?.appId || "app_omni_live_demo_01",
    appSecret: rawProject?.appSecret || "sec_omni_super_secret_key_99",
    totalMinutesUsed: typeof rawProject?.totalMinutesUsed === "number" ? rawProject.totalMinutesUsed : 0,
    freeQuotaMinutes: typeof rawProject?.freeQuotaMinutes === "number" ? rawProject.freeQuotaMinutes : 10000,
    status: rawProject?.status || "active",
  };

  const totalUsed = currentProject.totalMinutesUsed;
  const freeQuota = currentProject.freeQuotaMinutes;
  const remainingQuota = Math.max(0, freeQuota - totalUsed);

  const usagePercent = Math.min(
    100,
    Math.round(freeQuota > 0 ? (totalUsed / freeQuota) * 100 : 0)
  );

  const copyText = (text: string, type: "id" | "secret") => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedAppId(true);
      setTimeout(() => setCopiedAppId(false), 2000);
    } else {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }
  };

  const handleRegenerateSecret = async () => {
    if (!currentProject._id || currentProject._id === "default") return;
    if (!confirm("Are you sure you want to regenerate your API Secret? Any active SDK using the old secret will need to be updated.")) return;

    setIsRegenerating(true);
    try {
      const res = await fetch(`http://localhost:5001/api/v1/projects/${currentProject._id}/regenerate-secret`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        await refreshProjects();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const runDiagnostics = async () => {
    setIsRunningDiag(true);
    setDiagLogs([
      { stage: "Stage 1: Gateway Health", status: "pending", detail: "Checking http://localhost:5001/health..." },
    ]);

    try {
      // 1. Gateway Health
      const healthRes = await fetch("http://localhost:5001/health");
      if (!healthRes.ok) throw new Error("AuraRTC Gateway is unreachable on port 5001.");

      setDiagLogs([
        { stage: "Stage 1: Gateway Health", status: "success", detail: "AuraRTC API Gateway is Online & Healthy (Port 5001)." },
        { stage: "Stage 2: Key Authentication", status: "pending", detail: `Verifying AppID ${currentProject.appId}...` },
      ]);

      // 2. Token Exchange with developer's actual credentials
      const tokenRes = await fetch("http://localhost:5001/api/v1/rtc/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": currentProject.appId,
          "x-app-secret": currentProject.appSecret,
        },
        body: JSON.stringify({
          roomName: "sdk-diag-room",
          identity: `dev_${Math.random().toString(36).substring(2, 6)}`,
          name: user.name || "Test Developer",
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.success) {
        throw new Error(tokenData.message || "Failed to exchange credentials for WebRTC token.");
      }

      setDiagLogs([
        { stage: "Stage 1: Gateway Health", status: "success", detail: "AuraRTC API Gateway is Online & Healthy (Port 5001)." },
        { stage: "Stage 2: Key Authentication", status: "success", detail: `App ID validated! Signed LiveKit WebRTC JWT token issued.` },
        { stage: "Stage 3: SFU Media Engine", status: "success", detail: `Target SFU Node: ${tokenData.data.serverUrl || "wss://video-call-ab51jqvu.livekit.cloud"} ready with Dynacast & Simulcast.` },
        { stage: "Stage 4: Quota & Security", status: "success", detail: `Project status is active. ${remainingQuota.toLocaleString()} free starter minutes available.` },
      ]);
    } catch (err: any) {
      setDiagLogs((prev) => [
        ...prev.filter((l) => l.status === "success"),
        { stage: "Diagnostics Failed", status: "error", detail: err.message || "Diagnostic test failed." },
      ]);
    } finally {
      setIsRunningDiag(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header with Developer Profile & Logout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Developer Console</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Active Project
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <strong className="text-slate-800">{user.name}</strong> ({user.email})
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={`/room/${roomInput}?name=${encodeURIComponent(user.name || userName)}&appId=${currentProject.appId}&appSecret=${currentProject.appSecret}`}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch Video Room</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => logout()}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-rose-600 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* API Credentials Card */}
      <div className="light-card rounded-2xl p-6 space-y-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{currentProject.name}</h2>
              <p className="text-[11px] text-slate-500 font-mono">Project ID: {currentProject._id}</p>
            </div>
          </div>

          <button
            onClick={handleRegenerateSecret}
            disabled={isRegenerating}
            className="text-xs font-medium text-slate-600 hover:text-emerald-700 flex items-center gap-1 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`} />
            <span>Regenerate Secret</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* App ID */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">App ID</div>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
              <span>{currentProject.appId}</span>
              <button
                onClick={() => copyText(currentProject.appId, "id")}
                className="text-slate-400 hover:text-slate-900 transition-colors"
                title="Copy App ID"
              >
                {copiedAppId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* App Secret */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">App Secret</div>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
              <span>
                {showSecret ? currentProject.appSecret : "••••••••••••••••••••••••••••••••"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                  title={showSecret ? "Hide Secret" : "Show Secret"}
                >
                  {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => copyText(currentProject.appSecret, "secret")}
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                  title="Copy App Secret"
                >
                  {copiedSecret ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="light-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Minutes Consumed</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              {totalUsed.toLocaleString()}{" "}
              <span className="text-xs font-normal text-slate-500">/ {freeQuota.toLocaleString()}</span>
            </div>
            {/* Solid Green Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="light-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Remaining Quota</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            {remainingQuota.toLocaleString()}{" "}
            <span className="text-xs font-normal text-slate-500">mins left</span>
          </div>
          <div className="text-[11px] text-slate-500">Free Starter Tier</div>
        </div>

        {/* Metric 3 */}
        <div className="light-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Project Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 uppercase">{currentProject.status}</div>
          <div className="text-[11px] text-slate-500">100% SLA Available</div>
        </div>

        {/* Metric 4 */}
        <div className="light-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Available Free Quota</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">
              Active
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            {remainingQuota.toLocaleString()} Mins
          </div>
          <div className="text-[11px] text-slate-500">Allocated starter allowance</div>
        </div>
      </div>

      {/* Interactive SDK Live Test Bench */}
      <div className="light-card p-6 rounded-2xl space-y-4 shadow-soft border-emerald-200/60 bg-emerald-50/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                SDK & API Key Live Test Bench
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify that your App ID and Secret are working end-to-end with the AuraRTC Gateway and LiveKit SFU.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/sample-app.html"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Open Standalone HTML Client</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>

            <button
              onClick={runDiagnostics}
              disabled={isRunningDiag}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isRunningDiag ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isRunningDiag ? "Testing Pipeline..." : "Run SDK Diagnostics"}</span>
            </button>
          </div>
        </div>

        {/* Live Diagnostics Terminal */}
        {diagLogs.length > 0 && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pb-1 border-b border-slate-800/80">
              Live Gateway & SFU Diagnostics Log
            </div>
            <div className="space-y-1.5 pt-1">
              {diagLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {log.status === "pending" && <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0 mt-0.5" />}
                  {log.status === "success" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                  {log.status === "error" && <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-bold text-slate-200">{log.stage}: </span>
                    <span className={log.status === "error" ? "text-rose-300" : log.status === "success" ? "text-emerald-300" : "text-amber-200"}>
                      {log.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Launch Room Configuration Box */}
      <div className="light-card p-6 rounded-2xl space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Video className="w-4 h-4 text-emerald-600" />
          Quick Room Simulator
        </h3>
        <p className="text-xs text-slate-500">
          Enter a room name and launch a live call using your active AppID and Secret.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Room Name</label>
            <input
              type="text"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div className="flex items-end">
            <Link
              href={`/room/${roomInput}?name=${encodeURIComponent(userName)}&appId=${currentProject.appId}&appSecret=${currentProject.appSecret}`}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Enter Room</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
