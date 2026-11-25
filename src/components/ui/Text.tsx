import type { ElementType, HTMLAttributes } from "react";

const variants = {
  eyebrow: { tag: "p", cls: "text-eyebrow font-medium uppercase text-accent" },
  display: { tag: "h1", cls: "font-display text-display-sm italic text-ink sm:text-display" },
  lead: { tag: "p", cls: "max-w-lead text-lead-sm text-ink-soft sm:text-lead" },
  body: { tag: "p", cls: "max-w-sub text-body-sm text-ink-muted sm:text-body" },
  quote: { tag: "p", cls: "font-display text-quote font-medium italic text-accent" },
  caption: { tag: "p", cls: "text-caption font-medium uppercase text-ink-soft" },
} as const;

export type TextVariant = keyof typeof variants;

type Props = HTMLAttributes<HTMLElement> & { variant: TextVariant; as?: ElementType };

export function Text({ variant, as, className, ...rest }: Props) {
  const v = variants[variant];
  const Tag = (as ?? v.tag) as ElementType;
  return <Tag className={[v.cls, className].filter(Boolean).join(" ")} {...rest} />;
}
