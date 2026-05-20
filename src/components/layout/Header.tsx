import { DateRangePicker } from '../ui/DateRangePicker';
import { ThemeToggle } from '../ui/ThemeToggle';
import { DateRange } from '../../types';

interface Props {
  title: string;
  subtitle?: string;
  dateRange: DateRange;
  onDateRangeChange: (v: DateRange) => void;
  accentColor?: string;
}

export function Header({ title, subtitle, dateRange, onDateRangeChange, accentColor }: Props) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 z-10 backdrop-blur-sm"
      style={{ background: 'var(--header-bg)' }}
    >
      <div>
        <h1 className="font-mono text-base font-semibold text-primary tracking-tight">{title}</h1>
        {subtitle && (
          <p className="font-sans text-xs text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DateRangePicker value={dateRange} onChange={onDateRangeChange} accentColor={accentColor} />
        <ThemeToggle />
      </div>
    </div>
  );
}
