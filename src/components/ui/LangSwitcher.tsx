"use client";

import type { ButtonHTMLAttributes } from "react";

type LangButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean };

export function LangButton({ active, className, children, ...rest }: LangButtonProps) {
  const cls = [
    "min-h-touch min-w-touch border-b px-0.5 text-micro transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft",
    "disabled:cursor-not-allowed disabled:opacity-45",
    active
      ? "border-accent font-bold text-ink"
      : "border-transparent font-normal text-ink-soft hover:text-ink hover:border-ink-muted",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" aria-pressed={!!active} className={cls} {...rest}>
      {children}
    </button>
  );
}

type Props = {
  languages: readonly string[];
  value: string;
  onChange?: (lang: string) => void;
  className?: string;
};

export function LangSwitcher({ languages, value, onChange, className }: Props) {
  return (
    <div role="group" aria-label="Мова" className={["flex gap-2", className].filter(Boolean).join(" ")}>
      {languages.map((l) => (
        <LangButton key={l} active={l === value} onClick={() => onChange?.(l)}>
          {l}
        </LangButton>
      ))}
    </div>
  );
}
