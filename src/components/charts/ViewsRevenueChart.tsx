import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { ChartTooltip } from '../ui/ChartTooltip';
import { CHANNELS } from '../../data/mockYouTube';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import { format, parseISO } from 'date-fns';

interface DataPoint {
  date: string;
  [key: string]: number | string;
}

interface Props {
  data: DataPoint[];
  activeChannels: string[];
}

export function ViewsChart({ data, activeChannels }: Props) {
  const channels = CHANNELS.filter(c => activeChannels.includes(c.id));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest">Views Over Time</h3>
        <div className="flex gap-3">
          {channels.map(c => (
            <span key={c.id} className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
              {c.name}
            </span>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            {channels.map(c => (
              <linearGradient key={c.id} id={`grad-${c.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={c.color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={c.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
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
            axisLine={false} tickLine={false} width={48}
          />
          <Tooltip
            content={<ChartTooltip formatter={v => formatNumber(v)} />}
            cursor={{ stroke: 'var(--chart-grid)' }}
          />
          {channels.map(c => (
            <Area
              key={c.id}
              type="monotone"
              dataKey={`views_${c.id}`}
              name={c.name}
              stroke={c.color}
              fill={`url(#grad-${c.id})`}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueLineChart({ data, activeChannels }: Props) {
  const channels = CHANNELS.filter(c => activeChannels.includes(c.id));

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest">Revenue Over Time</h3>
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
            tickFormatter={v => formatCurrency(v as number)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false} width={56}
          />
          <Tooltip
            content={<ChartTooltip formatter={v => formatCurrency(v)} />}
            cursor={{ stroke: 'var(--chart-grid)' }}
          />
          {channels.map(c => (
            <Line
              key={c.id}
              type="monotone"
              dataKey={`revenue_${c.id}`}
              name={c.name}
              stroke={c.color}
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
