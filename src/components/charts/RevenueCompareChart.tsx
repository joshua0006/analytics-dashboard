import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import { ChartTooltip } from '../ui/ChartTooltip';
import { formatCurrency, formatNumber, formatPct } from '../../utils/formatters';
import { format, parseISO } from 'date-fns';

interface StackedBarProps {
  data: { date: string; ytRevenue: number; storeRevenue: number }[];
}

export function RevenueStackedBar({ data }: StackedBarProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 mb-4">
        <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest">Combined Revenue</h3>
        <div className="flex gap-3">
          {[
            { label: 'YouTube', color: '#f5a623' },
            { label: 'Store',   color: '#22d3c5' },
          ].map(l => (
            <span key={l.label} className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
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
            cursor={{ fill: 'rgba(100,100,120,0.07)' }}
          />
          <Bar dataKey="ytRevenue"    name="YouTube" fill="#f5a623" radius={[0, 0, 0, 0]} stackId="rev" opacity={0.9} />
          <Bar dataKey="storeRevenue" name="Store"   fill="#22d3c5" radius={[2, 2, 0, 0]} stackId="rev" opacity={0.9} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface DonutProps {
  data: { name: string; value: number; color: string }[];
  title: string;
}

export function RevenueDonut({ data, title }: DonutProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col">
      <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest mb-4">{title}</h3>
      <div className="flex items-center gap-4 flex-1">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={56}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 flex-1">
          {data.map(d => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="font-sans text-xs text-muted truncate">{d.name}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-primary">{formatCurrency(d.value)}</span>
                <span className="font-mono text-[10px] text-muted ml-1">
                  {total > 0 ? formatPct((d.value / total) * 100) : '0%'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface DualAxisProps {
  data: { date: string; views: number; convRate: number }[];
}

export function DualAxisChart({ data }: DualAxisProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 mb-4">
        <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest">YT Views vs Store Conv %</h3>
        <div className="flex gap-3">
          {[
            { label: 'Views',   color: '#f5a623' },
            { label: 'Conv %',  color: '#22d3c5' },
          ].map(l => (
            <span key={l.label} className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 48, bottom: 0, left: 0 }}>
          <CartesianGrid style={{ stroke: 'var(--chart-grid)' }} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={d => format(parseISO(d as string), 'MMM d')}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            yAxisId="left"
            tickFormatter={v => formatNumber(v as number)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false} width={48}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={v => formatPct(v as number)}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false} tickLine={false} width={44}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: 'var(--chart-grid)' }}
          />
          <Line yAxisId="left"  type="monotone" dataKey="views"    name="Views"   stroke="#f5a623" strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
          <Line yAxisId="right" type="monotone" dataKey="convRate" name="Conv %"  stroke="#22d3c5" strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
