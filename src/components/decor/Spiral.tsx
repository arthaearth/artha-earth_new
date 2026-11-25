// Спіраль, що замінює «&» у логотипі: розкручується від центру
// й закінчується у верхньому правому куті.
const TURNS = 2.1;
const STEPS = 140;
const END_ANGLE = -Math.PI / 4;
const R_START = 0.4;
const R_END = 10.5;

function buildPath() {
  const total = TURNS * 2 * Math.PI;
  const pts: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const k = i / STEPS;
    const phi = END_ANGLE - (1 - k) * total;
    const r = R_START + (R_END - R_START) * k;
    pts.push(`${i === 0 ? "M" : "L"}${(12 + r * Math.cos(phi)).toFixed(2)} ${(12 + r * Math.sin(phi)).toFixed(2)}`);
  }
  return pts.join(" ");
}

const PATH = buildPath();

export function Spiral({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d={PATH} />
    </svg>
  );
}
