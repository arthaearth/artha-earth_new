import { Spiral } from "../decor/Spiral";

/** Логотип: ARTHA ⟲ EARTH, спіраль замінює «&». */
export function Logo({ href = "#top", className }: { href?: string; className?: string }) {
  return (
    <a
      href={href}
      className={[
        "flex w-fit flex-col text-accent-soft transition-colors hover:text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="whitespace-nowrap font-display text-logo font-medium">
        ARTHA <span className="sr-only">&amp;</span><Spiral className="relative top-0.5 inline-block size-5 -translate-x-px" /> EARTH
      </span>
      <span className="mt-0.75 text-logo-tag font-medium">VEDIC KNOWLEDGE</span>
    </a>
  );
}
