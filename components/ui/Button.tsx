"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "outline" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-on-primary-container shadow-[0_0_18px_rgba(220,38,38,0.32)] hover:bg-red-500",
  ghost: "text-on-surface-variant hover:bg-white/5 hover:text-on-surface",
  outline:
    "border border-primary-container/30 bg-primary-container/10 text-primary hover:bg-primary-container/20",
  icon: "h-10 w-10 rounded-full border border-white/10 bg-black/45 text-on-surface-variant hover:bg-black/70 hover:text-white"
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold uppercase tracking-wide transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-45",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
