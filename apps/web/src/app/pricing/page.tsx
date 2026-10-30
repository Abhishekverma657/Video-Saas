"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  Cpu,
  Clock,
  Layers,
  CheckCircle2,
} from "lucide-react";
import PricingCalculator from "@/components/PricingCalculator";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How are video call minutes calculated?",
      a: "Minutes are calculated per participant per minute spent in an active room. For instance, a 10-minute call between 3 people equals 30 participant minutes. We do not charge for empty idle rooms.",
    },
    {
      q: "Can I self-host AuraRTC on my own servers?",
      a: "Yes! AuraRTC is 100% open-architecture based on the LiveKit SFU open-source engine, Node.js, and MongoDB. You can run the entire stack on your own Docker or Kubernetes cluster or use our managed LiveKit Cloud cluster for zero maintenance.",
    },
    {
      q: "What happens if I exceed my monthly plan minutes?",
      a: "You will never experience sudden call cutoffs! Additional minutes are billed at a predictable flat rate of $0.0015 per participant minute, with automated usage warning thresholds available in your Developer Console.",
    },
    {
      q: "Is recording (Egress) and Livestreaming included?",
      a: "Yes, server-side composite recording (exporting to MP4) and RTMP livestreaming to YouTube/Twitch are supported on Pro, Scale, and Enterprise plans. Recordings can be automatically uploaded directly to your own AWS S3 or Google Cloud Storage bucket.",
    },
    {
      q: "Do you offer discounts for educational institutions and startups?",
      a: "Absolutely. We offer 30% discounts for accredited schools, non-profits, and early-stage bootstrapped startups. Contact our enterprise team to apply credits to your account.",
    },
  ];

  const planComparison = [
    { name: "Included Monthly Minutes", free: "1,000", pro: "10,000", scale: "50,000", ent: "Custom Volume" },
    { name: "Max Participants Per Room", free: "10", pro: "50", scale: "100", ent: "1,000+" },
    { name: "Max Resolution", free: "720p HD", pro: "1080p Full HD", scale: "1080p + 4K Screen", ent: "4K 60FPS" },
    { name: "Simulcast & Dynacast Engine", free: true, pro: true, scale: true, ent: true },
    { name: "End-to-End Encryption (E2EE)", free: true, pro: true, scale: true, ent: true },
    { name: "Server-Side Composite Recording (Egress)", free: false, pro: true, scale: true, ent: true },
    { name: "RTMP Livestreaming Out", free: false, pro: true, scale: true, ent: true },
    { name: "Webhooks & Real-Time Events", free: true, pro: true, scale: true, ent: true },
    { name: "SLA Uptime Guarantee", free: "Best Effort", pro: "99.9%", scale: "99.95%", ent: "99.99% Enterprise" },
    { name: "Support Level", free: "Community Discord", pro: "Priority Email", scale: "24/7 Slack Connect", ent: "Dedicated Solutions Engineer" },
  ];

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-slate-900 pt-24 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transparent & Predictable Pricing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Pay Only For What You Use.{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              No Hidden Surcharges.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Start for free with 1,000 minutes every month. Upgrade as your video application scales from prototype to millions of active conference participants.
          </p>
        </motion.div>
      </section>

      {/* Dynamic Minutes Interactive Calculator */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <PricingCalculator />
      </section>

      {/* Detailed Plan Comparison Table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Feature Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Full Plan Comparison & Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every plan includes our low-latency SFU edge network, WebRTC protocols, and native SDKs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Feature</th>
                  <th className="py-3.5 px-4">Developer Free</th>
                  <th className="py-3.5 px-4 text-emerald-700 bg-emerald-50/60 rounded-t-xl font-black">
                    Startup Pro
                  </th>
                  <th className="py-3.5 px-4">Growth Scale</th>
                  <th className="py-3.5 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {planComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-slate-300">&mdash;</span>
                        )
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/40">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-slate-300">&mdash;</span>
                        )
                      ) : (
                        row.pro
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {typeof row.scale === "boolean" ? (
                        row.scale ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-slate-300">&mdash;</span>
                        )
                      ) : (
                        row.scale
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {typeof row.ent === "boolean" ? (
                        row.ent ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-slate-300">&mdash;</span>
                        )
                      ) : (
                        row.ent
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-24">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Got Questions?
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about billing, usage calculations, and infrastructure.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Start with 1,000 free minutes today.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              No credit card required. Register, create your first application key, and connect your Flutter or React app in under 10 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/register"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              <span>Get Free API Keys</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              Read Integration Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
