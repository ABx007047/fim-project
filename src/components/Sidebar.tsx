import { Shield, LayoutDashboard, FileText, FolderTree, Ban, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileText, label: 'File Events' },
  { icon: FolderTree, label: 'Directories' },
  { icon: Ban, label: 'Exclusions' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-fim-card border-r border-fim-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-fim-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-tight">File Integrity Monitor</h1>
            <p className="text-[11px] text-slate-500 font-medium">Detect. Track. Stay Secure.</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">Navigation</p>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              item.active
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />
            <span>{item.label}</span>
            {item.active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-fim-border">
        <p className="text-[11px] text-slate-600 font-medium">
          FIM v1.2.0 <span className="text-slate-700">|</span> Stronger systems. Safer tomorrow.
        </p>
      </div>
    </aside>
  );
}
