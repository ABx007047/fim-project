import { FileText, Clock, Bell, TrendingUp } from 'lucide-react';

interface Props {
  alertCount: number;
}

export default function MetricsRow({ alertCount }: Props) {
  const metrics = [
    {
      icon: FileText,
      label: 'Total Files Tracked',
      value: '1,245',
      sub: '+12 today',
      subColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      icon: Clock,
      label: 'Last Scan Time',
      value: '2 mins ago',
      sub: '2026-09-21 14:32:08 UTC',
      subColor: 'text-slate-500',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      icon: Bell,
      label: 'Total Alerts Today',
      value: `${alertCount} events`,
      sub: alertCount > 3 ? '1 created · 2 modified · 1 deleted' : '1 created · 1 modified · 1 deleted',
      subColor: 'text-slate-500',
      iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-fim-card border border-fim-border rounded-xl p-5 hover:border-fim-border2 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${m.iconBg}`}>
              <m.icon className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-400">{m.label}</p>
              <p className="text-2xl font-bold text-white mt-0.5 tracking-tight transition-all duration-300">{m.value}</p>
              <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${m.subColor}`}>
                {m.sub.includes('+') && <TrendingUp className="w-3 h-3" />}
                {m.sub}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
