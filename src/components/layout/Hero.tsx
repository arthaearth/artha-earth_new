import Image from "next/image";
import { GoldDust } from "../decor/GoldDust";
import { SriYantra } from "../decor/SriYantra";
import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";
import { Text } from "../ui/Text";

const DIRECTIONS = ["Джйотіш", "Нумерологія", "Васту", "Аюрведа"];

const rays = "pointer-events-none absolute mix-blend-screen h-auto [filter:sepia(1)_saturate(2.4)_hue-rotate(-14deg)_brightness(1.15)] motion-reduce:animate-none";

/** Перший екран: складається з компонентів системи (Text, Button, Divider) і декору. */
export function Hero() {
  return (
    <section
      data-hero
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-canvas pt-header sm:h-screen sm:min-h-hero-min sm:max-h-hero-max"
    >
      {/* фільтри «течії» для золотої димки */}
      <svg width="0" height="0" className="absolute size-0" aria-hidden focusable="false">
        <filter id="smoke-warp-a" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0055 0.0085" numOctaves="2" seed="4" result="n">
            <animate attributeName="baseFrequency" dur="104s" repeatCount="indefinite" values="0.0055 0.0085;0.0085 0.0062;0.0058 0.0098;0.0055 0.0085" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="smoke-warp-b" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0075 0.005" numOctaves="2" seed="11" result="n">
            <animate attributeName="baseFrequency" dur="134s" repeatCount="indefinite" values="0.0075 0.005;0.005 0.0092;0.0092 0.0058;0.0075 0.005" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="42" xChannelSelector="G" yChannelSelector="R" />
        </filter>
      </svg>

      <Image src="/images/hero-forest.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
      {/* затемнення під текст: три шари з токенів поверхонь */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-canvas-deep/80 via-canvas-deep/25 via-55% to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-canvas/90 via-canvas/70 via-48% to-canvas/35" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-canvas/70 to-transparent to-50%" />
      <div aria-hidden="true" className="absolute inset-0 bg-canvas-deep/50 sm:hidden" />

      <Image src="/images/light-rays.png" alt="" width={1254} height={1254} priority
        className={`${rays} -right-[4%] -top-[6%] w-[40%] max-w-145 origin-[80%_12%] animate-rays-1-sm sm:animate-rays-1`} />
      <Image src="/images/light-rays.png" alt="" width={1254} height={1254} aria-hidden
        className={`${rays} right-[3%] -top-[9%] w-[30%] opacity-10 blur-[3px] animate-rays-2-sm sm:animate-rays-2`} />

      <div aria-hidden="true" className="pointer-events-none absolute -right-30 top-yantra-top aspect-yantra w-yantra opacity-15 sm:opacity-35 lg:left-[calc(46.67%+var(--spacing-yantra-offset))] lg:right-auto lg:opacity-60">
        <div className="absolute inset-0 origin-[50%_48.5%] animate-orbit-cw motion-reduce:animate-none">
          <Image src="/images/yantra-glow-clean.png" alt="" fill sizes="570px" priority
            className="object-contain [filter:url(#smoke-warp-a)] animate-smoke-1 motion-reduce:animate-none" />
        </div>
        <div className="absolute inset-0 origin-[50%_48.5%] animate-orbit-ccw motion-reduce:animate-none">
          <Image src="/images/yantra-glow-clean.png" alt="" fill sizes="570px"
            className="object-contain opacity-60 mix-blend-screen [filter:url(#smoke-warp-b)_blur(2px)] animate-smoke-2 motion-reduce:animate-none" />
        </div>
        <SriYantra />
        <div className="absolute -inset-[22%] mix-blend-screen animate-light motion-reduce:animate-none [background:radial-gradient(ellipse_closest-side_at_74%_26%,color-mix(in_srgb,var(--color-light)_40%,transparent),color-mix(in_srgb,var(--color-light)_14%,transparent)_50%,transparent_100%)]" />
      </div>
      <GoldDust />

      <div className="relative z-10 my-auto flex max-w-hero flex-col px-gutter-sm py-12 sm:px-gutter-md sm:py-0 lg:px-gutter">
        <Text variant="eyebrow">Давні ведичні знання для сучасного життя</Text>
        <Text variant="display" className="mb-6 mt-5">«Сила в спокої»</Text>
        <Text variant="lead">
          Пізнайте свою природу. Відкрийте власні ресурси. Знайдіть внутрішню опору та ясність у
          прийнятті важливих життєвих рішень.
        </Text>
        <Text variant="body" className="mt-2.5">
          Індивідуальні консультації з Астрології (Джйотіш), ведичної нумерології, Васту та Аюрведи.
        </Text>
        <Text variant="quote" className="mt-6">Не просто практикувати йогу. Жити в йозі.</Text>
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-9">
          <Button href="#contacts" withArrow>Записатися на консультацію</Button>
          <Button href="#approach" variant="outline">Мій підхід</Button>
        </div>
      </div>

      <footer className="relative z-10 grid items-center gap-2 px-gutter-sm pb-4.5 pt-3.5 sm:gap-6 sm:px-gutter-md lg:h-strip lg:grid-cols-[1fr_auto_1fr] lg:px-gutter lg:py-0">
        <Divider className="absolute inset-x-0 top-0" />
        <span className="whitespace-nowrap text-caption-fluid font-medium uppercase text-ink-soft sm:text-caption">
          Понад 10 років вивчення ведичних наук
        </span>
        <ul className="flex flex-nowrap gap-[.6em] whitespace-nowrap text-caption-fluid font-medium uppercase text-ink-soft sm:text-caption">
          {DIRECTIONS.map((d, i) => (
            <li key={d} className="flex gap-[.6em]">
              {i > 0 && <span aria-hidden="true" className="font-bold text-ink-muted">·</span>}
              {d}
            </li>
          ))}
        </ul>
        <a href="#services" className="hidden min-h-touch items-center justify-self-end text-caption font-medium tracking-[0.125em] text-accent hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft lg:flex">
          Гортати вниз <span aria-hidden="true" className="ml-1.5">↓</span>
        </a>
      </footer>
    </section>
  );
}
