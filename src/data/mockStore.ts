import { StoreDataPoint, Store } from '../types';
import { subDays, format } from 'date-fns';

export const STORES: Store[] = [
  { id: 'st-001', name: 'GreenThumb Co.',  url: 'greenthumb.co',  color: '#22d3c5' },
  { id: 'st-002', name: 'VanGear Shop',    url: 'vangear.shop',   color: '#f87171' },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function randomWalk(rng: () => number, base: number, volatility: number, days: number): number[] {
  const values: number[] = [];
  let current = base;
  for (let i = 0; i < days; i++) {
    const change = (rng() - 0.47) * volatility;
    current = Math.max(base * 0.2, current + change);
    values.push(Math.round(current));
  }
  return values;
}

const DAYS = 90;
const today = new Date();

function generateStoreData(storeId: string, seed: number, baseSessions: number, baseConv: number, avgOrderValue: number): StoreDataPoint[] {
  const rng = seededRandom(seed);
  const sessionSeries = randomWalk(rng, baseSessions, baseSessions * 0.12, DAYS);
  return sessionSeries.map((sessions, i) => {
    const convRate = Math.max(0.5, Math.min(8, baseConv + (rng() - 0.5) * 1.2));
    const unitsSold = Math.round(sessions * convRate / 100);
    const revenue = Math.round(unitsSold * avgOrderValue * (0.9 + rng() * 0.2) * 100) / 100;
    return {
      date: format(subDays(today, DAYS - 1 - i), 'yyyy-MM-dd'),
      storeId,
      sessions,
      unitsSold,
      revenue,
      conversionRate: Math.round(convRate * 100) / 100,
    };
  });
}

export const mockStoreData: StoreDataPoint[] = [
  ...generateStoreData('st-001', 77,  3_200, 3.8, 42),
  ...generateStoreData('st-002', 213, 1_800, 2.1, 180),
];
