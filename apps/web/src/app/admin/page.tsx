"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Layers,
  Clock,
  Server,
  RefreshCw,
  Loader2,
  LogOut,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const router = useRouter();
  const { user, token, loading: authLoading, logout } = useAuth();

  const [stats, setStats] = useState<any>(null);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Security Guard: Only allow user with role === 'admin'
  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "admin" || !token) {
        router.push("/admin/login");
      } else {
        fetchAdminData(token);
      }
    }
  }, [user, token, authLoading, router]);

  const fetchAdminData = async (authToken: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const [overviewRes, devsRes] = await Promise.all([
        fetch("http://localhost:5001/api/v1/admin/overview", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch("http://localhost:5001/api/v1/admin/developers", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      const overviewData = await overviewRes.json();
      const devsData = await devsRes.json();

      if (overviewRes.status === 401 || overviewRes.status === 403) {
        setAuthError("Unauthorized: Super Admin permissions required. Redirecting to login...");
        setTimeout(() => logout("/admin/login"), 1500);
        return;
      }

      if (overviewData.success) setStats(overviewData.data);
      if (devsData.success) setDevelopers(devsData.data);
    } catch (e: any) {
      console.error("Admin fetch error:", e);
      setAuthError("Failed to reach platform API gateway.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (projectId: string, currentStatus: string) => {
    if (!token) return;
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    setUpdatingId(projectId);
    try {
      const res = await fetch(`http://localhost:5001/api/v1/admin/projects/${projectId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchAdminData(token);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const addQuota = async (projectId: string, currentQuota: number) => {
    if (!token) return;
    setUpdatingId(projectId);
    try {
      const res = await fetch(`http://localhost:5001/api/v1/admin/projects/${projectId}/quota`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ freeQuotaMinutes: currentQuota + 10000 }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchAdminData(token);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || (loading && !stats)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3 bg-slate-900 text-white">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Authenticating Super Admin Credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Top Super Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-white">AuraRTC Platform Control</span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
                Root Infrastructure & Global Tenant Management (Abhishek)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => token && fetchAdminData(token)}
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            <Link
              href="/dashboard"
              target="_blank"
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all flex items-center gap-1.5"
            >
              <span>Dev Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => logout("/admin/login")}
              className="px-3 py-1.5 text-xs font-mono text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{authError}</span>
          </div>
        )}

        {/* Global SaaS Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Registered Devs</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900">{stats?.totalUsers || 0}</div>
            <div className="text-[11px] text-slate-500">Active Developer Accounts</div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Apps / Projects</span>
              <Layers className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900">{stats?.totalProjects || 0}</div>
            <div className="text-[11px] text-slate-500">Issued AppIDs & Secrets</div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Global Minutes</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-600">
              {(stats?.totalGlobalMinutes || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">Tracked via SFU Webhooks</div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">SFU Server Fleet</span>
              <Server className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>1 Node Active</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">LiveKit 1.13.11 • Sub-150ms Delay</div>
          </div>
        </div>

        {/* Developer Tenants Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Developer Tenants & API Key Management</h3>
              <p className="text-xs text-slate-500">Inspect registered developers, manage quotas, or suspend projects.</p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              MongoDB Atlas Synced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100/70 text-[11px] uppercase text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-3">Developer & Email</th>
                  <th className="px-6 py-3">App ID</th>
                  <th className="px-6 py-3">Minutes Used</th>
                  <th className="px-6 py-3">Quota Limit</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {developers.map((dev: any) => {
                  const project = dev.projects[0];
                  if (!project) return null;
                  const isSuspended = project.status === "suspended";

                  return (
                    <tr key={dev.user._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-sans">
                        <div className="font-bold text-slate-900">{dev.user.name}</div>
                        <div className="text-slate-500 text-[11px]">{dev.user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-800">{project.appId}</td>
                      <td className="px-6 py-4 text-emerald-600 font-bold">
                        {project.totalMinutesUsed.toLocaleString()} mins
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {project.freeQuotaMinutes.toLocaleString()} mins
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            isSuspended
                              ? "bg-rose-100 text-rose-700 border border-rose-300"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 font-sans">
                        <button
                          onClick={() => addQuota(project._id, project.freeQuotaMinutes)}
                          disabled={updatingId === project._id}
                          className="px-2.5 py-1 text-xs rounded bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors font-semibold"
                        >
                          +10k Mins
                        </button>

                        <button
                          onClick={() => toggleStatus(project._id, project.status)}
                          disabled={updatingId === project._id}
                          className={`px-2.5 py-1 text-xs rounded font-semibold transition-colors ${
                            isSuspended
                              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                              : "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {isSuspended ? "Re-Activate" : "Suspend"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
