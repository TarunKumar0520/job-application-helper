"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = "success", duration = 4000, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      className={cn(
        "fixed top-5 right-5 z-50 flex items-center gap-3 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
        "animate-in fade-in slide-in-from-top-5 duration-200",
        type === "success"
          ? "border-emerald-100 bg-emerald-50 text-emerald-800"
          : "border-rose-100 bg-rose-50 text-rose-800"
      )}
    >
      <div className="flex-shrink-0">
        {type === "success" ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        ) : (
          <AlertCircle className="h-5 w-5 text-rose-600" aria-hidden="true" />
        )}
      </div>
      <div className="flex-1 text-xs font-semibold leading-relaxed pr-2">
        {message}
      </div>
      <button
        type="button"
        onClick={onClose}
        className={cn(
          "inline-flex rounded-md p-1 transition focus:outline-hidden focus:ring-2 focus:ring-offset-2",
          type === "success"
            ? "text-emerald-500 hover:bg-emerald-100 focus:ring-emerald-600 focus:ring-offset-emerald-50"
            : "text-rose-500 hover:bg-rose-100 focus:ring-rose-600 focus:ring-offset-rose-50"
        )}
      >
        <span className="sr-only">Close</span>
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
