import { useBedStore } from '../../store/useBedStore';
import { ArrowUpDown } from 'lucide-react';
import { formatHeight } from '../../utils/formatValue';

export function HeightControl() {
  const bedHeight = useBedStore(s => s.bedHeight);
  const bedHeightTarget = useBedStore(s => s.bedHeightTarget);
  const setHeightTarget = useBedStore(s => s.setHeightTarget);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <ArrowUpDown size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-text">高度调节</h3>
      </div>
      <div className="text-xl font-bold text-text text-center mb-2">
        {formatHeight(bedHeight)}
      </div>
      <input
        type="range"
        min={30}
        max={80}
        value={bedHeightTarget}
        onChange={(e) => setHeightTarget(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-text-secondary mt-1">
        <span>30 cm</span>
        <span>80 cm</span>
      </div>
    </div>
  );
}
