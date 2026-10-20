"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Award, Printer } from "lucide-react";
import { EmptyState } from "@/components/States";
import { useApp } from "@/lib/store";

export default function SertifikatPage() {
  const { id } = useParams<{ id: string }>();
  const { registrations, getActivity } = useApp();
  const r = registrations.find((x) => x.id === id && x.status === "selesai");
  const a = r ? getActivity(r.activityId) : undefined;

  if (!r || !a) {
    return <EmptyState title="Sertifikat belum tersedia" desc="Selesaikan check-in dan catat jam kontribusi terlebih dahulu." href="/app/aktivitas" action="Ke aktivitas saya" />;
  }

  const date = new Date(r.completedAt!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/app/aktivitas" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
          <ArrowLeft className="size-4" aria-hidden /> Kembali
        </Link>
        <button onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800">
          <Printer className="size-4" aria-hidden /> Cetak / simpan PDF
        </button>
      </div>

      <div className="mx-auto max-w-3xl rounded-3xl border-8 border-brand-700 bg-white p-3">
        <div className="rounded-2xl border-2 border-brand-300 px-6 py-12 text-center sm:px-14">
          <Award className="mx-auto size-14 text-brand-700" aria-hidden />
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-brand-700">Sertifikat Relawan</p>
          <p className="mt-6 text-slate-600">Diberikan kepada</p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-900 sm:text-4xl">{r.fullName}</h1>
          <p className="mx-auto mt-6 max-w-lg text-slate-700">
            atas kontribusinya sebagai relawan selama <strong>{r.hours} jam</strong> dalam kegiatan
          </p>
          <p className="mt-2 text-xl font-bold text-brand-800">{a.title}</p>
          <p className="text-slate-600">{a.organizer} · {a.city}</p>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-slate-600 sm:flex-row">
            <p>Diterbitkan {date}</p>
            <p className="font-mono font-semibold text-brand-800">No. {r.certificateId}</p>
            <p className="font-bold text-brand-800">VolunteerHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}