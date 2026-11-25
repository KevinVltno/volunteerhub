"use client";

import { useState, type FormEvent } from "react";
import ActivityCard from "@/components/ActivityCard";
import { EmptyState } from "@/components/States";
import { useApp } from "@/lib/store";

export default function FavoritPage() {
  const { activities, favorites } = useApp();
  const [query, setQuery] = useState("");
  const savedActivities = activities.filter((activity) => favorites.includes(activity.id));
  const results = savedActivities.filter((activity) =>
    [activity.title, activity.organizer, activity.city].some((value) => value.toLowerCase().includes(query))
  );

  function searchFavorites(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setQuery(String(data.get("keyword") ?? "").trim().toLowerCase());
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Kegiatan favorit</h1>
        <p className="text-slate-600">Buka kembali kegiatan yang sudah kamu simpan.</p>
      </header>

      {savedActivities.length === 0 ? (
        <EmptyState
          title="Belum ada kegiatan favorit"
          desc="Pilih ikon hati pada kegiatan yang ingin kamu simpan."
          href="/app/kegiatan"
          action="Cari kegiatan"
        />
      ) : (
        <>
          <form
            role="search"
            aria-label="Cari kegiatan favorit"
            onSubmit={searchFavorites}
            onReset={() => setQuery("")}
            className="rounded-2xl border border-brand-100 bg-white p-4"
          >
            <label htmlFor="favorite-keyword" className="text-sm font-semibold text-slate-800">Cari di favorit</label>
            <div className="mt-2 flex flex-wrap gap-2">
              <input
                id="favorite-keyword"
                name="keyword"
                type="search"
                placeholder="Nama kegiatan, penyelenggara, atau kota"
                className="min-h-11 min-w-0 basis-full rounded-xl border border-slate-300 px-3 text-sm sm:flex-1"
              />
              <button type="submit" className="min-h-11 rounded-xl bg-brand-700 px-4 text-sm font-semibold text-white">
                Cari
              </button>
              <button type="reset" className="min-h-11 rounded-xl border border-brand-200 px-4 text-sm font-semibold text-brand-800">
                Tampilkan semua
              </button>
            </div>
          </form>

          <p className="text-sm text-slate-600" aria-live="polite">{results.length} kegiatan ditemukan</p>
          {results.length === 0 ? (
            <EmptyState title="Favorit tidak ditemukan" desc="Coba kata kunci lain atau tampilkan semua favorit." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((activity) => <ActivityCard key={activity.id} a={activity} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
