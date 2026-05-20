import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { parseISO, isAfter, subDays } from 'date-fns';
import { Eye, Tv2, Package, Gem } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { StatCard } from '../components/cards/StatCard';
import { RevenueStackedBar, RevenueDonut, DualAxisChart } from '../components/charts/RevenueCompareChart';
import { useYouTubeMetrics, useStoreMetrics } from '../hooks/useMetrics';
import { mockYouTubeData } from '../data/mockYouTube';
import { mockStoreData } from '../data/mockStore';
import { CHANNELS } from '../data/mockYouTube';
import { STORES } from '../data/mockStore';
import { formatNumber, formatCurrency } from '../utils/formatters';
import { DateRange } from '../types';

interface OutletCtx {
  dateRange: DateRange;
  setDateRange: (v: DateRange) => void;
  activeChannels: string[];
  activeStores: string[];
  onMenuClick: () => void;
}

export function CombinedPage() {
  const { dateRange, setDateRange, activeChannels, activeStores, onMenuClick } = useOutletContext<OutletCtx>();
  const ytMetrics = useYouTubeMetrics(dateRange, activeChannels);
  const storeMetrics = useStoreMetrics(dateRange, activeStores);

  // Build stacked bar data aligned by date
  const stackedData = useMemo(() => {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const cutoff = subDays(new Date(), days);

    const ytMap = new Map<string, number>();
    for (const d of mockYouTubeData) {
      if (activeChannels.includes(d.channelId) && isAfter(parseISO(d.date), cutoff)) {
        ytMap.set(d.date, (ytMap.get(d.date) ?? 0) + d.revenue);
      }
    }
    const storeMap = new Map<string, number>();
    for (const d of mockStoreData) {
      if (activeStores.includes(d.storeId) && isAfter(parseISO(d.date), cutoff)) {
        storeMap.set(d.date, (storeMap.get(d.date) ?? 0) + d.revenue);
      }
    }
    const allDates = Array.from(new Set([...ytMap.keys(), ...storeMap.keys()])).sort();
    return allDates.map(date => ({
      date,
      ytRevenue: ytMap.get(date) ?? 0,
      storeRevenue: storeMap.get(date) ?? 0,
    }));
  }, [dateRange, activeChannels, activeStores]);

  // Dual-axis data
  const dualData = useMemo(() => {
    const dateMap = new Map<string, { views: number; convSum: number; convCount: number }>();
    for (const d of ytMetrics.chartData) {
      dateMap.set(d.date as string, { views: d.views as number, convSum: 0, convCount: 0 });
    }
    for (const d of storeMetrics.chartData) {
      const entry = dateMap.get(d.date as string);
      if (entry) {
        entry.convSum += d.convRate as number;
        entry.convCount += 1;
      }
    }
    return Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({
        date,
        views: v.views,
        convRate: v.convCount > 0 ? v.convSum / v.convCount : 0,
      }));
  }, [ytMetrics.chartData, storeMetrics.chartData]);

  const ytDonutData = CHANNELS
    .filter(c => activeChannels.includes(c.id))
    .map(c => {
      const breakdown = ytMetrics.channelBreakdown.find(b => b.channelId === c.id);
      return { name: c.name, value: breakdown?.revenue ?? 0, color: c.color };
    });

  const storeDonutData = STORES
    .filter(s => activeStores.includes(s.id))
    .map(s => {
      const breakdown = storeMetrics.storeBreakdown.find(b => b.storeId === s.id);
      return { name: s.name, value: breakdown?.revenue ?? 0, color: s.color };
    });

  const totalRevenue = ytMetrics.totalRevenue + storeMetrics.totalRevenue;
  void 0; // combined delta shown via individual metrics

  return (
    <div className="flex flex-col">
      <Header
        title="Combined Overview"
        subtitle="YouTube + Web Store — unified metrics"
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        accentColor="#a78bfa"
        onMenuClick={onMenuClick}
      />

      <div className="p-3 md:p-4 lg:p-6 flex flex-col gap-4 md:gap-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="YT Views"
            value={formatNumber(ytMetrics.totalViews)}
            delta={ytMetrics.deltaViews}
            trend={ytMetrics.last7Views}
            accentColor="#f5a623"
            icon={<Eye size={14} />}
          />
          <StatCard
            label="YT Revenue"
            value={formatCurrency(ytMetrics.totalRevenue)}
            delta={ytMetrics.deltaRevenue}
            trend={ytMetrics.last7Revenue}
            accentColor="#f5a623"
            icon={<Tv2 size={14} />}
          />
          <StatCard
            label="Store Units"
            value={formatNumber(storeMetrics.totalUnits)}
            delta={storeMetrics.deltaUnits}
            trend={storeMetrics.last7Units}
            accentColor="#22d3c5"
            icon={<Package size={14} />}
          />
          <StatCard
            label="Total Revenue"
            value={formatCurrency(totalRevenue)}
            delta={(ytMetrics.deltaRevenue + storeMetrics.deltaRevenue) / 2}
            trend={stackedData.slice(-7).map(d => d.ytRevenue + d.storeRevenue)}
            accentColor="#a78bfa"
            icon={<Gem size={14} />}
          />
        </div>

        <RevenueStackedBar data={stackedData} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RevenueDonut data={ytDonutData} title="YT Revenue by Channel" />
          <RevenueDonut data={storeDonutData} title="Store Revenue by Store" />
        </div>

        <DualAxisChart data={dualData} />
      </div>
    </div>
  );
}
