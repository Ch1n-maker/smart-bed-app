import { useBedStore } from '../../store/useBedStore';
import { formatPressure } from '../../utils/formatValue';
import { Activity } from 'lucide-react';

export function BedStatusCard() {
  const pressurePoints = useBedStore(s => s.pressurePoints);
  const movingDirection = useBedStore(s => s.movingDirection);
  const movingSpeed = useBedStore(s => s.movingSpeed);

  const avgPressure = pressurePoints.reduce((a, b) => a + b, 0) / pressurePoints.length;
  const maxPressure = Math.max(...pressurePoints);

  const dirLabel = movingDirection === 'up' ? '上升中' : movingDirection === 'down' ? '下降中' : '停止';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Activity size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-text">状态总览</h3>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-text-secondary">运动状态</span>
          <span className={`text-sm font-medium ${movingDirection === 'stop' ? 'text-success' : 'text-primary'}`}>
            {dirLabel} · 速度 {movingSpeed}/5
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-text-secondary">平均压力</span>
          <span className="text-sm font-medium">{formatPressure(avgPressure)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-text-secondary">最大压力</span>
          <span className="text-sm font-medium">{formatPressure(maxPressure)}</span>
        </div>

        <div className="mt-3 flex gap-1">
          {pressurePoints.map((p, i) => {
            const ratio = p / 60;
            const color = ratio > 0.8 ? 'bg-danger' : ratio > 0.5 ? 'bg-warning' : 'bg-success';
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-8 bg-gray-100 rounded relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 ${color} rounded transition-all duration-300`}
                    style={{ height: `${Math.min(ratio * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-text-secondary">{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
