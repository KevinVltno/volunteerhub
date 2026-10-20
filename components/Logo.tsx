import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-bold text-brand-900">
      <span className="grid size-9 place-items-center rounded-xl bg-brand-700 text-white">
        <HeartHandshake className="size-5" aria-hidden />
      </span>
      VolunteerHub
    </Link>
  );
}