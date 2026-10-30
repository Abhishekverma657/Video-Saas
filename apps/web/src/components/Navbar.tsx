"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Video,
  Cpu,
  ArrowRight,
  LogOut,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Radio,
  Layers,
  Zap,
  HelpCircle,
  Shield,
  Layers2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "3D Showcase", href: "/showcase", badge: "Live" },
    { label: "Architecture", href: "/architecture" },
    { label: "Pricing", href: "/pricing" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 ${
          scrolled ? "py-2 sm:py-3" : "py-3 sm:py-4"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 border ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-[0_12px_35px_-8px_rgba(15,23,42,0.1)]"
              : "bg-white/85 backdrop-blur-md border-slate-200/70 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)]"
          } px-4 sm:px-6 h-16 flex items-center justify-between`}
        >
          {/* Brand Logo with 3D Perspective Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <Video className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl ring-2 ring-emerald-400/40 animate-pulse pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
                  Aura<span className="text-emerald-600">RTC</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] uppercase font-mono font-bold tracking-widest rounded bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  Cloud
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight hidden sm:block">
                WebRTC CPaaS Platform
              </span>
            </div>
          </Link>

          {/* Live Engine Status Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-800 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold">LiveKit SFU</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-mono text-[11px] font-semibold">18ms Latency</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    active
                      ? "text-emerald-700 bg-emerald-50/80 font-extrabold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[8px] font-mono uppercase bg-emerald-100 text-emerald-800 rounded font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Docs Pill */}
            <Link
              href="/docs"
              className={`ml-1 px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 shadow-sm font-bold ${
                pathname.startsWith("/docs")
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-600/20"
                  : "bg-emerald-50 border-emerald-200/80 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs & SDKs</span>
              <span
                className={`px-1 text-[9px] font-mono uppercase rounded font-bold ${
                  pathname.startsWith("/docs") ? "bg-emerald-700 text-white" : "bg-emerald-600 text-white"
                }`}
              >
                v1.2
              </span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Quick Demo Room Join */}
            <Link
              href="/room/demo-lounge"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl transition-all shadow-sm hover:-translate-y-0.5"
            >
              <Video className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Room</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:-translate-y-0.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Console ({user.name.split(" ")[0]})</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center gap-1.5 hover:-translate-y-0.5 group"
                >
                  <span>Get API Keys</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Card */}
          <div className="fixed top-24 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[82vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Menu Navigation
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>LiveKit Online</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-sm font-semibold text-slate-700">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                  pathname === "/" ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-100"
                }`}
              >
                <span>🏠 Home</span>
              </Link>
              <Link
                href="/features"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/features") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-100"
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Platform Features</span>
              </Link>
              <Link
                href="/showcase"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/showcase") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-100"
                }`}
              >
                <Radio className="w-4 h-4 text-emerald-600" />
                <span>3D Showcase & Speed Test</span>
              </Link>
              <Link
                href="/architecture"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/architecture") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-100"
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Architecture & Security</span>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/pricing") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-100"
                }`}
              >
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span>Pricing Plans & Calculator</span>
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Developer Documentation Hub</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                  v1.2
                </span>
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
              <Link
                href="/room/demo-lounge"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl"
              >
                🎥 Launch Live Room
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md"
              >
                Get Developer API Keys →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
