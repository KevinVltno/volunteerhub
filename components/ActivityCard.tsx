"use client";

import Link from "next/link";
import { CalendarDays, Heart, MapPin, Users } from "lucide-react";
import Photo from "./Photo";
import { useApp } from "@/lib/store";
import type { Activity } from "@/lib/data";

export default function ActivityCard({ a }: { a: Activity }) {
  const { favorites, toggleFavorite } = useApp();
  const fav = favorites.includes(a.id);
  const spotsLeft = Math.max(0, a.quota - a.filled);
  const pct = a.quota > 0 ? Math.min(100, Math.round((a.filled / a.quota) * 100)) : 100;

  return (
    <article className="relative rounded-2xl border border-brand-100 bg-white transition hover:shadow-lg">
      <Link href={`/app/kegiatan/${a.id}`} className="flex h-full flex-col overflow-hidden rounded-2xl">
        <Photo src={a.image} alt={`Dokumentasi kegiatan ${a.title}`} className="h-44 w-full shrink-0" />
        <div className="flex flex-1 flex-col items-start gap-3 p-4">
          <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {a.category}
          </span>
          <div>
            <h3 className="font-semibold leading-snug text-slate-900">{a.title}</h3>
            <p className="text-sm text-slate-600">{a.organizer}</p>
          </div>
          <ul className="space-y-1 text-sm text-slate-600">
            <li className="flex items-center gap-2"><MapPin className="size-4 text-brand-600" aria-hidden />{a.city}</li>
            <li className="flex items-center gap-2"><CalendarDays className="size-4 text-brand-600" aria-hidden />{a.dateLabel} · {a.time}</li>
            <li className="flex items-center gap-2"><Users className="size-4 text-brand-600" aria-hidden />{a.filled}/{a.quota} relawan</li>
          </ul>
          <div className="mt-auto w-full space-y-2 border-t border-brand-100 pt-3">
            <p className={spotsLeft === 0 ? "text-sm font-semibold text-slate-700" : "text-sm font-semibold text-brand-800"}>
              {spotsLeft === 0 ? "Kuota penuh" : "Sisa " + spotsLeft + " tempat"}
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-brand-100" aria-hidden="true">
              <div className="h-full rounded-full bg-brand-600" style={{ width: pct + "%" }} />
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggleFavorite(a.id)}
        aria-pressed={fav}
        aria-label={"Favorit: " + a.title}
        className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white/95 text-brand-700 shadow"
      >
        <Heart className={`size-5 ${fav ? "fill-brand-600" : ""}`} aria-hidden />
      </button>
    </article>
  );
}