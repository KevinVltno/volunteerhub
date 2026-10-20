import Link from "next/link";
import { SearchX, WifiOff } from "lucide-react";

export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-brand-100 bg-white" aria-hidden>
      <div className="h-44 bg-brand-100" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-20 rounded-full bg-brand-100" />
        <div className="h-4 w-3/4 rounded bg-brand-100" />
        <div className="h-3 w-1/2 rounded bg-brand-50" />
        <div className="h-2 w-full rounded bg-brand-50" />
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  desc,
  href,
  action,
}: {
  title: string;
  desc: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-brand-200 bg-white px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-brand-50 text-brand-700">
        <SearchX className="size-7" aria-hidden />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-brand-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-600">{desc}</p>
      {href && action && (
        <Link href={href} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800">
          {action}
        </Link>
      )}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="grid place-items-center rounded-2xl border border-red-200 bg-white px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-red-50 text-red-600">
        <WifiOff className="size-7" aria-hidden />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">Gagal memuat data</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-600">{message}</p>
      <button onClick={onRetry} className="mt-5 min-h-11 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800">
        Coba lagi
      </button>
    </div>
  );
}