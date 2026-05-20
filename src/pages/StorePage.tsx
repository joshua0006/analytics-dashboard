import { useOutletContext } from 'react-router-dom';
import { Package, CreditCard, Target } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { StatCard } from '../components/cards/StatCard';
import { UnitsSoldChart, ConversionRateChart } from '../components/charts/StoreMetricsChart';
import { DataTable, DeltaCell, Column } from '../components/tables/DataTable';
import { useStoreMetrics } from '../hooks/useMetrics';
import { STORES } from '../data/mockStore';
import { formatNumber, formatCurrency, formatPct } from '../utils/formatters';
import { DateRange } from '../types';

interface OutletCtx {
  dateRange: DateRange;
  setDateRange: (v: DateRange) => void;
  activeStores: string[];
}

interface BreakdownRow {
  storeId: string;
  name: string;
  units: number;
  revenue: number;
  convRate: number;
  deltaUnits: number;
  deltaRevenue: number;
  deltaConv: number;
}

const columns: Column<BreakdownRow>[] = [
  {
    key: 'name',
    label: 'Store',
    render: (v, row) => {
      const st = STORES.find(s => s.id === row.storeId);
      return (
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: st?.color }} />
          {String(v)}
        </span>
      );
    },
  },
  { key: 'units',       label: 'Units Sold',  align: 'right', render: v => formatNumber(v as number) },
  { key: 'revenue',     label: 'Revenue',     align: 'right', render: v => formatCurrency(v as number) },
  { key: 'convRate',    label: 'Conv %',      align: 'right', render: v => formatPct(v as number) },
  { key: 'deltaUnits',  label: 'Δ Units',     align: 'right', render: v => <DeltaCell value={v as number} /> },
  { key: 'deltaRevenue',label: 'Δ Revenue',   align: 'right', render: v => <DeltaCell value={v as number} /> },
];

export function StorePage() {
  const { dateRange, setDateRange, activeStores } = useOutletContext<OutletCtx>();
  const metrics = useStoreMetrics(dateRange, activeStores);

  const tableData: BreakdownRow[] = metrics.storeBreakdown.map(b => ({
    ...b,
    name: STORES.find(s => s.id === b.storeId)?.name ?? b.storeId,
  }));

  return (
    <div className="flex flex-col">
      <Header
        title="Store Analytics"
        subtitle="Units sold, revenue and conversion across stores"
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        accentColor="#22d3c5"
      />

      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            label="Units Sold"
            value={formatNumber(metrics.totalUnits)}
            delta={metrics.deltaUnits}
            trend={metrics.last7Units}
            accentColor="#22d3c5"
            icon={<Package size={14} />}
          />
          <StatCard
            label="Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            delta={metrics.deltaRevenue}
            trend={metrics.last7Revenue}
            accentColor="#22d3c5"
            icon={<CreditCard size={14} />}
          />
          <StatCard
            label="Avg Conv Rate"
            value={formatPct(metrics.avgConv)}
            delta={metrics.deltaConv}
            trend={metrics.last7Conv}
            accentColor="#22d3c5"
            icon={<Target size={14} />}
          />
        </div>

        <UnitsSoldChart data={metrics.chartData} activeStores={activeStores} />
        <ConversionRateChart data={metrics.chartData} activeStores={activeStores} />

        <div>
          <h3 className="font-mono text-xs font-semibold text-muted uppercase tracking-widest mb-3">Store Breakdown</h3>
          <DataTable columns={columns} data={tableData} rowKey="storeId" />
        </div>
      </div>
    </div>
  );
}
