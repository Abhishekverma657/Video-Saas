"use client";

import Link from "next/link";
import { Video, Cpu, ArrowRight, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              Aura<span className="text-emerald-600">RTC</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] uppercase font-mono font-medium tracking-wider rounded bg-slate-100 text-slate-600 border border-slate-200">
              Cloud
            </span>
          </div>
        </Link>

        {/* Live Engine Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">LiveKit SFU Active</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-mono">&lt;150ms Latency</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <Link href="/#showcase" className="hover:text-emerald-600 transition-colors">
            3D Showcase
          </Link>
          <Link href="/#features" className="hover:text-emerald-600 transition-colors">
            Features
          </Link>
          <Link href="/#architecture" className="hover:text-emerald-600 transition-colors">
            Architecture
          </Link>
          <Link href="/#how-it-works" className="hover:text-emerald-600 transition-colors">
            How It Works
          </Link>
          <Link href="/#code" className="hover:text-emerald-600 transition-colors">
            SDK Quickstart
          </Link>
          <Link
            href="/docs"
            className="hover:text-emerald-700 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/70 transition-all font-semibold flex items-center gap-1"
          >
            <span>Docs & Guides</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-lg transition-all flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>Console ({user.name.split(" ")[0]})</span>
              </Link>
              <button
                onClick={() => logout()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg transition-all"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 group"
              >
                <span>Get API Keys</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
