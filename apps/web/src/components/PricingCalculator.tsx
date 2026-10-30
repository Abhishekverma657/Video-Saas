"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, Zap, Shield, Cpu, HelpCircle } from "lucide-react";

export default function PricingCalculator() {
  const [minutes, setMinutes] = useState(15000);

  // Calculate pricing based on volume
  const getCost = (mins: number) => {
    if (mins <= 1000) return 0;
    if (mins <= 10000) return 29;
    if (mins <= 50000) return 99;
    return Math.round(mins * 0.0025);
  };

  const cost = getCost(minutes);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Transparent Metering
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Pay Only For The Minutes You Stream
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Zero hidden fees. Generous 1,000 free minutes every month for every new developer account.
        </p>
      </div>

      {/* Interactive Volume Slider Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.06)] max-w-4xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Estimated Usage
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 mt-1">
              {minutes.toLocaleString()} <span className="text-lg text-slate-500 font-sans font-medium">Minutes / mo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Equivalent to ~{Math.round(minutes / 30)} thirty-minute video meetings
            </p>
          </div>

          <div className="text-center sm:text-right bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 w-full sm:w-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Estimated Monthly Cost
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 mt-0.5">
              ${cost} <span className="text-xs text-slate-500 font-sans font-medium">/ month</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              {minutes <= 1000 ? "100% Free Tier ($0)" : `~$${(cost / (minutes || 1)).toFixed(4)} per participant min`}
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <div className="pt-8">
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs font-mono text-slate-400 mt-3 font-semibold">
            <span>1,000 mins (Free)</span>
            <span>25,000 mins</span>
            <span>50,000 mins</span>
            <span>100,000 mins</span>
          </div>
        </div>
      </div>

      {/* 3 Tier Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Tier 1: Developer Free */}
        <div className="rounded-3xl p-7 bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Developer</div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Free Tier</h3>
            <div className="text-3xl font-black font-mono text-slate-900 mt-3">
              $0 <span className="text-xs text-slate-400 font-normal">/ forever</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Perfect for indie developers testing video features in local development.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>1,000 Free Minutes</strong> every month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited Room Sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Flutter, React, & Node SDKs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Community Support</span>
              </li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-8 w-full py-3 text-center text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors block"
          >
            Start Free (No Card)
          </Link>
        </div>

        {/* Tier 2: Startup Pro (Highlighted) */}
        <div className="rounded-3xl p-7 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl relative border border-slate-700 flex flex-col justify-between">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
            Most Popular
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Production</div>
            <h3 className="text-xl font-bold text-white mt-1">Startup Pro</h3>
            <div className="text-3xl font-black font-mono text-white mt-3">
              $29 <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              For commercial SaaS apps with active daily video callers.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>10,000 Video Minutes</strong> included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ultra-Low $0.0035/min overage</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Developer Console & Analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Webhook Disconnection Metering</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Priority Email & Discord Support</span>
              </li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-8 w-full py-3 text-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-600/30 block"
          >
            Launch with Pro
          </Link>
        </div>

        {/* Tier 3: Growth Scale */}
        <div className="rounded-3xl p-7 bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">High Volume</div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Growth Scale</h3>
            <div className="text-3xl font-black font-mono text-slate-900 mt-3">
              $99 <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              For high-traffic platforms, ed-tech classes, and telemedicine.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>40,000 Video Minutes</strong> included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lowest $0.0028/min overage</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>HIPAA & GDPR Ready Architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated Slack Support Channel</span>
              </li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-8 w-full py-3 text-center text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors block"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
