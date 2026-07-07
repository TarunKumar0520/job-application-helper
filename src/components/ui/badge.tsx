import { cn } from "@/lib/utils";

const styles = {
  saved: "border-sky-200 bg-sky-50 text-sky-700",
  applied: "border-amber-200 bg-amber-50 text-amber-800",
  interviewing: "border-emerald-200 bg-emerald-50 text-emerald-700",
  offer: "border-violet-200 bg-violet-50 text-violet-700",
  rejected: "border-zinc-200 bg-zinc-100 text-zinc-600",
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-zinc-200 bg-white text-zinc-600",
};

export function Badge({
  children,
  tone = "low",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof styles;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium", styles[tone], className)}>
      {children}
    </span>
  );
}
