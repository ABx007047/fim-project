import { useState } from 'react';
import { Play, Square, RefreshCw, FolderOpen, Plus, Loader2 } from 'lucide-react';

const exclusionPaths = ['/proc', '/sys', '/dev', '/run', '/tmp', '/var/cache'];

const settings = [
  { label: 'Monitor subdirectories', checked: true },
  { label: 'Detect file content changes', checked: true },
  { label: 'Alert on file permissions changes', checked: false },
  { label: 'Ignore temporary files', checked: true },
];

interface Props {
  monitoring: boolean;
  onToggleMonitoring: () => void;
  onUpdateBaseline: () => void;
}

export default function ConfigPanel({ monitoring, onToggleMonitoring, onUpdateBaseline }: Props) {
  const [checkboxes, setCheckboxes] = useState(settings);
  const [baselineLoading, setBaselineLoading] = useState(false);

  const handleBaseline = () => {
    setBaselineLoading(true);
    setTimeout(() => {
      setBaselineLoading(false);
      onUpdateBaseline();
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Control buttons */}
      <div className="space-y-2.5">
        <button
          onClick={onToggleMonitoring}
          className={`w-full flex items-center justify-center gap-2 font-semibold text-sm rounded-lg py-3 transition-all ${
            monitoring
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30'
              : 'bg-fim-card2 border border-fim-border hover:border-fim-border2 text-slate-300'
          }`}
        >
          {monitoring ? (
            <>
              <Play className="w-4 h-4" fill="currentColor" />
              Start Monitoring
            </>
          ) : (
            <>
              <Square className="w-4 h-4" fill="currentColor" />
              Stop Monitoring
            </>
          )}
        </button>
        <button
          onClick={handleBaseline}
          disabled={baselineLoading}
          className="w-full flex items-center justify-center gap-2 bg-fim-card2 border border-fim-border hover:border-fim-border2 text-slate-300 font-semibold text-sm rounded-lg py-3 transition-colors disabled:opacity-60"
        >
          {baselineLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating Baseline...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Update Baseline
            </>
          )}
        </button>
      </div>

      {/* Target Directory */}
      <div className="bg-fim-card border border-fim-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Target Directory</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value="/"
            readOnly
            className="flex-1 bg-fim-card2 border border-fim-border rounded-lg px-3 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-emerald-500/40"
          />
          <button className="flex items-center gap-1.5 bg-fim-card2 border border-fim-border hover:border-fim-border2 text-slate-300 text-sm font-medium rounded-lg px-3 py-2 transition-colors">
            <FolderOpen className="w-4 h-4" />
            Browse
          </button>
        </div>
      </div>

      {/* Exclusion Rules */}
      <div className="bg-fim-card border border-fim-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Exclusion Rules</h3>
        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
          {exclusionPaths.map((p) => (
            <div
              key={p}
              className="flex items-center justify-between bg-fim-card2 border border-fim-border rounded-lg px-3 py-2"
            >
              <span className="text-xs text-slate-400 font-mono">{p}</span>
              <button className="text-slate-600 hover:text-red-400 transition-colors">
                <span className="text-xs">Remove</span>
              </button>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-emerald-400 bg-emerald-500/5 border border-dashed border-emerald-500/20 rounded-lg py-2 hover:bg-emerald-500/10 transition-colors">
          <Plus className="w-4 h-4" />
          Add Exclusion
        </button>
      </div>

      {/* Additional Settings */}
      <div className="bg-fim-card border border-fim-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Additional Settings</h3>
        <div className="space-y-3">
          {checkboxes.map((s, i) => (
            <label key={s.label} className="flex items-center gap-3 cursor-pointer group">
              <button
                onClick={() =>
                  setCheckboxes((prev) =>
                    prev.map((c, idx) => (idx === i ? { ...c, checked: !c.checked } : c))
                  )
                }
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                  s.checked
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'bg-fim-card2 border-fim-border2 group-hover:border-slate-500'
                }`}
              >
                {s.checked && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className={`text-xs font-medium transition-colors ${s.checked ? 'text-slate-200' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
