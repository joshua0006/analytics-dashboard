import { useMemo } from 'react';
import { subDays, parseISO, isAfter } from 'date-fns';
import { mockYouTubeData, mockStoreData } from '../data';
import { DateRange, StoreDataPoint } from '../types';

function cutoffDate(range: DateRange): Date {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  return subDays(new Date(), days);
}

function prevCutoff(range: DateRange): Date {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  return subDays(new Date(), days * 2);
}

export function useYouTubeMetrics(range: DateRange, activeChannels: string[]) {
  return useMemo(() => {
    const cutoff = cutoffDate(range);
    const prev = prevCutoff(range);

    const current = mockYouTubeData.filter(
      d => activeChannels.includes(d.channelId) && isAfter(parseISO(d.date), cutoff)
    );
    const previous = mockYouTubeData.filter(
      d => activeChannels.includes(d.channelId) &&
           isAfter(parseISO(d.date), prev) &&
           !isAfter(parseISO(d.date), cutoff)
    );

    const totalViews = current.reduce((s, d) => s + d.views, 0);
    const totalRevenue = current.reduce((s, d) => s + d.revenue, 0);
    const prevViews = previous.reduce((s, d) => s + d.views, 0);
    const prevRevenue = previous.reduce((s, d) => s + d.revenue, 0);

    const rpm = totalViews > 0 ? (totalRevenue / totalViews) * 1000 : 0;
    const prevRpm = prevViews > 0 ? (prevRevenue / prevViews) * 1000 : 0;

    const delta = (curr: number, prev: number) =>
      prev > 0 ? ((curr - prev) / prev) * 100 : 0;

    // Build daily aggregated series for charts
    const dateMap = new Map<string, { views: number; revenue: number; [k: string]: number }>();
    for (const d of current) {
      const key = d.date;
      if (!dateMap.has(key)) dateMap.set(key, { views: 0, revenue: 0 });
      const entry = dateMap.get(key)!;
      entry.views += d.views;
      entry.revenue += d.revenue;
      entry[`views_${d.channelId}`] = (entry[`views_${d.channelId}`] ?? 0) + d.views;
      entry[`revenue_${d.channelId}`] = (entry[`revenue_${d.channelId}`] ?? 0) + d.revenue;
    }
    const chartData = Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vals]) => ({ date, ...vals }));

    // Last 7 values for sparklines
    const last7Views = chartData.slice(-7).map(d => d.views);
    const last7Revenue = chartData.slice(-7).map(d => d.revenue);

    // Per-channel breakdown
    const channelBreakdown = activeChannels.map(cid => {
      const rows = current.filter(d => d.channelId === cid);
      const prevRows = previous.filter(d => d.channelId === cid);
      const v = rows.reduce((s, d) => s + d.views, 0);
      const r = rows.reduce((s, d) => s + d.revenue, 0);
      const pv = prevRows.reduce((s, d) => s + d.views, 0);
      const pr = prevRows.reduce((s, d) => s + d.revenue, 0);
      return { channelId: cid, views: v, revenue: r, deltaViews: delta(v, pv), deltaRevenue: delta(r, pr) };
    });

    return {
      totalViews, totalRevenue, rpm,
      deltaViews: delta(totalViews, prevViews),
      deltaRevenue: delta(totalRevenue, prevRevenue),
      deltaRpm: delta(rpm, prevRpm),
      chartData,
      last7Views,
      last7Revenue,
      channelBreakdown,
      rawData: current,
    };
  }, [range, activeChannels]);
}

