import { useBedStore } from '../../store/useBedStore';
import { SimulationSettings } from './SimulationSettings';
import { X } from 'lucide-react';

export function SettingsPanel() {
  const toggleSettings = useBedStore(s => s.toggleSettings);

  return (
    <div className="absolute inset-0 z-50 bg-black/30 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-[420px] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl slide-up max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text">设置</h2>
          <button
            onClick={toggleSettings}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <SimulationSettings />

        <div className="mt-6 p-4 bg-primary-light rounded-2xl">
          <h3 className="text-sm font-semibold text-primary-dark mb-1">关于</h3>
          <p className="text-xs text-text-secondary">
            智能病床控制系统 v1.0<br />
            原型演示版本 · 模拟数据模式
          </p>
        </div>
      </div>
    </div>
  );
}
