export default function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible", filter: "drop-shadow(0 0 16px rgba(215,255,58,0.25))" }}
    >
      <defs>
        <style>{`
          @keyframes vr-ripple {
            0%   { r: 18px; opacity: 0; }
            10%  { opacity: 0.85; }
            100% { r: 55px; opacity: 0; }
          }
          .vr-ring   { animation: vr-ripple 5s cubic-bezier(0.25, 0.6, 0.3, 1) infinite; }
          .vr-ring-b { animation-delay: 1.66s; }
          .vr-ring-c { animation-delay: 3.33s; }
        `}</style>
      </defs>

      <g style={{ filter: "blur(1.4px)" }}>
        <circle className="vr-ring"   cx="32" cy="28" r="18" fill="none" stroke="#D7FF3A" strokeWidth="1.6" />
        <circle className="vr-ring vr-ring-b" cx="32" cy="28" r="18" fill="none" stroke="#D7FF3A" strokeWidth="1.6" />
        <circle className="vr-ring vr-ring-c" cx="32" cy="28" r="18" fill="none" stroke="#D7FF3A" strokeWidth="1.6" />
      </g>

      <path
        d="M32 4 C20.4 4, 12 12.8, 12 24 C12 36, 22 46, 31 58.5 C31.5 59.2, 32.5 59.2, 33 58.5 C42 46, 52 36, 52 24 C52 12.8, 43.6 4, 32 4 Z"
        fill="#D7FF3A"
      />
      <circle cx="32" cy="23" r="6" fill="#0A0A0A" />
    </svg>
  );
}
