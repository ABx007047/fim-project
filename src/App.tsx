import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import StatusBanner from '@/components/StatusBanner';
import MetricsRow from '@/components/MetricsRow';
import ActivityStream from '@/components/ActivityStream';
import ConfigPanel from '@/components/ConfigPanel';
import Toast from '@/components/Toast';

export interface FileEvent {
  id: number;
  type: 'created' | 'modified' | 'deleted' | 'breach';
  title: string;
  timestamp: string;
  path: string;
  hash: string;
  isBreach?: boolean;
}

const initialEvents: FileEvent[] = [
  {
    id: 1,
    type: 'created',
    title: 'File Created',
    timestamp: '14:32:08 UTC',
    path: '/etc/nginx/conf.d/site.conf',
    hash: 'a3f5c8e2b9d1047f6a2c8e5b3d9f0a1c7e4b2d8f5a3c1e9b6d4f2a0e8c5b3d1f',
  },
  {
    id: 2,
    type: 'modified',
    title: 'File Modified',
    timestamp: '14:31:52 UTC',
    path: '/var/log/auth.log',
    hash: 'b7e2d9f4a1c8035e2b9d6f3a0c7e4b1d8f5a2c9e6b3d0f7a4c1e8b5d2f9a6c3e',
  },
  {
    id: 3,
    type: 'deleted',
    title: 'File Deleted',
    timestamp: '14:30:41 UTC',
    path: '/tmp/cache/session_4821.tmp',
    hash: 'c2d9f6a3b0e8014f7c5b2d9e6a3f0c8d5b2e9f6a3d0c7b4e1f8a5c2d9b6e3f1a',
  },
];

export default function App() {
  const [monitoring, setMonitoring] = useState(true);
  const [events, setEvents] = useState<FileEvent[]>(initialEvents);
  const [alertCount, setAlertCount] = useState(3);
  const [toast, setToast] = useState<string | null>(null);
  const [nextId, setNextId] = useState(4);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }, []);

  const injectBreach = useCallback(() => {
    const now = new Date();
    const ts = now.toISOString().slice(11, 19) + ' UTC';
    const newEvent: FileEvent = {
      id: nextId,
      type: 'breach',
      title: 'File Modified',
      timestamp: ts,
      path: '/etc/passwd',
      hash: 'e1f9a4c7b0d3258e6f1a9c4b7d2e5f8a3c6b9d1e4f7a2c5b8e3d6f1a9c4b7e2d',
      isBreach: true,
    };
    setEvents((prev) => [newEvent, ...prev].slice(0, 20));
    setAlertCount((c) => c + 1);
    setNextId((n) => n + 1);
  }, [nextId]);

  const dismissEvent = useCallback((id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAllEvents = useCallback(() => {
    setEvents([]);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      if (e.key.toLowerCase() === 'a') {
        injectBreach();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [injectBreach]);

  return (
    <div className="min-h-screen bg-fim-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
          <StatusBanner monitoring={monitoring} />
          <MetricsRow alertCount={alertCount} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            <ActivityStream events={events} onDismiss={dismissEvent} onClearAll={clearAllEvents} />
            <ConfigPanel
              monitoring={monitoring}
              onToggleMonitoring={() => setMonitoring((m) => !m)}
              onUpdateBaseline={() => showToast('Baseline Snapshot Updated Successfully!')}
            />
          </div>
        </main>
      </div>

      {/* Invisible 1px trigger zone at bottom right */}
      <button
        onClick={injectBreach}
        aria-label="trigger"
        className="fixed bottom-0 right-0 w-1 h-1 opacity-0 cursor-default z-50"
        style={{ background: 'transparent', border: 'none', padding: 0 }}
      />

      <Toast message={toast} />
    </div>
  );
}
