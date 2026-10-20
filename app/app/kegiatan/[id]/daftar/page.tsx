"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { EmptyState } from "@/components/States";
import { useApp } from "@/lib/store";

type Form = { fullName: string; phone: string; motivation: string; agree: boolean };
type Errors = Partial<Record<keyof Form, string>>;

function validate(f: Form): Errors {
  const e: Errors = {};
  if (f.fullName.trim().length < 3) e.fullName = "Nama lengkap minimal 3 karakter.";
  if (!/^(\+62|62|0)8\d{8,11}$/.test(f.phone.replace(/[\s-]/g, "")))
    e.phone = "Nomor WhatsApp belum benar, contoh: 081234567890.";
  if (f.motivation.trim().length < 20) e.motivation = "Ceritakan motivasimu minimal 20 karakter.";
  if (!f.agree) e.agree = "Kamu perlu menyetujui ketentuan relawan.";
  return e;
}

export default function DaftarPage() {
  const { id } = useParams<{ id: string }>();
  const { user, registrations, register, getActivity } = useApp();
  const a = getActivity(id);
  const draftKey = `vh-draft-${id}`;

  const [form, setForm] = useState<Form>(() => {
    const base: Form = { fullName: user?.name ?? "", phone: "", motivation: "", agree: false };
    try {
      const raw = sessionStorage.getItem(draftKey);
      return raw ? { ...base, ...JSON.parse(raw) } : base;
    } catch {
      return base;
    }
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // Simpan draft agar input tidak hilang saat pengguna kembali
  useEffect(() => {
    try { sessionStorage.setItem(draftKey, JSON.stringify(form)); } catch {}
  }, [form, draftKey]);

  if (!a) return <EmptyState title="Kegiatan tidak ditemukan" desc="Kegiatan ini mungkin sudah ditutup." href="/app/kegiatan" action="Kembali ke katalog" />;

  const already = registrations.some((r) => r.activityId === a.id);

  if (success || already) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-brand-100 bg-white p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-14 text-brand-600" aria-hidden />
        <h1 className="mt-4 text-2xl font-extrabold text-brand-900">
          {success ? "Pendaftaran berhasil!" : "Kamu sudah terdaftar"}
        </h1>
        <p className="mt-2 text-slate-600">{a.title} · {a.dateLabel}, {a.time}</p>
        <p className="mt-1 text-sm text-slate-600">Langkah berikutnya: check-in saat hari kegiatan.</p>
        <Link href="/app/aktivitas" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800">
          Lihat aktivitas saya
        </Link>
      </div>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      register(a!.id, {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        motivation: form.motivation.trim(),
      });
      try { sessionStorage.removeItem(draftKey); } catch {}
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Pendaftaran gagal. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  const input = (bad?: string) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 text-slate-900 focus:border-brand-600 ${bad ? "border-red-500" : "border-slate-300"}`;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href={`/app/kegiatan/${a.id}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
        <ArrowLeft className="size-4" aria-hidden /> Kembali ke detail
      </Link>
      <div>
        <h1 className="text-2xl font-extrabold text-brand-900">4. Daftar relawan</h1>
        <p className="text-slate-600">{a.title} · {a.dateLabel}</p>
      </div>

      <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-brand-100 bg-white p-5 sm:p-6">
        {serverError && (
          <div role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</div>
        )}
        {Object.keys(errors).length > 0 && (
          <div role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Ada {Object.keys(errors).length} isian yang perlu diperbaiki.
          </div>
        )}

        <div>
          <label htmlFor="fullName" className="text-sm font-semibold text-slate-800">Nama lengkap</label>
          <input id="fullName" value={form.fullName} autoComplete="name"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fn-err" : undefined}
            className={`${input(errors.fullName)} min-h-12`} />
          {errors.fullName && <p id="fn-err" className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>}
          <p className="mt-1 text-xs text-slate-500">Nama ini akan tercetak di sertifikat.</p>
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-slate-800">Nomor WhatsApp</label>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} placeholder="081234567890"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "ph-err" : undefined}
            className={`${input(errors.phone)} min-h-12`} />
          {errors.phone && <p id="ph-err" className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="motivation" className="text-sm font-semibold text-slate-800">Motivasi bergabung</label>
          <textarea id="motivation" rows={4} value={form.motivation}
            onChange={(e) => setForm({ ...form, motivation: e.target.value })}
            aria-invalid={!!errors.motivation} aria-describedby={errors.motivation ? "mo-err" : undefined}
            className={`${input(errors.motivation)} py-3`} />
          {errors.motivation && <p id="mo-err" className="mt-1.5 text-sm text-red-600">{errors.motivation}</p>}
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              aria-invalid={!!errors.agree} className="mt-0.5 size-5 accent-brand-700" />
            Saya bersedia hadir tepat waktu dan mengikuti arahan koordinator kegiatan.
          </label>
          {errors.agree && <p className="mt-1.5 text-sm text-red-600">{errors.agree}</p>}
        </div>

        <button type="submit" disabled={submitting}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 font-semibold text-white hover:bg-brand-800 disabled:opacity-70">
          {submitting && <Loader2 className="size-5 animate-spin" aria-hidden />}
          {submitting ? "Mengirim..." : "Kirim pendaftaran"}
        </button>
      </form>
    </div>
  );
}