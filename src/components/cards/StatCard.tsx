import { MiniSparkline } from '../charts/MiniSparkline';
import { formatDelta } from '../../utils/formatters';
import clsx from 'clsx';

interface Props {
  label: string;
  value: string;
  delta: number;
  trend: number[];
  accentColor: string;
  icon?: string;
}

export function StatCard({ label, value, delta, trend, accentColor, icon }: Props) {
  const isPositive = delta >= 0;

  return (
    <div
      className="relative overflow-hidden rounded-lg p-4 flex flex-col gap-3 border border-border bg-card"
      style={{ boxShadow: `0 0 0 1px ${accentColor}18` }}
    >
      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: accentColor }}
      />

      <div className="flex items-center justify-between">
        <span className="font-sans text-xs font-medium text-muted uppercase tracking-widest">
          {icon && <span className="mr-1.5">{icon}</span>}
          {label}
        </span>
        <MiniSparkline data={trend} color={accentColor} />
      </div>

      <div className="font-mono text-2xl font-semibold text-primary tracking-tight">
        {value}
      </div>

      <div className={clsx(
        'font-mono text-xs font-medium',
        isPositive ? 'text-positive' : 'text-negative'
      )}>
        {isPositive ? '▲' : '▼'} {formatDelta(Math.abs(delta))} vs prior period
      </div>
    </div>
  );
}
