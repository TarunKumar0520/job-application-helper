"use client";

import * as React from "react";
import { ChevronDown, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateStatusAction } from "@/app/actions";
import { Toast } from "@/components/ui/toast";
import type { ApplicationStatus } from "@/lib/ai/types";


const statusConfig: Record<
  ApplicationStatus,
  { label: string; bg: string; border: string; text: string; dot: string }
> = {
  saved: {
    label: "Saved",
    bg: "bg-sky-50 hover:bg-sky-100/80",
    border: "border-sky-200",
    text: "text-sky-700",
    dot: "bg-sky-500",
  },
  applied: {
    label: "Applied",
    bg: "bg-amber-50 hover:bg-amber-100/80",
    border: "border-amber-200",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  interviewing: {
    label: "Interviewing",
    bg: "bg-emerald-50 hover:bg-emerald-100/80",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  offer: {
    label: "Offer",
    bg: "bg-violet-50 hover:bg-violet-100/80",
    border: "border-violet-200",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-zinc-100 hover:bg-zinc-200/80",
    border: "border-zinc-200",
    text: "text-zinc-600",
    dot: "bg-zinc-400",
  },
};

interface StatusSelectProps {
  applicationId: string;
  initialStatus: ApplicationStatus;
}

export function StatusSelect({ applicationId, initialStatus }: StatusSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState<ApplicationStatus>(initialStatus);
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    if (newStatus === currentStatus || isPending) return;
    setIsOpen(false);

    startTransition(async () => {
      // Optimistically update the UI
      setCurrentStatus(newStatus);
      const res = await updateStatusAction(applicationId, newStatus);
      if (!res.success) {
        // Revert on failure
        setCurrentStatus(currentStatus);
        setToast({ message: res.error || "Failed to update status.", type: "error" });
      } else {
        setToast({ message: `Status updated to ${newStatus}!`, type: "success" });
      }
    });
  };

  const current = statusConfig[currentStatus];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        disabled={isPending}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold shadow-xs transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-70",
          current.bg,
          current.border,
          current.text
        )}
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin text-zinc-500" aria-hidden="true" />
        ) : (
          <span className={cn("h-1.5 w-1.5 rounded-full", current.dot)} />
        )}
        <span>{current.label}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-44 origin-top-left rounded-lg border border-zinc-200 bg-white p-1 shadow-md ring-1 ring-black/5 z-50 animate-in fade-in duration-100">
          <div className="py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-2.5 py-1">
            Change status
          </div>
          <div className="space-y-0.5">
            {(Object.keys(statusConfig) as ApplicationStatus[]).map((status) => {
              const option = statusConfig[status];
              const isSelected = status === currentStatus;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusChange(status)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs font-medium transition duration-150 hover:bg-zinc-50",
                    isSelected ? "text-zinc-950 bg-zinc-50/50" : "text-zinc-650 hover:text-zinc-950"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full", option.dot)} />
                    <span>{option.label}</span>
                  </div>
                  {isSelected && <Check className="h-3 w-3 text-zinc-900" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
