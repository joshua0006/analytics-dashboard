import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { ChartTooltip } from '../ui/ChartTooltip';
import { STORES } from '../../data/mockStore';
import { formatNumber, formatPct } from '../../utils/formatters';
import { format, parseISO } from 'date-fns';

interface DataPoint {
  date: string;
  [key: string]: number | string;
}

interface Props {
  data: DataPoint[];
  activeStores: string[];
}

export function UnitsSoldChart({ data, activeStores }: Props) {
  const stores = STORES.filter(s => activeStores.includes(s.id));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 mb-4">
        <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest">Units Sold</h3>
        <div className="flex gap-3">
          {stores.map(s => (
            <span key={s.id} className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barGap={2}>
          <CartesianGrid style={{ stroke: 'var(--chart-grid)' }} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={d => format(parseISO(d as string), 'MMM d')}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={v => formatNumber(v as number)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false} width={40}
          />
          <Tooltip
            content={<ChartTooltip formatter={v => formatNumber(v)} />}
            cursor={{ fill: 'rgba(100,100,120,0.07)' }}
          />
          {stores.map(s => (
            <Bar
              key={s.id}
              dataKey={`units_${s.id}`}
              name={s.name}
              fill={s.color}
              radius={[2, 2, 0, 0]}
              opacity={0.85}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConversionRateChart({ data, activeStores }: Props) {
  const stores = STORES.filter(s => activeStores.includes(s.id));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest">Conversion Rate %</h3>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid style={{ stroke: 'var(--chart-grid)' }} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={d => format(parseISO(d as string), 'MMM d')}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={v => formatPct(v as number)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false} width={48}
          />
          <Tooltip
            content={<ChartTooltip formatter={v => formatPct(v)} />}
            cursor={{ stroke: 'var(--chart-grid)' }}
          />
          {stores.map(s => (
            <Line
              key={s.id}
              type="monotone"
              dataKey={`conv_${s.id}`}
              name={s.name}
              stroke={s.color}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
