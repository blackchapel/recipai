import { useId } from "react";

/** The Recipai mark: three bowls in the flame gradient (the app's launcher icon). */
export function Logo({ size = 28 }: { size?: number }) {
  const id = useId();
  const a = `${id}a`;
  return (
    <svg width={size} height={size} viewBox="26 30 56 48" role="img" aria-label="Recipai">
      <defs>
        <linearGradient id={a} x1="30" y1="42" x2="63" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB547" />
          <stop offset=".55" stopColor="#FF6B3D" />
          <stop offset="1" stopColor="#FF5C8D" />
        </linearGradient>
      </defs>
      <circle cx="46.5" cy="58.5" r="16.5" fill={`url(#${a})`} />
      <circle cx="68.25" cy="43.5" r="9.75" fill={`url(#${a})`} opacity=".8" />
      <circle cx="70.5" cy="67.5" r="6" fill={`url(#${a})`} opacity=".55" />
      <circle cx="46.5" cy="58.5" r="8.25" fill="none" stroke="#1C0F06" strokeOpacity=".35" strokeWidth="2.4" />
    </svg>
  );
}
