"use client";

import Link from "next/link";
import { Video, Shield, Zap, Globe, Github, Terminal, ArrowUpRight, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white relative overflow-hidden">
      {/* Ambient Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-100">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Aura<span className="text-emerald-600">RTC</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] uppercase font-mono font-bold rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Cloud
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Enterprise WebRTC Real-Time Media Platform powered by LiveKit SFU, Node.js, and MongoDB Atlas. Sub-150ms global video calling, interactive broadcasting, and multi-party conferences for Flutter, Web, and Native.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>LiveKit SFU Active &bull; 18ms Edge Latency</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform & Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/features" className="hover:text-emerald-600 transition-colors">
                  All Features
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <span>3D Live Showcase</span>
                  <span className="px-1 py-0.2 text-[8px] bg-emerald-100 text-emerald-800 rounded font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/showcase#speedtest" className="hover:text-emerald-600 transition-colors">
                  Global Latency Test
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-emerald-600 transition-colors">
                  SFU Architecture
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-600 transition-colors">
                  Pricing & Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer & SDK Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Developers & SDKs
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/docs" className="hover:text-emerald-600 transition-colors font-bold text-emerald-700">
                  SDK Documentation Hub
                </Link>
              </li>
              <li>
                <Link href="/docs?section=flutter" className="hover:text-emerald-600 transition-colors">
                  Flutter Mobile Guide
                </Link>
              </li>
              <li>
                <Link href="/docs?section=react" className="hover:text-emerald-600 transition-colors">
                  React & Next.js Guide
                </Link>
              </li>
              <li>
                <Link href="/docs?section=customize" className="hover:text-emerald-600 transition-colors">
                  UI Theming & Customization
                </Link>
              </li>
              <li>
                <Link href="/docs?section=api" className="hover:text-emerald-600 transition-colors">
                  REST API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Console & Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Developer Console
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/dashboard" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <span>API Keys & Console</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-emerald-600 transition-colors">
                  Get Free Account (1K Mins)
                </Link>
              </li>
              <li>
                <Link href="/room/demo-lounge" className="hover:text-emerald-600 transition-colors">
                  Instant Test Room
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-emerald-600 transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Abhishekverma657/Video-Saas"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">AuraRTC Video SaaS</span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/docs" className="hover:text-emerald-600 transition-colors">
              Docs v1.2
            </Link>
            <Link href="/pricing" className="hover:text-emerald-600 transition-colors">
              Plans & SLA
            </Link>
            <Link href="https://github.com/Abhishekverma657/Video-Saas" target="_blank" className="hover:text-emerald-600 transition-colors">
              Open Source Monorepo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
