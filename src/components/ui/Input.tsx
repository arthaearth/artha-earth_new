import { useId, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string };

/** Поле форми. Межа інтерактивного елемента: ink-muted (≥ 3:1), не line. */
export function Input({ label, hint, className, id, ...rest }: Props) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className="text-caption font-medium uppercase text-ink-soft">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={hintId}
        className={[
          "min-h-control rounded-control border border-ink-muted bg-canvas-deep/60 px-4 text-body-sm text-ink",
          "placeholder:text-ink-muted transition-colors hover:border-ink-soft",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft focus-visible:border-accent-soft",
          "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-ink-muted",
        ].join(" ")}
        {...rest}
      />
      {hint && (
        <p id={hintId} className="text-caption text-ink-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
