import { useBedStore } from '../../store/useBedStore';
import type { DetectedPosition } from '../../store/types';
import { formatAngle } from '../../utils/formatValue';

const positionLabels: Record<DetectedPosition, { label: string; icon: string }> = {
  lying_flat: { label: '平躺', icon: '🛌' },
  sitting: { label: '坐姿', icon: '🪑' },
  fowlers: { label: "Fowler's 体位", icon: '🛏️' },
  trendelenburg: { label: 'Trendelenburg 体位', icon: '⚠️' },
  unknown: { label: '检测中...', icon: '🔍' },
};

export function PositionIndicator() {
  const detectedPosition = useBedStore(s => s.detectedPosition);
  const backAngle = useBedStore(s => s.backAngle);
  const legAngle = useBedStore(s => s.legAngle);
  const pos = positionLabels[detectedPosition];

  return (
    <div className="mt-2 pt-2 border-t border-gray-100">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl">{pos.icon}</span>
        <span className="text-sm font-semibold text-text">{pos.label}</span>
      </div>
      <div className="flex justify-center gap-4 mt-1">
        <span className="text-xs text-text-secondary">背部: {formatAngle(backAngle)}</span>
        <span className="text-xs text-text-secondary">腿部: {formatAngle(legAngle)}</span>
      </div>
    </div>
  );
}
