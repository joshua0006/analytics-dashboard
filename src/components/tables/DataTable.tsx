import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { formatDelta } from '../../utils/formatters';

export interface Column<T> {
  key: keyof T & string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'right';
}

interface Props<T extends object> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T & string;
}

type SortDir = 'asc' | 'desc';

export function DataTable<T extends object>({ columns, data, rowKey }: Props<T>) {
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key ?? '');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    const av = (a as Record<string, unknown>)[sortKey];
    const bv = (b as Record<string, unknown>)[sortKey];
    const dir = sortDir === 'asc' ? 1 : -1;
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                className={clsx(
                  'px-4 py-3 font-mono text-[10px] text-muted uppercase tracking-widest cursor-pointer select-none hover:text-primary transition-colors',
                  col.align === 'right' ? 'text-right' : 'text-left'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key
                    ? sortDir === 'desc'
                      ? <ChevronDown size={10} className="text-primary opacity-60" />
                      : <ChevronUp size={10} className="text-primary opacity-60" />
                    : <ChevronDown size={10} className="opacity-20" />
                  }
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={String((row as Record<string, unknown>)[rowKey])}
              className={clsx(
                'border-b border-border/50 hover:bg-surface/50 transition-colors',
                i === sorted.length - 1 && 'border-b-0'
              )}
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  className={clsx(
                    'px-4 py-3 font-mono text-primary',
                    col.align === 'right' ? 'text-right' : 'text-left'
                  )}
                >
                  {col.render
                    ? col.render((row as Record<string, unknown>)[col.key], row)
                    : String((row as Record<string, unknown>)[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DeltaCell({ value }: { value: number }) {
  const isPos = value >= 0;
  return (
    <span className={clsx('font-mono text-xs', isPos ? 'text-positive' : 'text-negative')}>
      {isPos ? '▲' : '▼'} {formatDelta(Math.abs(value))}
    </span>
  );
}
