"use client";

import { useMemo, useState } from "react";
import { Heart, Search } from "lucide-react";
import ActivityCard from "@/components/ActivityCard";
import { EmptyState } from "@/components/States";
import { categories, type Category } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function KegiatanPage() {
  const { interests, favorites, activities: all } = useApp();
  const cities = useMemo(() => Array.from(new Set(all.map((a) => a.city))).sort(), [all]);

  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [when, setWhen] = useState("");
  const [cats, setCats] = useState<Category[]>(interests);
  const [onlyFav, setOnlyFav] = useState(false);

  // Filter data dummy secara lokal
  const shown = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return all.filter((a) =>
      (!kw || a.title.toLowerCase().includes(kw) || a.organizer.toLowerCase().includes(kw)) &&
      (!city || a.city === city) &&
      (!when || a.when === when) &&
      (cats.length === 0 || cats.includes(a.category)) &&
      (!onlyFav || favorites.includes(a.id))
    );
  }, [all, q, city, when, cats, onlyFav, favorites]);

  const field = "mt-1 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm focus:border-brand-600";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">2. Cari kegiatan</h1>
        <p className="text-slate-600">Filter berdasarkan lokasi, waktu, dan minat.</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-brand-100 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label htmlFor="q" className="text-sm font-semibold text-slate-800">Cari</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-[1.15rem] size-4 text-slate-400" aria-hidden />
              <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nama kegiatan atau penyelenggara" className={`${field} pl-9`} />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="text-sm font-semibold text-slate-800">Lokasi</label>
            <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className={field}>
              <option value="">Semua kota</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="when" className="text-sm font-semibold text-slate-800">Waktu</label>
            <select id="when" value={when} onChange={(e) => setWhen(e.target.value)} className={field}>
              <option value="">Kapan saja</option>
              <option value="weekend">Akhir pekan</option>
              <option value="weekday">Hari kerja</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const on = cats.includes(c);
            return (
              <button
                key={c} aria-pressed={on}
                onClick={() => setCats((s) => (on ? s.filter((x) => x !== c) : [...s, c]))}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${
                  on ? "border-brand-700 bg-brand-700 text-white" : "border-brand-200 text-brand-800 hover:bg-brand-50"
                }`}
              >
                {c}
              </button>
            );
          })}
          <button
            aria-pressed={onlyFav} onClick={() => setOnlyFav((v) => !v)}
            className={`ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold ${
              onlyFav ? "border-brand-700 bg-brand-100 text-brand-800" : "border-brand-200 text-brand-800 hover:bg-brand-50"
            }`}
          >
            <Heart className={`size-4 ${onlyFav ? "fill-brand-600" : ""}`} aria-hidden /> Favorit
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600" aria-live="polite">{shown.length} kegiatan ditemukan</p>

      {shown.length === 0 ? (
        <EmptyState title="Tidak ada kegiatan yang cocok" desc="Coba ubah kata kunci, kota, atau hapus beberapa filter." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((a) => <ActivityCard key={a.id} a={a} />)}
        </div>
      )}
    </div>
  );
}
