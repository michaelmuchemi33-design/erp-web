import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

const variantClasses = {
  default:
    "bg-slate-950 text-white shadow-sm hover:bg-slate-900 active:bg-slate-800",
  outline:
    "border border-slate-200/90 bg-white text-slate-800 shadow-sm hover:bg-slate-50 active:bg-slate-100",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100/80 active:bg-slate-100",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`pressable focus-ring inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-[-0.01em] transition-[background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