export function useStoreMetrics(range: DateRange, activeStores: string[]) {
  return useMemo(() => {
    const cutoff = cutoffDate(range);
    const prev = prevCutoff(range);

    const current = mockStoreData.filter(
      d => activeStores.includes(d.storeId) && isAfter(parseISO(d.date), cutoff)
    );
    const previous = mockStoreData.filter(
      d => activeStores.includes(d.storeId) &&
           isAfter(parseISO(d.date), prev) &&
           !isAfter(parseISO(d.date), cutoff)
    );

    const totalUnits = current.reduce((s, d) => s + d.unitsSold, 0);
    const totalRevenue = current.reduce((s, d) => s + d.revenue, 0);
    const avgConv = current.length > 0
      ? current.reduce((s, d) => s + d.conversionRate, 0) / current.length : 0;
    const avgOrderValue = totalUnits > 0 ? totalRevenue / totalUnits : 0;

    const prevUnits = previous.reduce((s, d) => s + d.unitsSold, 0);
    const prevRevenue = previous.reduce((s, d) => s + d.revenue, 0);
    const prevConv = previous.length > 0
      ? previous.reduce((s, d) => s + d.conversionRate, 0) / previous.length : 0;
    const prevAov = prevUnits > 0 ? prevRevenue / prevUnits : 0;

    const delta = (curr: number, prev: number) =>
      prev > 0 ? ((curr - prev) / prev) * 100 : 0;

    const dateMap = new Map<string, { units: number; revenue: number; conv: number; count: number; [k: string]: number }>();
    for (const d of current) {
      const key = d.date;
      if (!dateMap.has(key)) dateMap.set(key, { units: 0, revenue: 0, conv: 0, count: 0 });
      const entry = dateMap.get(key)!;
      entry.units += d.unitsSold;
      entry.revenue += d.revenue;
      entry.conv += d.conversionRate;
      entry.count += 1;
      entry[`units_${d.storeId}`] = (entry[`units_${d.storeId}`] ?? 0) + d.unitsSold;
      entry[`conv_${d.storeId}`] = (entry[`conv_${d.storeId}`] ?? 0) + d.conversionRate;
      entry[`convCount_${d.storeId}`] = (entry[`convCount_${d.storeId}`] ?? 0) + 1;
    }
    const chartData = Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vals]) => ({
        date,
        units: vals.units,
        revenue: vals.revenue,
        convRate: vals.count > 0 ? vals.conv / vals.count : 0,
        ...Object.fromEntries(activeStores.map(sid => [
          `units_${sid}`, vals[`units_${sid}`] ?? 0,
        ])),
        ...Object.fromEntries(activeStores.map(sid => [
          `conv_${sid}`, vals[`convCount_${sid}`] > 0
            ? vals[`conv_${sid}`] / vals[`convCount_${sid}`] : 0,
        ])),
      }));

    const last7Units = chartData.slice(-7).map(d => d.units);
    const last7Conv = chartData.slice(-7).map(d => d.convRate);

    const storeBreakdown = activeStores.map(sid => {
      const rows = current.filter((d): d is StoreDataPoint => d.storeId === sid);
      const prevRows = previous.filter((d): d is StoreDataPoint => d.storeId === sid);
      const u = rows.reduce((s, d) => s + d.unitsSold, 0);
      const r = rows.reduce((s, d) => s + d.revenue, 0);
      const c = rows.length > 0 ? rows.reduce((s, d) => s + d.conversionRate, 0) / rows.length : 0;
      const pu = prevRows.reduce((s, d) => s + d.unitsSold, 0);
      const pr = prevRows.reduce((s, d) => s + d.revenue, 0);
      const pc = prevRows.length > 0 ? prevRows.reduce((s, d) => s + d.conversionRate, 0) / prevRows.length : 0;
      return {
        storeId: sid, units: u, revenue: r, convRate: c,
        deltaUnits: delta(u, pu), deltaRevenue: delta(r, pr), deltaConv: delta(c, pc),
      };
    });

    return {
      totalUnits, totalRevenue, avgConv, avgOrderValue,
      deltaUnits: delta(totalUnits, prevUnits),
      deltaRevenue: delta(totalRevenue, prevRevenue),
      deltaConv: delta(avgConv, prevConv),
      deltaAov: delta(avgOrderValue, prevAov),
      chartData,
      last7Units,
      last7Conv,
      storeBreakdown,
    };
  }, [range, activeStores]);
}
