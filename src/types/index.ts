export type DateRange = '7d' | '30d' | '90d';

export interface YouTubeDataPoint {
  date: string;
  channelId: string;
  views: number;
  revenue: number;
}

export interface StoreDataPoint {
  date: string;
  storeId: string;
  unitsSold: number;
  revenue: number;
  sessions: number;
  conversionRate: number;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface Store {
  id: string;
  name: string;
  url: string;
  color: string;
}

export interface KPISummary {
  label: string;
  value: number | string;
  delta: number;
  trend: number[];
  icon?: string;
  accentColor?: string;
}

export interface FilterState {
  dateRange: DateRange;
  activeChannels: string[];
  activeStores: string[];
}
