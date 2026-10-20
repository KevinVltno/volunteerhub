import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import AppShell from "@/components/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center">
          <Loader2 className="size-8 animate-spin text-brand-600" aria-label="Memuat" />
        </div>
      }
    >
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
