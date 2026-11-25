"use client";

import { useEffect, useState } from "react";
import { Burger } from "../ui/Burger";
import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";
import { LangSwitcher } from "../ui/LangSwitcher";
import { Logo } from "../ui/Logo";
import { NavLink } from "../ui/NavLink";

export const NAV = [
  { href: "#about", label: "Про мене" },
  { href: "#services", label: "Консультації" },
  { href: "#approach", label: "Мій підхід" },
  { href: "#contacts", label: "Контакти" },
];
export const LANGS = ["UA", "RU", "EN"] as const;

/** Верхнє меню: закріплюється й при прокручуванні отримує напівпрозорий розмитий фон. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<string>(LANGS[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // меню закривається по Esc і на широкому екрані; фон не прокручується, поки меню відкрите
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1100 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const bg = open
    ? "bg-canvas-deep/95 backdrop-blur-sm"
    : scrolled
      ? "bg-canvas-deep/80 backdrop-blur-sm"
      : "";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 grid items-center px-gutter-sm transition-all duration-300",
        "grid-cols-[auto_1fr] sm:px-gutter-md lg:grid-cols-[1fr_auto_1fr] lg:px-gutter",
        scrolled ? "h-header-compact" : "h-header",
        bg,
      ].join(" ")}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -bottom-2 -z-10 bg-linear-to-b from-canvas-deep/60 via-canvas-deep/40 via-70% to-transparent" />
      <Logo />
      <nav aria-label="Головне меню" className="hidden gap-6 lg:flex">
        {NAV.map((i) => (
          <NavLink key={i.href} href={i.href}>
            {i.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center justify-end gap-5.5">
        <LangSwitcher languages={LANGS} value={lang} onChange={setLang} className="max-[420px]:hidden" />
        <Button href="#contacts" variant="outline" size="sm" className="max-sm:hidden">
          Записатися
        </Button>
        <Burger open={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)} className="lg:hidden" />
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={[
          "absolute left-0 right-0 top-full flex flex-col border-b border-line/35 bg-canvas-deep px-gutter-sm pb-6 pt-1 shadow-menu transition-all duration-300 sm:px-gutter-md lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <nav aria-label="Мобільне меню" className="flex flex-col">
          {NAV.map((i) => (
            <NavLink key={i.href} href={i.href} block onClick={close} tabIndex={open ? 0 : -1}>
              {i.label}
            </NavLink>
          ))}
        </nav>
        <LangSwitcher languages={LANGS} value={lang} onChange={setLang} className="mt-4 min-[421px]:hidden" />
        <Button href="#contacts" withArrow onClick={close} tabIndex={open ? 0 : -1} className="mt-6 justify-between">
          Записатися на консультацію
        </Button>
      </div>
      <Divider className="absolute inset-x-0 bottom-0" />
    </header>
  );
}
