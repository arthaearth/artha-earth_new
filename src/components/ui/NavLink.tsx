import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  disabled?: boolean;
  current?: boolean;
  /** Широкий варіант для мобільного меню (рядок із нижньою декоративною лінією). */
  block?: boolean;
};

export function NavLink({ disabled, current, block, className, href, children, ...rest }: Props) {
  const cls = [
    "inline-flex min-h-touch items-center text-nav font-medium uppercase text-ink-soft transition-colors",
    "hover:text-ink hover:underline hover:decoration-accent hover:underline-offset-8",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft",
    "aria-disabled:pointer-events-none aria-disabled:opacity-45",
    current ? "text-ink underline decoration-accent underline-offset-8" : "",
    block ? "w-full border-b border-line/30 py-4.5" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <a
      {...rest}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      aria-current={current ? "page" : undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
      className={cls}
    >
      {children}
    </a>
  );
}
