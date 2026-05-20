import { useState, useCallback } from 'react';
import { DateRange } from '../types';
import { CHANNELS } from '../data/mockYouTube';
import { STORES } from '../data/mockStore';

export function useChannelFilter() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [activeChannels, setActiveChannels] = useState<string[]>(CHANNELS.map(c => c.id));
  const [activeStores, setActiveStores] = useState<string[]>(STORES.map(s => s.id));

  const toggleChannel = useCallback((id: string) => {
    setActiveChannels(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }, []);

  const toggleStore = useCallback((id: string) => {
    setActiveStores(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  }, []);

  const toggleAllChannels = useCallback(() => {
    setActiveChannels(prev =>
      prev.length === CHANNELS.length ? [] : CHANNELS.map(c => c.id)
    );
  }, []);

  const toggleAllStores = useCallback(() => {
    setActiveStores(prev =>
      prev.length === STORES.length ? [] : STORES.map(s => s.id)
    );
  }, []);

  return {
    dateRange, setDateRange,
    activeChannels, toggleChannel, toggleAllChannels,
    activeStores, toggleStore, toggleAllStores,
  };
}
