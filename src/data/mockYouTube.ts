import { YouTubeDataPoint, Channel } from '../types';
import { subDays, format } from 'date-fns';

export const CHANNELS: Channel[] = [
  { id: 'yt-001', name: 'GardenWithGrace', avatar: '🌿', color: '#4ade80' },
  { id: 'yt-002', name: 'TechTalkDaily',   avatar: '⚡', color: '#f5a623' },
  { id: 'yt-003', name: 'VanLifeVibes',    avatar: '🚐', color: '#a78bfa' },
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
    const change = (rng() - 0.48) * volatility;
    current = Math.max(base * 0.3, current + change);
    values.push(Math.round(current));
  }
  return values;
}

const DAYS = 90;
const today = new Date();

function generateChannelData(channelId: string, seed: number, baseViews: number, rpm: number): YouTubeDataPoint[] {
  const rng = seededRandom(seed);
  const viewSeries = randomWalk(rng, baseViews, baseViews * 0.15, DAYS);
  return viewSeries.map((views, i) => ({
    date: format(subDays(today, DAYS - 1 - i), 'yyyy-MM-dd'),
    channelId,
    views,
    revenue: Math.round((views / 1000) * rpm * (0.85 + rng() * 0.3) * 100) / 100,
  }));
}

export const mockYouTubeData: YouTubeDataPoint[] = [
  ...generateChannelData('yt-001', 42,   8_500,  3.20),
  ...generateChannelData('yt-002', 137,  22_000, 4.80),
  ...generateChannelData('yt-003', 91,   6_200,  2.60),
];
