"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section className="glass-panel rim-light flex flex-col items-center gap-6 rounded-xl border border-error/20 p-8 text-center md:flex-row md:text-left">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-error/30 bg-error-container/30 text-error shadow-[0_0_20px_rgba(255,180,171,0.2)]">
        <AlertCircle aria-hidden="true" className="h-8 w-8" />
      </div>
      <div className="flex-grow">
        <h2 className="font-display text-2xl font-bold text-error">Connection Terminated</h2>
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">{message}</p>
      </div>
      <Button variant="outline" onClick={onRetry}>
        <RefreshCw aria-hidden="true" className="h-4 w-4" />
        Retry Connection
      </Button>
    </section>
  );
}
