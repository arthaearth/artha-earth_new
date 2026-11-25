/**
 * Шрі-янтра: класична геометрія.
 *
 * Дев'ять переплетених трикутників (4 вгору — Шива, 5 вниз — Шакті) задані
 * координатами «Type III» (жорстка побудова, див. Soundarya Lahari, вірш 11),
 * джерело координат: @vibzart/sri-yantra (MIT) / TeXample.net.
 * Координати в просторі 300×300, центр (150,150), радіус описаного кола 100.
 *
 * Далі назовні: бінду → 9 трикутників → коло → 8 пелюсток → коло →
 * 16 пелюсток → коло → бгупура (три квадрати з чотирма брамами).
 */

// [лівий x, y основи, y вершини, правий x]
const TRIANGLES: [number, number, number, number][] = [
  [53.65669559977147, 123.20508075688774, 250, 246.34330440022853], // D1 ▽
  [52.984011026495736, 174.24660560764943, 50, 247.01598897350425], // U1 △
  [98.71823312733801, 220.03828947357886, 123.20508075688774, 201.281766872662], // U3 △
  [78.26467997914015, 197.92315674002487, 78.10499177949904, 221.73532002085986], // U2 △
  [90.4856922951427, 78.10499177949904, 160.66014976539617, 209.51430770485734], // D3 ▽
  [80.98384838952128, 103.12199145016105, 220.03828947357886, 219.0161516104787], // D2 ▽
  [114.9488500600036, 160.66014976539617, 103.12199145016105, 185.0511499399964], // U4 △
  [116.35142605010424, 134.30757626706648, 197.92315674002487, 183.64857394989576], // D4 ▽
  [124.61190803072795, 144.79777263138968, 174.24660560764943, 175.38809196927207], // D5 ▽
];

// Робоча система: координати зображення 1254×1254, центр янтри (CX, CY).
const CX = 626;
const CY = 608;
const R1 = 190; // коло, що описує трикутники = основа 8 пелюсток
const R2 = 243; // кінчики 8 пелюсток = основа 16 пелюсток
const R3 = 312; // кінчики 16 пелюсток
const S = R1 / 100;

const f = (n: number) => n.toFixed(2);
const px = (x: number) => CX + (x - 150) * S;
const py = (y: number) => CY + (y - 150) * S;

function trianglePath([l, yb, yt, r]: [number, number, number, number]) {
  const m = (l + r) / 2;
  return `M${f(px(l))} ${f(py(yb))}L${f(px(r))} ${f(py(yb))}L${f(px(m))} ${f(py(yt))}Z`;
}

/** Одна пелюстка: основа на колі r0 (півширина w радіан), кінчик на колі r1, вісь — кут a. */
function petalPath(a: number, w: number, r0: number, r1: number) {
  const pt = (rad: number, lat: number) => {
    // локальні координати (rad — вздовж осі, lat — убік) → глобальні
    const x = rad * Math.cos(a) - lat * Math.sin(a);
    const y = rad * Math.sin(a) + lat * Math.cos(a);
    return `${f(CX + x)} ${f(CY + y)}`;
  };
  const bx = r0 * Math.cos(w);
  const by = r0 * Math.sin(w);
  const L = r1 - bx;
  // два дзеркальні вигини: опуклий біля основи, увігнутий біля кінчика
  const c1 = (sign: 1 | -1) => pt(bx + L * 0.30, sign * by * 1.12);
  const c2 = (sign: 1 | -1) => pt(r1 - L * 0.46, sign * by * 0.10);
  return (
    `M${pt(bx, by)}C${c1(1)} ${c2(1)} ${pt(r1, 0)}` +
    `C${c2(-1)} ${c1(-1)} ${pt(bx, -by)}`
  );
}

function lotus(count: number, r0: number, r1: number, phase = 0) {
  const step = (2 * Math.PI) / count;
  const w = (step / 2) * 0.9;
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = phase + i * step - Math.PI / 2;
    d += petalPath(a, w, r0, r1);
  }
  return d;
}

/**
 * Бгупура — одна рамка зі ступінчастими брамами «Т» на кожній стороні (як у макеті).
 * Рамка охоплює всі три кола із запасом.
 */
const H = 340; // охоплює третє коло (R3 = 312) із запасом
const GA = 78; // півширина проходу
const GB = 150; // півширина верхньої планки
const STEP1 = 30;
const STEP2 = 66;
const BHUPURA_D =
  `M${-H} ${-H}H${-GA}V${-(H + STEP1)}H${-GB}V${-(H + STEP2)}` +
  `H${GB}V${-(H + STEP1)}H${GA}V${-H}H${H}`;
const BHUPURA = [0, 90, 180, 270]
  .map(
    (deg) =>
      `<path transform="translate(${CX} ${CY}) rotate(${deg})" d="${BHUPURA_D}"/>`,
  )
  .join("");

const PATHS = {
  triangles: TRIANGLES.map(trianglePath).join(""),
  petals8: lotus(8, R1, R2),
  petals16: lotus(16, R2, R3),
};

export function SriYantra() {
  return (
    <svg
      className="absolute inset-0 size-full drop-shadow-yantra"
      viewBox="0 0 1254 1254"
      role="img"
      aria-label="Шрі-янтра"
      fill="none"
      stroke="url(#yantra-gold)"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <defs>
        <linearGradient id="yantra-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-line-glow)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--color-line)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-line-deep)" }} />
        </linearGradient>
      </defs>
      <defs>
        <g id="yantra-lines">
          <g strokeWidth="4.6">
            <circle cx={CX} cy={CY} r={R1} />
            <circle cx={CX} cy={CY} r={R2} />
            <circle cx={CX} cy={CY} r={R3} />
            <path d={PATHS.petals8} />
            <path d={PATHS.petals16} />
            <g dangerouslySetInnerHTML={{ __html: BHUPURA }} />
          </g>
          <path d={PATHS.triangles} strokeWidth="3" />
        </g>
        {/* м'яка смуга світла, що неспішно ковзає з верхнього правого кута вниз-ліворуч */}
        <linearGradient
          id="yantra-light"
          gradientUnits="userSpaceOnUse"
          x1="900"
          y1="0"
          x2="560"
          y2="340"
        >
          <stop offset="0" style={{ stopColor: "var(--color-light)" }} stopOpacity="0" />
          <stop offset="0.5" style={{ stopColor: "var(--color-light)" }} stopOpacity="0.95" />
          <stop offset="1" style={{ stopColor: "var(--color-light)" }} stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="260 -260; -760 760; -760 760"
            keyTimes="0; 0.62; 1"
            calcMode="spline"
            keySplines="0.45 0.05 0.55 0.95; 0 0 1 1"
            dur="54s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <use href="#yantra-lines" />
      <use
        href="#yantra-lines"
        stroke="url(#yantra-light)"
        className="mix-blend-screen"
      />
      <circle
        cx={CX}
        cy={CY}
        r="4.5"
        fill="url(#yantra-gold)"
        stroke="none"
      />
    </svg>
  );
}
