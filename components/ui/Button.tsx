"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0",
      outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white hover:-translate-y-0.5",
      ghost: "text-navy-900 hover:opacity-70",
      danger: "bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-xs tracking-wide",
      md: "px-8 py-3.5 text-sm tracking-wide",
      lg: "px-10 py-4 text-base tracking-wide",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Procesando...
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
