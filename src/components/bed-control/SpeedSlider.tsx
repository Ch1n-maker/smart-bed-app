import { useBedStore } from '../../store/useBedStore';
import { Gauge } from 'lucide-react';

const speedLabels = ['', '慢', '中慢', '中', '中快', '快'];

export function SpeedSlider() {
  const movingSpeed = useBedStore(s => s.movingSpeed);
  const setSpeed = useBedStore(s => s.setSpeed);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Gauge size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-text">速度调节</h3>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        value={movingSpeed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-text-secondary mt-1">
        <span>1</span>
        <span className="font-medium text-primary">{speedLabels[movingSpeed]}</span>
        <span>5</span>
      </div>
    </div>
  );
}
