import { Search, Bell, ChevronDown } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 bg-fim-bg/90 backdrop-blur-md border-b border-fim-border">
      <div className="flex items-center justify-between px-6 py-3.5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search files, events, or paths..."
            className="w-full bg-fim-card border border-fim-border rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 ml-4">
          <button className="relative p-2 rounded-lg bg-fim-card border border-fim-border hover:border-fim-border2 transition-colors">
            <Bell className="w-[18px] h-[18px] text-slate-400" />
            <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-fim-bg">
              3
            </span>
          </button>

          <button className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-lg bg-fim-card border border-fim-border hover:border-fim-border2 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 leading-tight">Admin</p>
              <p className="text-[10px] text-slate-500 leading-tight">Security Team</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
