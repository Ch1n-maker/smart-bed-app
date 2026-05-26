import { useBedStore } from '../../store/useBedStore';
import { formatHeight } from '../../utils/formatValue';
import { Ruler } from 'lucide-react';

export function HeightDisplay() {
  const bedHeight = useBedStore(s => s.bedHeight);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
          <Ruler size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xs font-medium text-text-secondary">当前高度</h3>
          <p className="text-2xl font-bold text-text">{formatHeight(bedHeight)}</p>
        </div>
      </div>
      <div className="h-12 flex items-end gap-1">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="w-2 rounded-t bg-primary-light"
            style={{
              height: `${8 + (bedHeight - 30) / 50 * 24}px`,
              opacity: 0.4 + i * 0.15
            }}
          />
        ))}
      </div>
    </div>
  );
}
