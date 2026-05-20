import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Youtube, ShoppingBag,
  ChevronLeft, ChevronRight,
  Sprout, Zap, Truck, Leaf,
} from 'lucide-react';
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
  { to: '/combined', label: 'Combined',  Icon: LayoutDashboard, accent: '#a78bfa' },
  { to: '/youtube',  label: 'YouTube',   Icon: Youtube,         accent: '#f5a623' },
  { to: '/store',    label: 'Web Store', Icon: ShoppingBag,     accent: '#22d3c5' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>;

const CHANNEL_ICONS: Record<string, AnyIcon> = {
  'yt-001': Sprout,
  'yt-002': Zap,
  'yt-003': Truck,
};

const STORE_ICONS: Record<string, AnyIcon> = {
  'st-001': Leaf,
  'st-002': ShoppingBag,
};

export function Sidebar({ activeChannels, activeStores, onToggleChannel, onToggleStore, onToggleAllChannels, onToggleAllStores }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const showChannels = pathname === '/youtube' || pathname === '/combined';
  const showStores = pathname === '/store' || pathname === '/combined';

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
        {navItems.map(({ to, label, Icon, accent }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => clsx(
              'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-sans font-medium transition-all duration-150',
              collapsed && 'justify-center px-0',
              isActive ? 'text-primary' : 'text-muted hover:text-primary hover:bg-card/50',
            )}
            style={({ isActive }) => isActive ? {
              background: `${accent}14`,
              border: `1px solid ${accent}42`,
              color: 'var(--text-primary)',
            } : { border: '1px solid transparent' }}
          >
            {({ isActive }) => (
              <>
                <Icon size={15} className="shrink-0" style={isActive ? { color: accent } : undefined} />
                {!collapsed && label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-5">

          {/* Channels */}
          {showChannels && <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Channels</span>
              <button
                onClick={onToggleAllChannels}
                className="font-mono text-[10px] text-muted hover:text-accent-yt transition-colors"
              >
                {activeChannels.length === CHANNELS.length ? 'None' : 'All'}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {CHANNELS.map(ch => {
                const active = activeChannels.includes(ch.id);
                const Icon = CHANNEL_ICONS[ch.id];
                return (
                  <button
                    key={ch.id}
                    onClick={() => onToggleChannel(ch.id)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-sans font-medium transition-all text-left"
                    style={active ? {
                      background: `${ch.color}22`,
                      border: `1px solid ${ch.color}70`,
                      color: 'var(--text-primary)',
                    } : {
                      border: '1px solid transparent',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {Icon && <Icon size={13} strokeWidth={2} style={active ? { color: ch.color } : undefined} />}
                    <span className="truncate">{ch.name}</span>
                  </button>
                );
              })}
            </div>
          </div>}

          {/* Stores */}
          {showStores && <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Stores</span>
              <button
                onClick={onToggleAllStores}
                className="font-mono text-[10px] text-muted hover:text-accent-store transition-colors"
              >
                {activeStores.length === STORES.length ? 'None' : 'All'}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {STORES.map(st => {
                const active = activeStores.includes(st.id);
                const Icon = STORE_ICONS[st.id];
                return (
                  <button
                    key={st.id}
                    onClick={() => onToggleStore(st.id)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-sans font-medium transition-all text-left"
                    style={active ? {
                      background: `${st.color}22`,
                      border: `1px solid ${st.color}70`,
                      color: 'var(--text-primary)',
                    } : {
                      border: '1px solid transparent',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {Icon && <Icon size={13} strokeWidth={2} style={active ? { color: st.color } : undefined} />}
                    <span className="truncate">{st.name}</span>
                  </button>
                );
              })}
            </div>
          </div>}

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
