import Link from "next/link";
import {
  ArrowRight, CalendarCheck, Award, ClipboardCheck, Compass, FileText, HeartHandshake, MapPinCheck, Search,
} from "lucide-react";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { galleryPhotos, heroImage } from "@/lib/data";

const steps = [
  { icon: Compass, title: "Pilih minat", desc: "Tentukan isu yang kamu pedulikan." },
  { icon: Search, title: "Cari kegiatan", desc: "Filter berdasarkan lokasi dan waktu." },
  { icon: FileText, title: "Buka detail", desc: "Lihat tugas dan syarat dengan jelas." },
  { icon: ClipboardCheck, title: "Daftar", desc: "Isi formulir singkat, selesai < 2 menit." },
  { icon: MapPinCheck, title: "Check-in", desc: "Catat kehadiranmu di lokasi." },
  { icon: Award, title: "Terima sertifikat", desc: "Bukti kontribusi resmi untukmu." },
];

export default function Landing() {
  return (
    <div className="bg-white text-slate-800">
      <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="flex items-center gap-2">
            <Link href="/login" className="hidden min-h-11 items-center rounded-xl px-4 text-sm font-semibold text-brand-800 hover:bg-brand-50 sm:inline-flex">
              Masuk
            </Link>
            <Link href="/login" className="inline-flex min-h-11 items-center rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800">
              Daftar sekarang
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-brand-50">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-200">
                <HeartHandshake className="size-4" aria-hidden /> Platform relawan Aksi Sosial
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-brand-900 sm:text-5xl">
                Satu langkah kecilmu, perubahan besar untuk mereka.
              </h1>
              <p className="mt-4 max-w-lg text-lg text-slate-600">
                Temukan kegiatan sosial yang cocok dengan waktu dan kemampuanmu, daftar dalam hitungan menit, dan dapatkan sertifikat kontribusi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800">
                  Daftar sekarang <ArrowRight className="size-5" aria-hidden />
                </Link>
                <a href="#dokumentasi" className="inline-flex min-h-12 items-center rounded-xl border border-brand-300 bg-white px-6 font-semibold text-brand-800 hover:bg-brand-50">
                  Lihat kegiatan
                </a>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
                {[["32", "Aksi terbuka"], ["680", "Jam kontribusi"], ["14", "Kota"]].map(([v, l]) => (
                  <div key={l}>
                    <dt className="text-3xl font-extrabold text-brand-700">{v}</dt>
                    <dd className="text-sm text-slate-600">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Photo src={heroImage} alt="Relawan bergandengan tangan dalam kegiatan sosial" className="h-80 w-full rounded-3xl shadow-xl lg:h-[28rem]" />
          </div>
        </section>

        <section id="dokumentasi" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
          <h2 className="text-3xl font-bold text-brand-900">Dokumentasi kegiatan</h2>
          <p className="mt-2 max-w-xl text-slate-600">Momen nyata dari relawan yang sudah bergabung. Selanjutnya, giliran kamu.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {galleryPhotos.map((a) => (
              <figure key={a.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Photo src={a.image} alt={`Dokumentasi ${a.title}`} className="h-full w-full" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-brand-900/80 p-3 text-xs font-semibold text-white">
                  {a.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="bg-brand-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-brand-900">Cara kerjanya</h2>
            <p className="mt-2 text-slate-600">Dari niat hingga hasil yang bisa dikonfirmasi.</p>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-brand-100 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-sm font-bold text-brand-600">Langkah {i + 1}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col items-center rounded-3xl bg-brand-700 px-6 py-12 text-center text-white">
            <CalendarCheck className="size-10" aria-hidden />
            <h2 className="mt-4 text-3xl font-bold">Siap jadi bagian dari perubahan?</h2>
            <p className="mt-2 max-w-md text-brand-100">Buat akunmu dan temukan kegiatan pertamamu hari ini.</p>
            <Link href="/login" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 font-semibold text-brand-800 hover:bg-brand-50">
              Daftar sekarang <ArrowRight className="size-5" aria-hidden />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-100 py-6 text-center text-sm text-slate-600">
        © 2026 VolunteerHub · Aksi Sosial
      </footer>
    </div>
  );
}