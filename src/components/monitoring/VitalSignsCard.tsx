import { useBedStore } from '../../store/useBedStore';
import { formatHeartRate, formatRespiration } from '../../utils/formatValue';
import { Heart, Wind } from 'lucide-react';

interface VitalSignsCardProps {
  type: 'heart' | 'respiration';
}

export function VitalSignsCard({ type }: VitalSignsCardProps) {
  const heartRate = useBedStore(s => s.heartRate);
  const respirationRate = useBedStore(s => s.respirationRate);

  if (type === 'heart') {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Heart size={16} className="text-danger" />
          <h3 className="text-xs font-medium text-text-secondary">心率</h3>
        </div>
        <p className="text-2xl font-bold text-text">{formatHeartRate(heartRate)}</p>
        <div className="mt-2 flex gap-0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full bg-danger/30"
              style={{
                opacity: Math.abs(Math.sin(Date.now() / 400 + i)) * 0.6 + 0.4,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <Wind size={16} className="text-primary" />
        <h3 className="text-xs font-medium text-text-secondary">呼吸率</h3>
      </div>
      <p className="text-2xl font-bold text-text">{formatRespiration(respirationRate)}</p>
      <div className="mt-2 flex gap-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full bg-primary/30"
            style={{
              opacity: Math.abs(Math.sin(Date.now() / 600 + i + 2)) * 0.6 + 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}
