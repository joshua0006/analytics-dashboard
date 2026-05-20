import { useOutletContext } from 'react-router-dom';
import { Eye, DollarSign } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { StatCard } from '../components/cards/StatCard';
import { ViewsChart, RevenueLineChart } from '../components/charts/ViewsRevenueChart';
import { DataTable, DeltaCell, Column } from '../components/tables/DataTable';
import { useYouTubeMetrics } from '../hooks/useMetrics';
import { CHANNELS } from '../data/mockYouTube';
import { formatNumber, formatCurrency } from '../utils/formatters';
import { DateRange } from '../types';

interface OutletCtx {
  dateRange: DateRange;
  setDateRange: (v: DateRange) => void;
  activeChannels: string[];
}

interface BreakdownRow {
  channelId: string;
  name: string;
  views: number;
  revenue: number;
  deltaViews: number;
  deltaRevenue: number;
}

const columns: Column<BreakdownRow>[] = [
  {
    key: 'name',
    label: 'Channel',
    render: (v, row) => {
      const ch = CHANNELS.find(c => c.id === row.channelId);
      return (
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: ch?.color }} />
          {String(v)}
        </span>
      );
    },
  },
  { key: 'views',        label: 'Views',          align: 'right', render: v => formatNumber(v as number) },
  { key: 'revenue',      label: 'Revenue',        align: 'right', render: v => formatCurrency(v as number) },
  { key: 'deltaViews',   label: 'Δ Views',        align: 'right', render: v => <DeltaCell value={v as number} /> },
  { key: 'deltaRevenue', label: 'Δ Revenue',      align: 'right', render: v => <DeltaCell value={v as number} /> },
];

export function YouTubePage() {
  const { dateRange, setDateRange, activeChannels } = useOutletContext<OutletCtx>();
  const metrics = useYouTubeMetrics(dateRange, activeChannels);

  const tableData: BreakdownRow[] = metrics.channelBreakdown.map(b => ({
    ...b,
    name: CHANNELS.find(c => c.id === b.channelId)?.name ?? b.channelId,
  }));

  return (
    <div className="flex flex-col">
      <Header
        title="YouTube Analytics"
        subtitle="Views and revenue across all channels"
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        accentColor="#f5a623"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Total Views"
            value={formatNumber(metrics.totalViews)}
            delta={metrics.deltaViews}
            trend={metrics.last7Views}
            accentColor="#f5a623"
            icon={<Eye size={14} />}
          />
          <StatCard
            label="Total Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            delta={metrics.deltaRevenue}
            trend={metrics.last7Revenue}
            accentColor="#f5a623"
            icon={<DollarSign size={14} />}
          />
        </div>

        <ViewsChart data={metrics.chartData} activeChannels={activeChannels} />
        <RevenueLineChart data={metrics.chartData} activeChannels={activeChannels} />

        <div>
          <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest mb-3">Channel Breakdown</h3>
          <DataTable columns={columns} data={tableData} rowKey="channelId" />
        </div>
      </div>
    </div>
  );
}
