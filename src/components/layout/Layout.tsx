import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useChannelFilter } from '../../hooks/useChannelFilter';

export function Layout() {
  const {
    dateRange, setDateRange,
    activeChannels, toggleChannel, toggleAllChannels,
    activeStores, toggleStore, toggleAllStores,
  } = useChannelFilter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-base text-primary overflow-hidden">
      <Sidebar
        activeChannels={activeChannels}
        activeStores={activeStores}
        onToggleChannel={toggleChannel}
        onToggleStore={toggleStore}
        onToggleAllChannels={toggleAllChannels}
        onToggleAllStores={toggleAllStores}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="flex-1 overflow-y-auto">
        <Outlet context={{ dateRange, setDateRange, activeChannels, activeStores, onMenuClick: () => setMobileOpen(o => !o) }} />
      </main>
    </div>
  );
}
