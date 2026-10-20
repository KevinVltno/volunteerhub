"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, Heart, MapPin, Users } from "lucide-react";
import Photo from "@/components/Photo";
import { EmptyState } from "@/components/States";
import { useApp } from "@/lib/store";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { favorites, toggleFavorite, registrations, getActivity } = useApp();
  const a = getActivity(id);

  if (!a) {
    return <EmptyState title="Kegiatan tidak ditemukan" desc="Kegiatan ini mungkin sudah ditutup." href="/app/kegiatan" action="Kembali ke katalog" />;
  }

  const fav = favorites.includes(a.id);
  const registered = registrations.some((r) => r.activityId === a.id);
  const full = a.filled >= a.quota;

  return (
    <div className="space-y-6">
      <Link href="/app/kegiatan" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
        <ArrowLeft className="size-4" aria-hidden /> Kembali
      </Link>

      <Photo src={a.image} alt={`Dokumentasi kegiatan ${a.title}`} className="h-56 w-full rounded-3xl sm:h-80" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">{a.category}</span>
            <h1 className="mt-3 text-2xl font-extrabold text-brand-900 sm:text-3xl">{a.title}</h1>
            <p className="text-slate-600">oleh {a.organizer}</p>
            <p className="mt-4 text-slate-700">{a.summary}</p>
          </div>

          <section className="rounded-2xl border border-brand-100 bg-white p-5">
            <h2 className="font-bold text-brand-900">Yang akan kamu lakukan</h2>
            <ul className="mt-3 space-y-2">
              {a.tasks.map((t) => (
                <li key={t} className="flex gap-2 text-slate-700"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />{t}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-brand-100 bg-white p-5">
            <h2 className="font-bold text-brand-900">Syarat & persiapan</h2>
            <ul className="mt-3 space-y-2">
              {a.requirements.map((t) => (
                <li key={t} className="flex gap-2 text-slate-700"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-brand-100 bg-white p-5 lg:sticky lg:top-6">
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-center gap-3"><MapPin className="size-5 text-brand-600" aria-hidden />{a.place}, {a.city}</li>
            <li className="flex items-center gap-3"><CalendarDays className="size-5 text-brand-600" aria-hidden />{a.dateLabel}</li>
            <li className="flex items-center gap-3"><Clock className="size-5 text-brand-600" aria-hidden />{a.time} ({a.hours} jam)</li>
            <li className="flex items-center gap-3"><Users className="size-5 text-brand-600" aria-hidden />{a.filled}/{a.quota} relawan</li>
          </ul>

          {registered ? (
            <Link href="/app/aktivitas" className="flex min-h-12 items-center justify-center rounded-xl bg-brand-100 font-semibold text-brand-800">
              Sudah terdaftar · Lihat aktivitas
            </Link>
          ) : full ? (
            <button disabled className="min-h-12 w-full rounded-xl bg-slate-200 font-semibold text-slate-500">Kuota penuh</button>
          ) : (
            <Link href={`/app/kegiatan/${a.id}/daftar`} className="flex min-h-12 items-center justify-center rounded-xl bg-brand-700 font-semibold text-white hover:bg-brand-800">
              Daftar jadi relawan
            </Link>
          )}

          <button
            onClick={() => toggleFavorite(a.id)} aria-pressed={fav}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-200 text-sm font-semibold text-brand-800 hover:bg-brand-50"
          >
            <Heart className={`size-4 ${fav ? "fill-brand-600" : ""}`} aria-hidden /> {fav ? "Tersimpan" : "Simpan ke favorit"}
          </button>
        </aside>
      </div>
    </div>
  );
}