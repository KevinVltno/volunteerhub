"use client";

import Link from "next/link";
import { Award, Clock, HeartHandshake } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CategoryDonut from "@/components/CategoryDonut";
import { EmptyState } from "@/components/States";
import { categories, weeklyInsight } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function DampakPage() {
  const { registrations, getActivity } = useApp();
  const done = registrations.filter((r) => r.status === "selesai");
  const total = done.reduce((s, r) => s + (r.hours ?? 0), 0);

  const byCategory = categories.map((c) => ({
    kategori: c,
    jam: done.filter((r) => getActivity(r.activityId)?.category === c).reduce((s, r) => s + (r.hours ?? 0), 0),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Dampak saya</h1>
        <p className="text-slate-600">Ringkasan kontribusi dan sertifikat yang sudah kamu raih.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Clock, label: "Total jam", value: total },
          { icon: HeartHandshake, label: "Kegiatan selesai", value: done.length },
          { icon: Award, label: "Sertifikat", value: done.length },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-100 text-brand-700"><s.icon className="size-6" aria-hidden /></span>
            <div>
              <p className="text-2xl font-extrabold text-brand-900">{s.value}</p>
              <p className="text-sm text-slate-600">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {done.length === 0 ? (
        <EmptyState title="Belum ada dampak tercatat" desc="Selesaikan satu kegiatan untuk melihat grafik dan sertifikatmu di sini." href="/app/kegiatan" action="Cari kegiatan" />
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-3">
            <section className="lg:col-span-2 rounded-2xl border border-brand-100 bg-white p-5">
              <h2 className="text-lg font-bold text-brand-900">Jam kontribusi per kategori</h2>
              <div className="mt-4 h-64" role="img" aria-label="Grafik batang jam kontribusi per kategori">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byCategory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dcf5e5" vertical={false} />
                    <XAxis dataKey="kategori" tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={30} />
                    <Tooltip />
                    <Bar dataKey="jam" name="Jam" fill="#2fa866" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
            <section className="rounded-2xl border border-brand-100 bg-white p-5">
              <h2 className="text-lg font-bold text-brand-900">Proporsi jam</h2>
              <div className="mt-4">
                <CategoryDonut
                  data={byCategory.filter((c) => c.jam > 0).map((c) => ({ name: c.kategori, value: c.jam }))}
                  unit="jam" label="Grafik lingkaran proporsi jam kontribusi per kategori"
                />
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-brand-100 bg-white p-5">
            <h2 className="text-lg font-bold text-brand-900">Sertifikat saya</h2>
            <ul className="mt-3 divide-y divide-brand-100">
              {done.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{getActivity(r.activityId)?.title}</p>
                    <p className="text-sm text-slate-600">{r.hours} jam · {r.certificateId}</p>
                  </div>
                  <Link href={`/app/sertifikat/${r.id}`} className="inline-flex min-h-11 items-center rounded-xl border border-brand-200 px-4 text-sm font-semibold text-brand-800 hover:bg-brand-50">
                    Lihat
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <section className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 className="text-lg font-bold text-brand-900">Tren komunitas</h2>
        <div className="mt-4 h-56" role="img" aria-label="Grafik garis tren jam kontribusi komunitas">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyInsight}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcf5e5" />
              <XAxis dataKey="minggu" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={36} />
              <Tooltip />
              <Line type="monotone" dataKey="jam" name="Jam" stroke="#1a6e43" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}