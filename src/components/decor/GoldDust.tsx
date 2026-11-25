"use client";

import { useEffect, useRef } from "react";

/**
 * Золоті частинки: кілька неспішно пливуть екраном. Поки курсор (або палець) рухається,
 * невелика група збирається за ним і кружляє — рухом курсора нею можна керувати.
 * Курсор зупинився чи пішов — група розсіюється.
 */
const N = 30;
const AMBIENT = 14; // вільно літають завжди; решта — «супутники» курсора

type P = {
  x: number; y: number; vx: number; vy: number;
  r: number; a: number; seed: number; ph: number;
  rr: number; om: number;
};

export function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest<HTMLElement>("[data-hero]");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    resize();

    // заздалегідь намальований м'який золотий відблиск
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sc = sprite.getContext("2d")!;
    const css = getComputedStyle(document.documentElement);
    const light = css.getPropertyValue("--color-light").trim();
    const glow = css.getPropertyValue("--color-line-glow").trim();
    const gold = css.getPropertyValue("--color-line").trim();
    const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;
    const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, light);
    g.addColorStop(0.18, mix(glow, 95));
    g.addColorStop(0.5, mix(gold, 28));
    g.addColorStop(1, mix(gold, 0));
    sc.fillStyle = g;
    sc.fillRect(0, 0, 64, 64);

    const rnd = (i: number, k: number) => {
      const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const ps: P[] = Array.from({ length: N }, (_, i) => ({
      x: rnd(i, 1) * 1400, y: 80 + rnd(i, 2) * 700,
      vx: (rnd(i, 3) - 0.5) * 14, vy: (rnd(i, 4) - 0.5) * 10,
      r: 1.1 + rnd(i, 5) * 1.7, a: i < AMBIENT ? 1 : 0,
      seed: rnd(i, 6), ph: rnd(i, 7) * Math.PI * 2,
      rr: 20 + rnd(i, 8) * 62, om: (rnd(i, 9) > 0.5 ? 1 : -1) * (0.5 + rnd(i, 10) * 1.1),
    }));

    let inside = false, lastMove = 0, mx = 0, my = 0, act = 0, engaged = false;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      inside = true;
      lastMove = performance.now();
    };
    const onLeave = () => { inside = false; };
    if (!reduce) {
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
      hero.addEventListener("pointerup", onLeave);
      hero.addEventListener("pointercancel", onLeave);
    }

    let raf = 0, last = performance.now(), alive = true;
    const t0 = last;
    const frame = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - t0) / 1000;
      engaged = inside && now - lastMove < 1500;
      act += ((engaged ? 1 : 0) - act) * Math.min(1, dt * 2);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      if (act > 0.02) {
        const gr = ctx.createRadialGradient(mx, my, 0, mx, my, 130);
        gr.addColorStop(0, mix(glow, 6 * act));
        gr.addColorStop(1, mix(glow, 0));
        ctx.fillStyle = gr;
        ctx.fillRect(mx - 130, my - 130, 260, 260);
      }

      for (let i = 0; i < N; i++) {
        const p = ps[i];
        if (engaged && i >= AMBIENT) {
          // притягування до орбіти навколо курсора
          const ang = p.ph + t * p.om;
          const rad = p.rr * (0.65 + 0.35 * Math.sin(t * 0.8 + p.seed * 6));
          const tx = mx + Math.cos(ang) * rad;
          const ty = my + Math.sin(ang) * rad * 0.8;
          p.vx += (tx - p.x) * 4.5 * dt;
          p.vy += (ty - p.y) * 4.5 * dt;
          const damp = Math.exp(-2.4 * dt);
          p.vx *= damp; p.vy *= damp;
        } else {
          // вільний дрейф
          p.vx += Math.sin(t * 0.4 + p.seed * 9) * 9 * dt;
          p.vy += (Math.cos(t * 0.33 + p.seed * 7) * 9 - 2.5) * dt;
          const damp = Math.exp(-0.7 * dt);
          p.vx *= damp; p.vy *= damp;
        }
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 1100) { p.vx *= 1100 / sp; p.vy *= 1100 / sp; }
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (!(engaged && i >= AMBIENT)) {
          if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
        }
        const target = engaged || i < AMBIENT ? 1 : 0;
        p.a += (target - p.a) * Math.min(1, dt * 2.2);
        if (p.a < 0.01) continue;
        const tw = 0.62 + 0.38 * Math.sin(t * (1.1 + p.seed * 1.6) + p.ph);
        const size = p.r * (2.6 + 1.0 * tw);
        ctx.globalAlpha = Math.min(0.9, p.a * (0.5 + 0.4 * tw));
        ctx.drawImage(sprite, p.x - size, p.y - size, size * 2, size * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("pointerup", onLeave);
      hero.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 size-full" aria-hidden />;
}
