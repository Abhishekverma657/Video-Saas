"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "developer" | "admin";
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  appId: string;
  appSecret: string;
  status: "active" | "suspended";
  freeQuotaMinutes: number;
  totalMinutesUsed: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  projects: Project[];
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: (redirectTo?: string) => void;
  refreshProjects: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Load session from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("aura_token");
    const savedUser = localStorage.getItem("aura_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        if (parsedUser.role !== "admin") {
          fetchProjects(savedToken);
        }
      } catch (e) {
        localStorage.removeItem("aura_token");
        localStorage.removeItem("aura_user");
      }
    }
    setLoading(false);
  }, []);

  const fetchProjects = async (authToken: string) => {
    try {
      const res = await fetch("http://localhost:5001/api/v1/projects", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5001/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Invalid credentials." };
      }

      const authToken = data.data.token;
      const authUser = data.data.user;

      setToken(authToken);
      setUser(authUser);
      setProjects(data.data.projects || []);

      localStorage.setItem("aura_token", authToken);
      localStorage.setItem("aura_user", JSON.stringify(authUser));

      return { success: true };
    } catch (err: any) {
      return { success: false, message: "Could not reach server. Please try again." };
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5001/api/v1/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Invalid administrator credentials." };
      }

      const authToken = data.data.token;
      const authUser = data.data.user;

      setToken(authToken);
      setUser(authUser);

      localStorage.setItem("aura_token", authToken);
      localStorage.setItem("aura_user", JSON.stringify(authUser));

      return { success: true };
    } catch (err: any) {
      return { success: false, message: "Could not reach server. Please try again." };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5001/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Registration failed." };
      }

      const authToken = data.data.token;
      const authUser = data.data.user;

      setToken(authToken);
      setUser(authUser);
      const initialProjects = data.data.projects || (data.data.defaultProject ? [data.data.defaultProject] : []);
      setProjects(initialProjects);

      localStorage.setItem("aura_token", authToken);
      localStorage.setItem("aura_user", JSON.stringify(authUser));
      fetchProjects(authToken);

      return { success: true };
    } catch (err: any) {
      return { success: false, message: "Could not reach server. Please try again." };
    }
  };

  const logout = (redirectTo?: string) => {
    setUser(null);
    setToken(null);
    setProjects([]);
    localStorage.removeItem("aura_token");
    localStorage.removeItem("aura_user");
    const target = typeof redirectTo === "string" ? redirectTo : "/login";
    router.push(target);
  };

  const refreshProjects = async () => {
    if (token) {
      await fetchProjects(token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        projects,
        loading,
        login,
        adminLogin,
        register,
        logout,
        refreshProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
