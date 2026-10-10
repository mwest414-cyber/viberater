// Sonar rings: a dot with rings that ripple outward, the same motion as the logo mark.
// Rule (Mark, 2026-10-10): any use of these rings always has the outward ripple.
// With reduced motion on, the rings hold still at three fixed sizes instead.
export default function SonarRings({ size = 132, color = "#D7FF3A" }: { size?: number; color?: string }) {
  return (
    <svg
      className="sonar"
      width={size}
      height={size}
      viewBox="0 0 132 132"
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible" }}
    >
      {[
        { delay: "0s", still: 0.375, alpha: 0.6 },
        { delay: "-1.66s", still: 0.69, alpha: 0.25 },
        { delay: "-3.33s", still: 1, alpha: 0.12 },
      ].map((r) => (
        <circle
          key={r.delay}
          className="sonar-ring"
          cx="66"
          cy="66"
          r="64"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{
            animationDelay: r.delay,
            ["--still-scale" as string]: r.still,
            ["--still-alpha" as string]: r.alpha,
          }}
        />
      ))}
      <circle cx="66" cy="66" r="6" fill={color} />
    </svg>
  );
}
