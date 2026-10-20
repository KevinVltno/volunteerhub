import { Check } from "lucide-react";

export default function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex gap-2" aria-label="Progres kegiatan">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} aria-current={active ? "step" : undefined} className="flex flex-1 flex-col items-center gap-1.5 text-center">
            <span
              className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                done
                  ? "bg-brand-700 text-white"
                  : active
                  ? "border-2 border-brand-700 bg-white text-brand-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {done ? <Check className="size-4" aria-hidden /> : i + 1}
            </span>
            <span className={`text-xs ${done || active ? "font-semibold text-brand-900" : "text-slate-500"}`}>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}