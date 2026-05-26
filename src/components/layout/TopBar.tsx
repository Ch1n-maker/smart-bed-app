import { useBedStore } from '../../store/useBedStore';
import { ConnectionBadge } from './ConnectionBadge';
import { Settings } from 'lucide-react';

export function TopBar() {
  const toggleSettings = useBedStore(s => s.toggleSettings);
  const alarmActive = useBedStore(s => s.alarmActive);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-primary-light border-b border-blue-100 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">SB</span>
        </div>
        <div>
          <h1 className="text-base font-bold text-primary-dark leading-tight">智能病床控制</h1>
          <ConnectionBadge />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {alarmActive && (
          <div className="bg-danger text-white text-xs px-2 py-0.5 rounded-full font-medium alarm-flash">
            报警中
          </div>
        )}
        <button
          onClick={toggleSettings}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/60 transition-colors"
        >
          <Settings size={20} className="text-primary" />
        </button>
      </div>
    </div>
  );
}
