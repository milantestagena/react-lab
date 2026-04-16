"use client";

import { type ComponentProps } from "react";

// ComponentProps<"input"> sadrži SVE native HTML input atribute — uključujući
// `ref` (React 19 ga tretira kao običan prop, ne special case).
// Extend-ujemo da dodamo naše custom props pored native-a.
type CustomInputProps = ComponentProps<"input"> & {
  label?: string;
};

// React 19: ref dolazi kao običan prop — nema forwardRef omotača.
// Destrukturišemo label odvojeno, ostatak (...props) ide direktno na <input>.
// ref je unutar ...props i React ga automatski "zakači" na DOM čvor.
export default function CustomInput({ label, className, ...props }: CustomInputProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </label>
      )}
      <input
        className={[
          "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900",
          "outline-none transition",
          "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50",
          "dark:focus:border-zinc-500 dark:focus:ring-zinc-700",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}
