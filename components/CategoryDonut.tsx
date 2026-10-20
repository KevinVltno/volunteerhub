"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export const DONUT_COLORS = ["#1a6e43", "#2fa866", "#6fcf97", "#f2c94c", "#56a3d9"];

type Item = { name: string; value: number };

export default function CategoryDonut({ data, unit, label }: { data: Item[]; unit: string; label: string }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div>
      <div className="relative mx-auto h-48 w-full max-w-60" role="img" aria-label={label}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="100%" paddingAngle={2} stroke="none">
              {data.map((d, i) => (
                <Cell key={d.name} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v} ${unit}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-2xl font-extrabold text-brand-900">{total}</p>
            <p className="text-xs text-slate-600">{unit}</p>
          </div>
        </div>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2 text-slate-700">
            <span className="size-3 shrink-0 rounded-full" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} aria-hidden />
            <span className="truncate">{d.name}</span>
            <span className="ml-auto font-semibold text-slate-900">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
