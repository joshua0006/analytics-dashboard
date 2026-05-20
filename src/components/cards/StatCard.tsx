import { MiniSparkline } from '../charts/MiniSparkline';
import { formatDelta } from '../../utils/formatters';

interface Props {
  label: string;
  value: string;
  delta: number;
  trend: number[];
  accentColor: string;
  icon?: string;
}

const ArrowUp = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
    <path d="M4 7V1M4 1L1 4M4 1L7 4" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
    <path d="M4 1V7M4 7L1 4M4 7L7 4" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function StatCard({ label, value, delta, trend, accentColor, icon }: Props) {
  const isPositive = delta >= 0;
  const badgeBg = isPositive ? 'rgba(74,222,128,0.14)' : 'rgba(248,113,113,0.14)';

  return (
    <div
      className="relative overflow-hidden rounded-xl p-4 flex flex-col gap-3 border border-border"
      style={{
        background: `radial-gradient(ellipse 140% 100% at 0% 0%, ${accentColor}10 0%, transparent 55%), var(--bg-card)`,
        boxShadow: `0 0 0 1px ${accentColor}1f, 0 1px 3px rgba(0,0,0,0.07), 0 6px 20px ${accentColor}0d`,
      }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accentColor }} />
      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: accentColor }} />
      {/* Atmospheric bloom below bar */}
      <div
        className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${accentColor}1a, transparent)` }}
      />

      {/* Zone 1: Label + Sparkline */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 min-w-0">
          {icon && <span className="text-[13px] leading-none flex-shrink-0 select-none">{icon}</span>}
          <span
            className="font-sans font-semibold uppercase truncate"
            style={{ fontSize: '10px', letterSpacing: '0.11em', color: 'var(--text-muted)' }}
          >
            {label}
          </span>
        </div>
        <div className="flex-shrink-0">
          <MiniSparkline data={trend} color={accentColor} />
        </div>
      </div>

      {/* Zone 2: Value */}
      <div
        className="font-mono font-semibold tracking-tight leading-none"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 1.875rem)', color: 'var(--text-primary)' }}
      >
        {value}
      </div>

      {/* Separator */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(to right, ${accentColor}2e, var(--border-c) 45%, transparent 80%)` }}
      />

      {/* Zone 3: Delta badge */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-[3px] px-1.5 py-[3px] rounded font-mono font-semibold leading-none"
          style={{ fontSize: '10px', background: badgeBg, color: isPositive ? 'var(--positive)' : 'var(--negative)' }}
        >
          {isPositive ? <ArrowUp /> : <ArrowDown />}
          {formatDelta(Math.abs(delta))}
        </span>
        <span className="font-sans" style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1 }}>
          vs prior period
        </span>
      </div>
    </div>
  );
}
