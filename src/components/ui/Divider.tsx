/** Декоративна золота лінія-розділювач (токен line). */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none h-px w-full bg-linear-to-r from-transparent via-line to-transparent",
        "shadow-line animate-line-glow motion-reduce:animate-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
