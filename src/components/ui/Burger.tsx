import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean };

const bar =
  "absolute left-2 right-2 h-px bg-accent-soft rounded-hairline transition-all duration-300 group-hover:bg-ink";

export function Burger({ open = false, className, ...rest }: Props) {
  return (
    <button
      type="button"
      aria-label={open ? "Закрити меню" : "Відкрити меню"}
      aria-expanded={open}
      className={[
        "group relative -mr-2 size-touch transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className={`${bar} ${open ? "top-5.5 rotate-45" : "top-4"}`} />
      <span className={`${bar} top-5.5 ${open ? "opacity-0" : ""}`} />
      <span className={`${bar} ${open ? "top-5.5 -rotate-45" : "top-7"}`} />
    </button>
  );
}
