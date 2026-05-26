import { useBedStore } from '../../store/useBedStore';
import { formatTimestamp } from '../../utils/formatValue';
import { Clock } from 'lucide-react';

const typeIcons: Record<string, string> = {
  emergency_stop: '🛑',
  high_pressure: '⚠️',
  low_heart_rate: '💓',
  high_heart_rate: '💗',
  excessive_angle: '📐',
};

export function AlarmLog() {
  const alarmLog = useBedStore(s => s.alarmLog);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-text">报警记录</h3>
        <span className="text-xs text-text-secondary ml-auto">{alarmLog.length} 条</span>
      </div>

      {alarmLog.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-4">暂无报警记录</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {alarmLog.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-2 p-2 rounded-lg bg-gray-50"
            >
              <span className="text-lg">{typeIcons[event.type] || '🔔'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text truncate">{event.message}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{formatTimestamp(event.timestamp)}</p>
              </div>
              {event.type !== 'emergency_stop' && (
                <span className="text-[10px] text-text-secondary whitespace-nowrap">
                  阈值: {event.threshold}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
