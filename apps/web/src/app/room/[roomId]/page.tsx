"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { ShieldCheck, Copy, Check, PhoneOff, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ roomId: string }>;
}

export default function RoomPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.roomId;
  const searchParams = useSearchParams();

  const appId = searchParams.get("appId") || "app_omni_live_demo_01";
  const appSecret = searchParams.get("appSecret") || "sec_omni_super_secret_key_99";
  const guestName = searchParams.get("name") || `Guest_${Math.random().toString(36).substring(2, 6)}`;

  const [token, setToken] = useState<string>("");
  const [serverUrl, setServerUrl] = useState<string>("wss://video-call-ab51jqvu.livekit.cloud");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Timer counter
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      setError(null);

      const identity = `user_${Math.random().toString(36).substring(2, 7)}`;

      try {
        const response = await fetch("http://localhost:5001/api/v1/rtc/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": appId,
            "x-app-secret": appSecret,
          },
          body: JSON.stringify({
            roomName: roomId,
            identity,
            name: guestName,
          }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setToken(data.data.token);
          setServerUrl(data.data.serverUrl || "wss://video-call-ab51jqvu.livekit.cloud");
        } else {
          setError(data.message || "Failed to obtain token from AuraRTC Gateway.");
        }
      } catch (err: any) {
        setError(
          "Could not reach AuraRTC Gateway (http://localhost:5001). Please ensure API server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [roomId, appId, appSecret, guestName]);

  const copyInvite = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-xs text-slate-700 font-mono">Negotiating WebRTC Credentials & Token...</p>
        <p className="text-[11px] text-slate-500">Connecting to AuraRTC SFU Gateway</p>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="light-card p-6 rounded-2xl max-w-sm w-full text-center space-y-3 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <PhoneOff className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Connection Error</h2>
          <p className="text-xs text-slate-500 leading-relaxed">{error}</p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Console</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950">
      {/* Top Meeting Bar */}
      <div className="h-12 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Back to Console"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-white">{roomId}</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
                Aura SFU
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                App: {appId}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono">{formatTimer(callDuration)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                SRTP Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyInvite}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Invite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* LiveKit Video Room Container */}
      <div className="flex-1 relative overflow-hidden bg-black">
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
          data-lk-theme="default"
          className="h-full w-full"
        >
          <VideoConference />
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    </div>
  );
}
