import { formatAngle } from '../../utils/formatValue';

interface AngleGaugeProps {
  label: string;
  angle: number;
  maxAngle: number;
}

export function AngleGauge({ label, angle, maxAngle }: AngleGaugeProps) {
  const radius = 52;
  const strokeWidth = 8;
  const circumference = Math.PI * radius;
  const progress = Math.min(angle / maxAngle, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center">
      <h3 className="text-xs font-medium text-text-secondary mb-1">{label}</h3>
      <div className="relative w-[120px] h-[70px]">
        <svg width="120" height="70" viewBox="0 0 120 70">
          <path
            d={`M ${60 - radius} 60 A ${radius} ${radius} 0 0 1 ${60 + radius} 60`}
            fill="none"
            stroke="#E3F2FD"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d={`M ${60 - radius} 60 A ${radius} ${radius} 0 0 1 ${60 + radius} 60`}
            fill="none"
            stroke="#1565C0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-xl font-bold text-text">{formatAngle(angle)}</span>
        </div>
      </div>
    </div>
  );
}
