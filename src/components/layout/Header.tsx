import { Menu } from 'lucide-react';
import { DateRangePicker } from '../ui/DateRangePicker';
import { ThemeToggle } from '../ui/ThemeToggle';
import { DateRange } from '../../types';

interface Props {
  title: string;
  subtitle?: string;
  dateRange: DateRange;
  onDateRangeChange: (v: DateRange) => void;
  accentColor?: string;
  onMenuClick?: () => void;
}

export function Header({ title, subtitle, dateRange, onDateRangeChange, accentColor, onMenuClick }: Props) {
  return (
    <div
      className="flex items-center justify-between px-3 py-3 md:px-6 md:py-4 border-b border-border sticky top-0 z-10 backdrop-blur-sm"
      style={{ background: 'var(--header-bg)' }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden flex-shrink-0 text-muted hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="font-mono text-sm md:text-base font-semibold tracking-tight truncate" style={{ color: 'var(--text-primary)' }}>{title}</h1>
          {subtitle && (
            <p className="font-sans text-xs mt-0.5 hidden sm:block" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <DateRangePicker value={dateRange} onChange={onDateRangeChange} accentColor={accentColor} />
        <ThemeToggle />
      </div>
    </div>
  );
}
