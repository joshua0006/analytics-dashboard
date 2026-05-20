import { DateRange } from '../../types';
import clsx from 'clsx';

const OPTIONS: { label: string; value: DateRange }[] = [
  { label: '7D',  value: '7d'  },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
];

interface Props {
  value: DateRange;
  onChange: (v: DateRange) => void;
  accentColor?: string;
}

export function DateRangePicker({ value, onChange, accentColor = '#f5a623' }: Props) {
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5">
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={clsx(
            'px-3 py-1 rounded font-mono text-xs font-medium transition-all duration-150',
            value === opt.value
              ? 'text-base'
              : 'text-muted hover:text-primary'
          )}
          style={value === opt.value ? { background: accentColor, color: '#0f0f11' } : {}}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
