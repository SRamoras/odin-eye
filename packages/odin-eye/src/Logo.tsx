export function Logo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M1 13 C6 4 20 4 25 13 C20 22 6 22 1 13 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="13" cy="13" r="4.5" fill="currentColor" />
    </svg>
  );
}
