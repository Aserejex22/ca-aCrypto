import * as React from "react";

// Simple utility function
function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-green-200/50 selection:bg-green-500 selection:text-white bg-white/10 backdrop-blur-lg border border-white/20 flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base text-white transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-green-400 focus-visible:ring-green-500/30 focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export { Input };