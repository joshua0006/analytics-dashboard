import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Youtube, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { CHANNELS } from '../../data/mockYouTube';
import { STORES } from '../../data/mockStore';
import { useState } from 'react';

interface Props {
  activeChannels: string[];
  activeStores: string[];
  onToggleChannel: (id: string) => void;
  onToggleStore: (id: string) => void;
  onToggleAllChannels: () => void;
  onToggleAllStores: () => void;
}

const navItems = [
  { to: '/combined', label: 'Combined',  Icon: LayoutDashboard },
  { to: '/youtube',  label: 'YouTube',   Icon: Youtube         },
  { to: '/store',    label: 'Web Store', Icon: ShoppingBag     },
];

export function Sidebar({ activeChannels, activeStores, onToggleChannel, onToggleStore, onToggleAllChannels, onToggleAllStores }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        'flex flex-col h-screen border-r border-border bg-surface transition-all duration-200 shrink-0',
        collapsed ? 'w-14' : 'w-56'
      )}
    >
      {/* Brand */}
      <div className={clsx('flex items-center gap-2.5 px-4 py-4 border-b border-border', collapsed && 'justify-center px-0')}>
        <div className="w-7 h-7 rounded bg-accent-yt flex items-center justify-center shrink-0">
          <span className="font-mono text-xs font-bold text-base">AD</span>
        </div>
        {!collapsed && (
          <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase">Analytics</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 p-2 border-b border-border">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => clsx(
              'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-sans font-medium transition-all',
              collapsed && 'justify-center px-0',
              isActive
                ? 'bg-card text-primary border border-border'
                : 'text-muted hover:text-primary hover:bg-card/50'
            )}
          >
            <Icon size={15} className="shrink-0" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
          {/* Channels */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Channels</span>
              <button onClick={onToggleAllChannels} className="font-mono text-[10px] text-muted hover:text-accent-yt transition-colors">
                {activeChannels.length === CHANNELS.length ? 'None' : 'All'}
              </button>
            </div>
            {CHANNELS.map(ch => (
              <label key={ch.id} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeChannels.includes(ch.id)}
                  onChange={() => onToggleChannel(ch.id)}
                  className="sr-only"
                />
                <span
                  className={clsx(
                    'w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 transition-all',
                    activeChannels.includes(ch.id) ? 'border-transparent' : 'border-border bg-transparent'
                  )}
                  style={activeChannels.includes(ch.id) ? { background: ch.color } : {}}
                >
                  {activeChannels.includes(ch.id) && (
                    <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#0f0f11" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  )}
                </span>
                <span className="font-sans text-xs text-muted group-hover:text-primary transition-colors truncate">
                  {ch.avatar} {ch.name}
                </span>
              </label>
            ))}
          </div>

          {/* Stores */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Stores</span>
              <button onClick={onToggleAllStores} className="font-mono text-[10px] text-muted hover:text-accent-store transition-colors">
                {activeStores.length === STORES.length ? 'None' : 'All'}
              </button>
            </div>
            {STORES.map(st => (
              <label key={st.id} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeStores.includes(st.id)}
                  onChange={() => onToggleStore(st.id)}
                  className="sr-only"
                />
                <span
                  className={clsx(
                    'w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 transition-all',
                    activeStores.includes(st.id) ? 'border-transparent' : 'border-border bg-transparent'
                  )}
                  style={activeStores.includes(st.id) ? { background: st.color } : {}}
                >
                  {activeStores.includes(st.id) && (
                    <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#0f0f11" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  )}
                </span>
                <span className="font-sans text-xs text-muted group-hover:text-primary transition-colors truncate">
                  {st.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="flex items-center justify-center gap-1.5 p-3 border-t border-border text-muted hover:text-primary transition-colors text-xs font-sans"
      >
        {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
      </button>
    </aside>
  );
}
