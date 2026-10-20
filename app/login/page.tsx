"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { loginImage } from "@/lib/data";
import { useApp } from "@/lib/store";

type Mode = "login" | "signup";
type Errors = { name?: string; email?: string; password?: string; form?: string };

export default function LoginPage() {
  const router = useRouter();
  const { status, user, login, signup } = useApp();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (status === "ready" && user) router.replace("/app");
  }, [status, user, router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (mode === "signup" && name.trim().length < 3) next.name = "Nama lengkap minimal 3 karakter.";
    if (!email.trim()) next.email = "Email wajib diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Format email belum benar, contoh: nama@email.com.";
    if (!password) next.password = "Kata sandi wajib diisi.";
    else if (password.length < 6) next.password = "Kata sandi minimal 6 karakter.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      if (mode === "login") login(email, password);
      else signup(name.trim(), email, password);
      // setelah sesi tersimpan, useEffect di atas mengarahkan ke /app
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi." });
      setLoading(false);
    }
  }

  const input = "mt-1.5 min-h-12 w-full rounded-xl border bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-brand-600";
  const border = (bad?: string) => (bad ? "border-red-500" : "border-slate-300");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Photo src={loginImage} alt="Relawan bersama anak-anak dalam kegiatan belajar" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 flex items-end bg-brand-900/60 p-10">
          <p className="max-w-sm text-2xl font-bold text-white">Setiap jam yang kamu berikan berarti bagi seseorang.</p>
        </div>
      </div>

      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
            <ArrowLeft className="size-4" aria-hidden /> Kembali ke beranda
          </Link>
          <div className="mt-6">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-brand-900">
            {mode === "login" ? "Masuk untuk mulai berkontribusi" : "Buat akun relawan"}
          </h1>

          <div className="mt-6 grid grid-cols-2 rounded-xl bg-brand-50 p-1" role="tablist" aria-label="Mode">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m} type="button" role="tab" aria-selected={mode === m}
                onClick={() => { setMode(m); setErrors({}); }}
                className={`min-h-11 rounded-lg text-sm font-semibold ${mode === m ? "bg-white text-brand-800 shadow-sm" : "text-slate-600"}`}
              >
                {m === "login" ? "Masuk" : "Buat akun"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} noValidate className="mt-6 space-y-5">
            {errors.form && <div role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{errors.form}</div>}

            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-slate-800">Nama lengkap</label>
                <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
                  className={`${input} ${border(errors.name)}`} />
                {errors.name && <p id="name-err" className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-800">Email</label>
              <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
                placeholder="nama@email.com" className={`${input} ${border(errors.email)}`} />
              {errors.email && <p id="email-err" className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-semibold text-slate-800">Kata sandi</label>
              <div className="relative">
                <input id="password" type={show ? "text" : "password"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password} aria-describedby={errors.password ? "pw-err" : undefined}
                  placeholder="Minimal 6 karakter" className={`${input} pr-12 ${border(errors.password)}`} />
                <button type="button" onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  className="absolute right-1 top-2.5 grid size-11 place-items-center text-slate-500">
                  {show ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
                </button>
              </div>
              {errors.password && <p id="pw-err" className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 font-semibold text-white hover:bg-brand-800 disabled:opacity-70">
              {loading && <Loader2 className="size-5 animate-spin" aria-hidden />}
              {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Buat akun & masuk"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
