"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
  displayName?: string;
  role?: string;
  profileRole?: string;
  goals?: string[];
  experienceLevel?: string;
  scenario?: string;
  weeklyTimeBudget?: string;
  completedOnboarding?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        if (data.user) setUser(data.user);
        else setUser(null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.errors?.[0]?.message || "Login failed" };
    } catch {
      return { success: false, error: "Network error" };
    }
  }, []);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, displayName, role: "user" }),
      });
      const data = await res.json();
      if (res.ok && data.doc) {
        // Auto-login after registration
        const loginResult = await login(email, password);
        return loginResult;
      }
      return { success: false, error: data.errors?.[0]?.message || "Registration failed" };
    } catch {
      return { success: false, error: "Network error" };
    }
  }, [login]);

  const logout = useCallback(async () => {
    await fetch("/api/users/logout", { method: "POST", credentials: "include" });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      loading: false,
      login: async () => ({ success: false, error: "No auth provider" }),
      register: async () => ({ success: false, error: "No auth provider" }),
      logout: async () => {},
      refreshUser: async () => {},
    } as AuthContextType;
  }
  return context;
}
