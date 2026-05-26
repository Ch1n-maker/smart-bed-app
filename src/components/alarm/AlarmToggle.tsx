import { useBedStore } from '../../store/useBedStore';
import { Bell, BellOff } from 'lucide-react';

export function AlarmToggle() {
  const alarmEnabled = useBedStore(s => s.alarmEnabled);
  const toggleAlarm = useBedStore(s => s.toggleAlarm);

  return (
    <button
      onClick={toggleAlarm}
      className={`w-full p-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm ${
        alarmEnabled
          ? 'bg-success text-white shadow-green-200'
          : 'bg-gray-200 text-text-secondary'
      }`}
    >
      {alarmEnabled ? <Bell size={24} /> : <BellOff size={24} />}
      <span className="text-base font-semibold">
        {alarmEnabled ? '报警已开启' : '报警已关闭'}
      </span>
    </button>
  );
}
