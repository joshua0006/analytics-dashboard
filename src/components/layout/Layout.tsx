import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useChannelFilter } from '../../hooks/useChannelFilter';

export function Layout() {
  const {
    dateRange, setDateRange,
    activeChannels, toggleChannel, toggleAllChannels,
    activeStores, toggleStore, toggleAllStores,
  } = useChannelFilter();

  return (
    <div className="flex h-screen bg-base text-primary overflow-hidden">
      <Sidebar
        activeChannels={activeChannels}
        activeStores={activeStores}
        onToggleChannel={toggleChannel}
        onToggleStore={toggleStore}
        onToggleAllChannels={toggleAllChannels}
        onToggleAllStores={toggleAllStores}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={{ dateRange, setDateRange, activeChannels, activeStores }} />
      </main>
    </div>
  );
}
