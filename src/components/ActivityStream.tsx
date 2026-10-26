import { useState, useEffect } from 'react';
import { Plus, Pen, X, Filter, ChevronDown, AlertTriangle, Trash2 } from 'lucide-react';
import type { FileEvent } from '@/App';

type EventType = 'created' | 'modified' | 'deleted' | 'breach';

interface Props {
  events: FileEvent[];
  onDismiss: (id: number) => void;
  onClearAll: () => void;
}

const typeConfig: Record<EventType, {
  icon: typeof Plus;
  iconBg: string;
  badge: string;
  badgeBg: string;
}> = {
  created: {
    icon: Plus,
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    badge: 'CREATED',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  modified: {
    icon: Pen,
    iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    badge: 'MODIFIED',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  },
  deleted: {
    icon: X,
    iconBg: 'bg-red-500/10 text-red-400 border-red-500/20',
    badge: 'DELETED',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
  },
  breach: {
    icon: AlertTriangle,
    iconBg: 'bg-red-500/20 text-red-400 border-red-500/40',
    badge: 'HIGH RISK',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/50',
  },
};

function BreachRow({ event, index, onDismiss }: { event: FileEvent; index: number; onDismiss: (id: number) => void }) {
  const [pulsing, setPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPulsing(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const cfg = typeConfig.breach;

  return (
    <div
      className={`bg-fim-card2 border rounded-lg p-4 flex items-start gap-3 hover:border-fim-border2 transition-all animate-fade-in-up ${
        pulsing
          ? 'border-red-500/50 animate-pulse-dot shadow-lg shadow-red-500/10'
          : 'border-red-500/40 shadow-md shadow-red-500/5'
      }`
      }
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${cfg.iconBg} ${pulsing ? 'animate-pulse-dot' : ''}`}>
        <cfg.icon className="w-4 h-4" strokeWidth={2.5} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white">{event.title}</p>
          <span className="text-xs text-slate-500">{event.timestamp}</span>
          <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
            HIGH RISK BREACH DETECTED
          </span>
        </div>
        <p className="text-xs mt-1 font-mono break-all text-red-300">{event.path}</p>
        <p className="text-[11px] text-slate-600 mt-1.5 font-mono break-all leading-relaxed">
          SHA-256: {event.hash}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full border ${cfg.badgeBg}`}>
          {cfg.badge}
        </span>
        <button
          onClick={() => onDismiss(event.id)}
          className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default function ActivityStream({ events, onDismiss, onClearAll }: Props) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="bg-fim-card border border-fim-border rounded-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-fim-border">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
          <h3 className="text-sm font-semibold text-white">Real-time file system events</h3>
          <span className="text-xs text-slate-500 bg-fim-card2 border border-fim-border rounded-full px-2 py-0.5">{events.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-fim-card2 border border-fim-border rounded-lg px-3 py-1.5 hover:border-red-500/30 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-fim-card2 border border-fim-border rounded-lg px-3 py-1.5 hover:border-fim-border2 transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              All Events
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-fim-card2 border border-fim-border2 rounded-lg shadow-xl py-1 z-10">
                {['All Events', 'Created', 'Modified', 'Deleted'].map((f) => (
                  <button
                    key={f}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event cards */}
      <div className="p-4 space-y-3">
        {events.map((event, i) => {
          if (event.isBreach) {
            return <BreachRow key={event.id} event={event} index={i} onDismiss={onDismiss} />;
          }
          const cfg = typeConfig[event.type];
          return (
            <div
              key={event.id}
              className="bg-fim-card2 border border-fim-border rounded-lg p-4 flex items-start gap-3 hover:border-fim-border2 transition-all animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
                <cfg.icon className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{event.title}</p>
                  <span className="text-xs text-slate-500">{event.timestamp}</span>
                </div>
                <p className="text-xs mt-1 font-mono break-all text-slate-400">{event.path}</p>
                <p className="text-[11px] text-slate-600 mt-1.5 font-mono break-all leading-relaxed">
                  SHA-256: {event.hash}
                </p>
              </div>
              <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${cfg.badgeBg}`}>
                {cfg.badge}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
