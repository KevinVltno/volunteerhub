"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarChart3, ClipboardList, Home, Loader2, LogOut, Search } from "lucide-react";
import Logo from "@/components/Logo";
import { useApp } from "@/lib/store";

const nav = [
  { href: "/app", label: "Beranda", icon: Home },
  { href: "/app/kegiatan", label: "Kegiatan", icon: Search },
  { href: "/app/aktivitas", label: "Aktivitas", icon: ClipboardList },
  { href: "/app/dampak", label: "Dampak", icon: BarChart3 },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { status, user, logout } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "anon") router.replace("/login");
  }, [status, router]);

  if (status !== "ready" || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="size-8 animate-spin text-brand-600" aria-label="Memuat" />
      </div>
    );
  }

  const active = (href: string) => (href === "/app" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="min-h-screen bg-brand-50/40 lg:pl-64 print:bg-white print:pl-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-2">
        Lewati ke konten
      </a>

      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-brand-100 bg-white p-5 lg:flex print:hidden">
        <Logo href="/app" />
        <nav className="mt-8 flex-1 space-y-1" aria-label="Navigasi utama">
          {nav.map((n) => (
            <Link
              key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold ${
                active(n.href) ? "bg-brand-100 text-brand-800" : "text-slate-600 hover:bg-brand-50"
              }`}
            >
              <n.icon className="size-5" aria-hidden /> {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-brand-100 pt-4">
          <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
          <p className="truncate text-xs text-slate-600">{user.email}</p>
          <button onClick={logout} className="mt-3 flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-600 hover:bg-brand-50">
            <LogOut className="size-4" aria-hidden /> Keluar
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-brand-100 bg-white px-4 lg:hidden print:hidden">
        <Logo href="/app" />
        <button onClick={logout} aria-label="Keluar" className="grid size-11 place-items-center text-slate-600">
          <LogOut className="size-5" aria-hidden />
        </button>
      </header>

      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 lg:px-8 lg:pb-10 print:p-0">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-brand-100 bg-white lg:hidden print:hidden" aria-label="Navigasi bawah">
        {nav.map((n) => (
          <Link
            key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold ${
              active(n.href) ? "text-brand-700" : "text-slate-500"
            }`}
          >
            <n.icon className="size-5" aria-hidden /> {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}