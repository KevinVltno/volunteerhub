"use client";

import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Clock } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ActivityCard from "@/components/ActivityCard";
import CategoryDonut from "@/components/CategoryDonut";
import { categories, weeklyInsight } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function Beranda() {
  const { user, interests, toggleInterest, registrations, activities, getActivity } = useApp();
  const done = registrations.filter((r) => r.status === "selesai");
  const hours = done.reduce((s, r) => s + (r.hours ?? 0), 0);
  const ongoing = registrations.find((r) => r.status !== "selesai");
  const ongoingActivity = ongoing ? getActivity(ongoing.activityId) : undefined;
  const recs = (interests.length ? activities.filter((a) => interests.includes(a.category)) : activities).slice(0, 4);

  const byCategory = categories.map((c) => ({ name: c, value: activities.filter((a) => a.category === c).length }));

  const stats = [
    { icon: Clock, label: "Jam kontribusi", value: hours },
    { icon: CheckCircle2, label: "Kegiatan selesai", value: done.length },
    { icon: Award, label: "Sertifikat", value: done.length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Halo, {user?.name} 👋</h1>
        <p className="text-slate-600">Ayo lanjutkan kontribusimu hari ini.</p>
      </div>

      {ongoing && ongoingActivity ? (
        <section className="flex flex-col gap-3 rounded-2xl bg-brand-700 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-brand-100">Aksi utama berikutnya</p>
            <p className="font-semibold">
              {ongoing.status === "terdaftar" ? "Check-in di" : "Catat jam kontribusi untuk"} {ongoingActivity.title}
            </p>
          </div>
          <Link href="/app/aktivitas" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-brand-800">
            Lanjutkan <ArrowRight className="size-4" aria-hidden />
          </Link>
        </section>
      ) : (
        <section className="flex flex-col gap-3 rounded-2xl bg-brand-700 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-brand-100">Belum ada kegiatan berjalan</p>
            <p className="font-semibold">Temukan kegiatan pertamamu sekarang.</p>
          </div>
          <Link href="/app/kegiatan" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-brand-800">
            Cari kegiatan <ArrowRight className="size-4" aria-hidden />
          </Link>
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <s.icon className="size-6" aria-hidden />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-brand-900">{s.value}</p>
              <p className="text-sm text-slate-600">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 className="text-lg font-bold text-brand-900">1. Pilih minatmu</h2>
        <p className="text-sm text-slate-600">Rekomendasi dan filter kegiatan menyesuaikan pilihanmu.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = interests.includes(c);
            return (
              <button
                key={c} onClick={() => toggleInterest(c)} aria-pressed={on}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${
                  on ? "border-brand-700 bg-brand-700 text-white" : "border-brand-200 bg-white text-brand-800 hover:bg-brand-50"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-bold text-brand-900">Rekomendasi kegiatan</h2>
          <Link href="/app/kegiatan" className="text-sm font-semibold text-brand-700 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recs.map((a) => <ActivityCard key={a.id} a={a} />)}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-brand-100 bg-white p-5">
          <h2 className="text-lg font-bold text-brand-900">Insight mingguan komunitas</h2>
          <p className="text-sm text-slate-600">Total jam kontribusi seluruh relawan.</p>
          <div className="mt-4 h-64" role="img" aria-label="Grafik jam kontribusi komunitas per minggu, naik dari 120 ke 260 jam">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyInsight}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2fa866" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2fa866" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcf5e5" />
                <XAxis dataKey="minggu" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <Tooltip />
                <Area type="monotone" dataKey="jam" name="Jam" stroke="#1a6e43" strokeWidth={3} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="rounded-2xl border border-brand-100 bg-white p-5">
          <h2 className="text-lg font-bold text-brand-900">Kegiatan per kategori</h2>
          <p className="text-sm text-slate-600">Sebaran kegiatan yang tersedia.</p>
          <div className="mt-4">
            <CategoryDonut data={byCategory} unit="kegiatan" label="Grafik lingkaran jumlah kegiatan per kategori" />
          </div>
        </section>
      </div>
    </div>
  );
}