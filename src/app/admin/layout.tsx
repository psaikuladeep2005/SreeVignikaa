"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Settings,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isLoginPage = pathname === "/admin/login";
    const session = localStorage.getItem("sreevignikaa_admin_auth");

    if (!session && !isLoginPage) {
      router.replace("/admin/login");
      setIsAuthenticated(false);
    } else if (session && isLoginPage) {
      router.replace("/admin");
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(Boolean(session) || isLoginPage);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("sreevignikaa_admin_auth");
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-white">{children}</div>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products & Catalog", href: "/admin/products", icon: ShoppingBag },
    { name: "Category Manager", href: "/admin/categories", icon: Layers },
    { name: "Boutique Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-100 border-r border-blue-500/20 shrink-0 shadow-xl">
        <div className="p-6 border-b border-blue-400/20 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sky-400">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Owner Portal
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
            SREEVIGNIKAA Sarees
          </h2>
          <span className="text-[11px] text-slate-400">
            Digital Catalog Manager
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-blue-600 text-white shadow-md font-semibold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-blue-500/20">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sky-300 hover:bg-white/10"
            >
              <ExternalLink className="h-5 w-5 shrink-0" />
              <span>Live Boutique View</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/40 text-left mt-1"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Logout Owner</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile Top Header for Admin */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-slate-900 text-white px-4 py-3.5 border-b border-blue-500/20 shadow-md">
          <span className="font-serif font-bold text-lg">SREEVIGNIKAA Sarees Admin</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-sky-400"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-900/95 text-white p-6 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-blue-500/20">
                <span className="font-serif font-bold text-xl">SREEVIGNIKAA Sarees Admin</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium ${
                        active
                          ? "bg-blue-600 text-white font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-2 border-t border-blue-500/20 pt-4">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sky-300"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Open Live Boutique</span>
              </Link>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout Owner</span>
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
