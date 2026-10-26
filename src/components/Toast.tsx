import { CheckCircle2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  message: string | null;
}

export default function Toast({ message }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center gap-3 bg-fim-card border border-emerald-500/30 rounded-xl px-5 py-4 shadow-2xl shadow-emerald-500/10 min-w-[300px]">
        <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" strokeWidth={2} />
        </div>
        <p className="text-sm font-semibold text-white flex-1">{message}</p>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-500 hover:text-slate-300 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
