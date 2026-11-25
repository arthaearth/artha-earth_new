import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline";
type Size = "md" | "sm";

type Common = {
  variant?: Variant;
  size?: Size;
  /** Стрілка після підпису. */
  withArrow?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common>;
type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common>;
export type ButtonProps = AsButton | AsLink;

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-control transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft " +
  "disabled:cursor-not-allowed disabled:opacity-45 aria-disabled:cursor-not-allowed aria-disabled:opacity-45 " +
  "disabled:pointer-events-none aria-disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid:
    "gap-7 bg-accent font-semibold text-ink-on-accent shadow-glow " +
    "hover:shadow-glow-strong hover:brightness-110",
  // межа порожньої кнопки — ink-muted (≥ 3:1), не line
  outline:
    "border-2 border-ink-muted font-medium text-accent-soft hover:bg-accent/10 hover:border-ink-soft",
};

const sizes: Record<Size, string> = {
  md: "min-h-control px-6 text-button",
  sm: "min-h-touch px-4.5 py-3 text-button-sm",
};

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.75 9H13.5M10.5 5.25L14.25 9L10.5 12.75" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "solid", size = "md", withArrow, disabled, className, children, ...rest } = props;
  const cls = [base, variants[variant], sizes[size], size === "sm" && variant === "outline" ? "bg-canvas-deep/60 font-semibold text-ink" : "", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as Omit<AsLink, keyof Common>;
    return (
      <a
        {...anchor}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchor.tabIndex}
        className={cls}
      >
        {content}
      </a>
    );
  }
  const { type = "button", ...button } = rest as Omit<AsButton, keyof Common>;
  return (
    <button {...button} type={type} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}
