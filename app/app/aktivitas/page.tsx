"use client";

import Link from "next/link";
import { useState } from "react";
import { Award, CalendarDays, Clock, MapPin, MapPinCheck } from "lucide-react";
import Photo from "@/components/Photo";
import Stepper from "@/components/Stepper";
import { EmptyState } from "@/components/States";
import { useApp } from "@/lib/store";

const steps = ["Terdaftar", "Check-in", "Catat jam", "Sertifikat"];
const stepOf = { terdaftar: 1, checkin: 2, selesai: 4 } as const;

export default function AktivitasPage() {
  const { registrations, checkIn, complete, getActivity } = useApp();
  const [open, setOpen] = useState<string | null>(null);
  const [hours, setHours] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [err, setErr] = useState("");

  if (registrations.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Aktivitas saya</h1>
        <EmptyState title="Belum ada kegiatan" desc="Daftar kegiatan pertamamu untuk mulai mencatat kontribusi." href="/app/kegiatan" action="Cari kegiatan" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Aktivitas saya</h1>
        <p className="text-slate-600">5. Check-in, catat jam kontribusi, lalu terima sertifikat.</p>
      </div>

      <p role="status" className={notice ? "rounded-xl bg-brand-100 p-3 text-sm font-semibold text-brand-800" : "sr-only"}>{notice}</p>

      <div className="space-y-5">
        {registrations.map((r) => {
          const a = getActivity(r.activityId);
          if (!a) return null;
          const value = hours[r.id] ?? String(a.hours);

          return (
            <article key={r.id} className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
              <div className="grid sm:grid-cols-[14rem_1fr]">
                <Photo src={a.image} alt={`Dokumentasi ${a.title}`} className="h-40 w-full sm:h-full" />
                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="text-lg font-bold text-brand-900">{a.title}</h2>
                    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                      <li className="flex items-center gap-1.5"><MapPin className="size-4 text-brand-600" aria-hidden />{a.city}</li>
                      <li className="flex items-center gap-1.5"><CalendarDays className="size-4 text-brand-600" aria-hidden />{a.dateLabel}</li>
                      <li className="flex items-center gap-1.5"><Clock className="size-4 text-brand-600" aria-hidden />{a.time}</li>
                    </ul>
                  </div>

                  <Stepper steps={steps} current={stepOf[r.status]} />

                  {r.status === "terdaftar" && (
                    <button
                      onClick={async () => {
                        try {
                          await checkIn(r.id);
                          setNotice(`Check-in berhasil untuk ${a.title}.`);
                        } catch (e) {
                          setNotice(e instanceof Error ? e.message : "Check-in gagal.");
                        }
                      }}
                      className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800"
                    >
                      <MapPinCheck className="size-5" aria-hidden /> Check-in sekarang
                    </button>
                  )}

                  {r.status === "checkin" && (
                    open === r.id ? (
                      <div className="space-y-3 rounded-xl bg-brand-50 p-4">
                        <label htmlFor={`h-${r.id}`} className="text-sm font-semibold text-slate-800">Jam kontribusi (1–12 jam)</label>
                        <input
                          id={`h-${r.id}`} type="number" min={1} max={12} value={value}
                          onChange={(e) => setHours({ ...hours, [r.id]: e.target.value })}
                          aria-invalid={!!err} aria-describedby={err ? `e-${r.id}` : undefined}
                          className="block min-h-12 w-32 rounded-xl border border-slate-300 bg-white px-4"
                        />
                        {err && <p id={`e-${r.id}`} className="text-sm text-red-600">{err}</p>}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={async () => {
                              const n = Number(value);
                              if (!Number.isInteger(n) || n < 1 || n > 12) {
                                setErr("Isi jam dengan angka bulat 1 sampai 12.");
                                return;
                              }
                              try {
                                setErr("");
                                await complete(r.id, n);
                                setOpen(null);
                                setNotice(`Jam kontribusi tersimpan. Sertifikat ${a.title} siap!`);
                              } catch (e) {
                                setErr(e instanceof Error ? e.message : "Gagal menyimpan jam.");
                              }
                            }}
                            className="min-h-12 rounded-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800"
                          >
                            Simpan & terima sertifikat
                          </button>
                          <button onClick={() => { setOpen(null); setErr(""); }} className="min-h-12 rounded-xl border border-brand-200 bg-white px-5 font-semibold text-brand-800">
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setOpen(r.id)} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800">
                        <Clock className="size-5" aria-hidden /> Catat jam kontribusi
                      </button>
                    )
                  )}

                  {r.status === "selesai" && (
                    <div className="flex flex-wrap items-center gap-3">
                      <Link href={`/app/sertifikat/${r.id}`} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800">
                        <Award className="size-5" aria-hidden /> Lihat sertifikat
                      </Link>
                      <span className="text-sm font-semibold text-brand-700">{r.hours} jam tercatat</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}