import { useBedStore } from '../../store/useBedStore';
import { PositionIndicator } from './PositionIndicator';

export function BodyPositionDisplay() {
  const backAngle = useBedStore(s => s.backAngle);
  const legAngle = useBedStore(s => s.legAngle);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-text mb-2 text-center">体位监测</h3>
      <svg width="100%" height="160" viewBox="0 0 240 160">
        {/* Bed base */}
        <rect x="30" y="110" width="180" height="20" rx="6" fill="#E3F2FD" stroke="#BBDEFB" strokeWidth="2" />
        <rect x="15" y="125" width="210" height="8" rx="4" fill="#BBDEFB" />
        {/* Wheels */}
        <circle cx="50" cy="138" r="6" fill="#90CAF9" />
        <circle cx="190" cy="138" r="6" fill="#90CAF9" />

        {/* Body - torso */}
        <g transform={`rotate(${-backAngle * 0.7}, 120, 100)`}>
          <ellipse cx="120" cy="90" rx="18" ry="30" fill="#1565C0" opacity="0.8" />
          {/* Head */}
          <circle cx="120" cy="48" r="14" fill="#0D47A1" />
        </g>

        {/* Legs */}
        <g transform={`rotate(${legAngle * 0.6}, 120, 118)`}>
          <line x1="108" y1="113" x2="95" y2="145" stroke="#1565C0" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
          <line x1="132" y1="113" x2="145" y2="145" stroke="#1565C0" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
        </g>
      </svg>

      <PositionIndicator />
    </div>
  );
}
