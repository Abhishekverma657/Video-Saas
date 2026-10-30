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
  BookOpen,
  Radio,
  Layers,
  Zap,
  Sparkles,
  ChevronRight,
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
    { label: "3D Showcase", href: "/showcase" },
    { label: "Architecture", href: "/architecture" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs & SDKs", href: "/docs" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 ${
          scrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-3.5"
        }`}
      >
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-300 border ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-[0_10px_35px_-8px_rgba(15,23,42,0.1)]"
              : "bg-white/85 backdrop-blur-md border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)]"
          } px-4 sm:px-5 h-14 flex items-center justify-between gap-4`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <Video className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-slate-900 font-sans">
                Aura<span className="text-emerald-600">RTC</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-800 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cloud</span>
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? "text-emerald-700 bg-emerald-50 font-bold border border-emerald-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Demo Room Join (Ghost Pill) */}
            <Link
              href="/room/demo-lounge"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/90 hover:border-emerald-200 rounded-full transition-all"
            >
              <Video className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Room</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Console</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-full shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1 group"
                >
                  <span>Get API Keys</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
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
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Card */}
          <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[82vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Menu
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LiveKit Online &bull; 18ms</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 text-sm font-semibold text-slate-700">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                  pathname === "/" ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/features"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/features") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <span>Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/showcase"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/showcase") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <span>3D Showcase & Speed Test</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/architecture"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/architecture") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <span>Architecture & Security</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/pricing") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <span>Pricing Plans</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                  pathname.startsWith("/docs") ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Docs & SDKs</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">
                  v1.2
                </span>
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
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
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md"
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
