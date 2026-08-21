export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 4C20 4 27 10 27 18C27 23 24 26 20 26C16 26 13 23 13 18C13 10 20 4 20 4Z"
        fill="currentColor"
      />
      <path
        d="M20 26V36M20 36C20 31 15 29 10 30M20 36C20 31 25 29 30 30"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-green-900" : "text-paper";
  const sub = tone === "dark" ? "text-ink-soft" : "text-green-100";
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className={`font-display text-[1.05rem] tracking-[0.02em] ${color}`}>
        Shantiban <span className="italic text-gold-600">City</span>
      </span>
      <span className={`text-[0.6rem] uppercase tracking-[0.28em] ${sub} mt-0.5`}>
        Mrityika Realtrers
      </span>
    </span>
  );
}
