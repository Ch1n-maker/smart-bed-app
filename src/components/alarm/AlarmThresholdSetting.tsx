import { useBedStore } from '../../store/useBedStore';
import type { AlarmThresholds } from '../../store/types';
import { Settings2 } from 'lucide-react';

interface ThresholdItem {
  key: keyof AlarmThresholds;
  label: string;
  min: number;
  max: number;
  unit: string;
}

const thresholds: ThresholdItem[] = [
  { key: 'maxPressure', label: '最大压力', min: 20, max: 100, unit: 'kPa' },
  { key: 'minHeartRate', label: '最低心率', min: 30, max: 80, unit: 'bpm' },
  { key: 'maxHeartRate', label: '最高心率', min: 80, max: 200, unit: 'bpm' },
  { key: 'maxBackAngle', label: '最大角度', min: 30, max: 90, unit: '°' },
];

export function AlarmThresholdSetting() {
  const alarmThresholds = useBedStore(s => s.alarmThresholds);
  const setAlarmThreshold = useBedStore(s => s.setAlarmThreshold);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Settings2 size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-text">报警阈值设置</h3>
      </div>
      <div className="space-y-3">
        {thresholds.map(({ key, label, min, max, unit }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-text-secondary">{label}</span>
              <span className="text-xs font-medium text-primary">{alarmThresholds[key]} {unit}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={alarmThresholds[key]}
              onChange={(e) => setAlarmThreshold(key, Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
