"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sreevignikaa.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanEmail = email.trim();

    // 1. Try real Supabase Authentication if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!authError && data?.session) {
          localStorage.setItem(
            "sreevignikaa_admin_auth",
            JSON.stringify({
              email: data.user?.email || cleanEmail,
              role: "owner",
              loggedAt: Date.now(),
              supabaseSession: true,
            })
          );
          router.replace("/admin");
          return;
        } else if (authError) {
          // If Supabase Auth threw an error, show it clearly to the user
          console.warn("Supabase Auth error:", authError.message);
          setError(
            `Supabase Auth: ${authError.message}. (Tip: In Supabase -> Authentication -> Users, make sure 'Auto confirm user?' is checked for your email!)`
          );
          setLoading(false);
          return;
        }
      } catch (err: any) {
        console.warn("Supabase Auth sign-in failed:", err);
      }
    }

    // 2. Owner Credentials & Demo mode check
    if (
      ((cleanEmail === "admin@sreevignikaa.com") &&
        password === "admin123") ||
      (cleanEmail.includes("@") && password.length >= 4)
    ) {
      localStorage.setItem(
        "sreevignikaa_admin_auth",
        JSON.stringify({ email: cleanEmail, role: "owner", loggedAt: Date.now() })
      );
      router.replace("/admin");
    } else {
      setError(
        "Invalid login credentials. Please enter a valid email address and password (at least 4 characters)."
      );
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    localStorage.setItem(
      "sreevignikaa_admin_auth",
      JSON.stringify({
        email: "admin@sreevignikaa.com",
        role: "owner",
        loggedAt: Date.now(),
      })
    );
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 via-blue-50/40 to-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Owner Admin Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            SREEVIGNIKAA Sarees Digital Catalog Manager
          </p>
        </div>

        {isSupabaseConfigured() ? (
          <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-700 border border-blue-200">
            <CheckCircle className="h-4 w-4 shrink-0 text-blue-600" />
            <span>Connected to live Supabase Database &amp; Auth</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>
              Supabase keys not detected in .env.local — running in Demo Owner Mode.
            </span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-xs text-red-800 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-900">
              Owner Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@gmail.com"
                required
                className="pl-9 bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-xs font-semibold text-slate-900"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-9 bg-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gap-2 py-6 text-sm font-bold shadow-md bg-blue-600 hover:bg-blue-500 text-white"
          >
            <span>{loading ? "Authenticating..." : "Login to Dashboard"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center space-y-3">
          <p className="text-xs text-slate-500">
            Demo credentials pre-filled:{" "}
            <span className="font-mono font-bold text-slate-800">admin@sreevignikaa.com</span> /{" "}
            <span className="font-mono font-bold text-slate-800">admin123</span>
          </p>
          <Button
            variant="outline"
            type="button"
            onClick={handleDemoLogin}
            className="w-full text-xs border-blue-200 text-blue-600 font-semibold bg-blue-50/60 hover:bg-blue-100/70"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            Instant Demo Owner Login
          </Button>
        </div>
      </div>
    </div>
  );
}
