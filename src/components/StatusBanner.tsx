import { ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';

interface Props {
  monitoring: boolean;
}

export default function StatusBanner({ monitoring }: Props) {
  if (!monitoring) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-fim-card to-fim-card2 border border-blue-500/20 px-6 py-5 flex items-center gap-4 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 animate-pulse-dot">
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-blue-100 tracking-tight animate-pulse-dot">System: Initializing Scan...</h2>
          <p className="text-sm text-blue-300/70">Preparing to scan file system for integrity changes.</p>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-dot" />
            Scanning
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-fim-card to-fim-card2 border border-emerald-500/15 px-6 py-5 flex items-center gap-4 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-6 h-6 text-emerald-400" strokeWidth={2} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">System: Monitoring Safely</h2>
        <p className="text-sm text-slate-400">File integrity monitoring is active and running normally.</p>
      </div>
      <div className="ml-auto hidden sm:flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          Active
        </span>
      </div>
    </div>
  );
}
